//Definir rutas o endpoints, con sus parámetros.
const { default: axios } = require('axios')
const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const { send } = require('express/lib/response')
const app = express()
const { Rating, Guest, Area, Request } = require('./src/db/models')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/ratings', async function (req, res) {

    let data = await Rating.findAll()
    res.send(data)
})

app.get('/ratings/:id', async function (req, res) {
    let data = await Rating.findByPk(req.params.id)
    res.send(data)
})


app.get('/guests', async function (req, res) {

    let data = await Guest.findAll()
    res.send(data)
})

app.get('/guests/:id', async function (req, res) {
    let data = await Guest.findByPk(req.params.id)
    res.send(data)
})

/*  app.get('/areas', async function (req, res) {
    let data = await Area.findAll()
    res.send(data)
})  */

/*   app.get('/areas/:id', async function (req, res) {
    let data = await Area.findByPk(req.params.id)
    res.send(data)
})    */

app.get('/requests', async function (req, res) {
    let data = await Request.findAll()
    res.send(data)
})

app.get('/requests/:id', async function (req, res) {
    let data = await Request.findByPk(req.params.id)
    res.send(data)
})






// ----------------------ENDPOINTS PARA TESTS ----------------------



// Endpoint para testear crear HUÉSPED (GUEST), comprobando que no exista antes.
app.post('/guests', async function(req, res){
    console.log(req.body)
    let count = await Guest.count({
        where : {
            identificationNumber: req.body.identificationNumber
        }
    })  //Busco la cantidad que existe.
    console.log(count)
    if (count > 0) {
        console.log("usuario existe")
    return res.status(422).json({message:'GUEST_EXISTS'})
        //Si existe mando mensaje de error.
    }
    Guest.create({
        id_room: req.body.id_room,
        identificationNumber: req.body.identificationNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,

    }).then(data => {
        console.log(data)
        res.status(201).json({})
    }).catch(err => {
        console.log(err)
        res.status(422).json(err)
    })
    console.log(" ")
})


// Endpoint para testear si existe un AREA.
   app.get('/areas/:id', async function (req, res) {
    let data = await Area.findByPk(req.params.id)

    if(data){
       res.send(data).status(200) 
    }else{
        res.status(404).json({message: 'AREA_NONEXISTENT'})
    }
    console.log(" ")
})  


// Endpoint para testear si existe un AREA con determinado nombre y que tenga al momento capacidad LLENA.
app.get('/areas', async function (req, res) {
    let data = await Area.findOne({         
        where: {
            name : req.query.name,
            state : req.query.state
        }
    })
    if(data){
        res.status(200).json(data) 
     }else{
         res.status(404).json({message: 'AREA_AT_FULL_CAPACITY_AT_THE_MOMENT'})
     }
     console.log(" ")
})


// Endpoint para crear/"marcar" una ASISTENCIA (REQUEST).
app.post('/requests', async function(req, res){
    let area = await Area.findOne({
        where : {
            id: req.body.id_area,
            state: "Disponible"
        }
    })
    //Si no hay lugar en el area:
    if (area==null) {
        Request.create({
            //Se crea igualmente un asistencia/request pero con state "declined" y se devuelve 422 con mensaje.
            id_area: req.body.id_area,
            id_guest: req.body.id_guest,
            state: "Declined",
        })
        return res.status(422).json({message:'REQUEST_DECLINED'})
    }else {
    //Si hay lugar se crea una asistencia/request con state: "accepted", y se debería hacer un update en areas, sumando 1 a la currentOcupation:    
        Request.create({
            id_area: req.body.id_area,
            id_guest: req.body.id_guest,
            state: req.body.state,
        }).then(data => {
            //console.log(data)
            res.status(201).json({})
        }).catch(err => {
            //console.log(err)
            res.status(422).json(err)
        })
        //Sumo 1 a currentOcupation:
        await Area.increment({currentOcupation:1},{where:{id:req.body.id_area}})
    }
    console.log(" ")
})


// Endpoint para obtener una ASISTENCIA (REQUEST) que contengan un cierto GUEST y un AREA particulares.
app.get('/requests/:id_guest/:id_area', async function(req, res){
    console.log(req.body)
    let data = await Request.findOne({
        where : {
            id_guest: req.params.id_guest,
            id_area: req.params.id_area
        }  
    })
    if(data){
        // console.log(data)
         res.status(200).json(data)
     }else{
         res.status(422).json(err)
     }
})

// Endpoint para crear una CALIFICACIÓN (RATING).
app.post('/ratings', async function(req, res){

    let score = req.body.score
  
    if (score < 1 || score > 10) {
    return res.status(415).json({message:'INVALID_SCORE'})
    }
     Rating.create({

        id: req.body.id,
        id_area: req.body.id_area,
        id_request: req.body.id_request,
        score: req.body.score,
        review: req.body.review,
    
    }).then(data => {
        res.status(201).json(data)
    }).catch(err => {
        res.status(415).json(err)
    })
})

// Endpoint para obtener un HUÉSPED (GUEST) por su NÚMERO DE IDENTIFICACIÓN.
app.get('/guests/:identificationNumber', async function(req, res){

    let data = await Guest.findOne({
        where : {
            identificationNumber: req.params.identificationNumber
        } 
    })
    if(data){
       //console.log(data)
        res.status(200).json(data)
        res.send(data)
    }else{
        res.send(data)
        res.status(422)//.json()//err
    }
})


// Endpoint obtener un AREA por su ID.
app.get('/areas/:id', async function(req,res){
	let data = await Area.findByPk(req.params.id)
res.send(data)
})


// Endpoint para ACTUALIZAR el estado de un AREA.
app.put('/areas', async function(req, res){
    let area = await Area.findOne({
        where : {
            id: req.body.id_area,
        }
    })
    //Si no encuentra el area:
    if (area==null) {
        return res.status(422).json({message:'AREA_NONEXISTENT'})
    }else {
    //Si se encuentra el area, actualiza su estado:   
        Area.update({state: req.body.state},{
            where: {
                id: req.body.id_area
            }
        }).then(data => {
            //console.log(data)
            res.status(201).json({})
        }).catch(err => {
            //console.log(err)
            res.status(422).json(err)
        })
    }
    console.log(" ")
})

// Endpoint para obtener las AREAS de la categoría "Apto Niños".
 app.get('/areas2', async function (req, res) {
    let data = await Area.findAll({         
        where: {
            category : req.query.category
        }
    })
    if(data){
        //res.send(data).status(200) 
        res.status(200).json({data}) 
     }else{
         res.status(404).json({message: 'NO_AREAS_IN_SUCH_CATEGORY'})
     }
     console.log(" ")
}) 


// Endpoint para actualizar el estado de una ASISTENCIA (REQUEST) de "Accepted" a "Checked Out" y también actualizar la OCUPACIÓN ACTUAL (CURRENT OCUPATION) del AREA.
app.put('/requests', async function(req, res){
    let data = await Request.findOne({
        where : {
            id_area: req.body.id_area,
            id_guest: req.body.id_guest
        }
    })
    //Si no encuentra el request:
    if (data==null) {
        return res.status(422).json({message:'GUEST_NOT_AT_SECTOR'})
    }else {
    //Si se encuentra el request, actualiza su estado:   
       Request.update({state: "Checked out"},{
            where: {
               id_guest: req.body.id_guest,
               id_area: req.body.id_area
            }
        }).then(data => {
            //console.log(data)
            res.status(201).json({})
        }).catch(err => {
            //console.log(err)
            res.status(422).json(err)
        })
        //Resto 1 a currentOcupation:
        await Area.increment({currentOcupation:-1},{where:{id:req.body.id_area}})
    }
    console.log(" ")
})
 

// Endpoint para obtener la DESCRIPCIÓN de un AREA en particular.
app.get('/areas3', async function (req, res) {
    let data = await Area.findOne({         
        attributes: ['description']
    })
    if(data){
        //res.send(data).status(200) 
        res.status(200).json(data.description) 
     }else{
         res.status(404).json({message: 'NO_DESCRIPTION_AVAILABLE'})
     }
     console.log(" ")
}) 


// Endpoint para obtener las RESEÑAS (REVIEWS) de TODAS LAS AREAS.
app.get('/ratings2', async function (req, res) {
    let data = await Rating.findAll({         
        attributes: ['review']
    })
    if(data){
        //res.send(data).status(200) 
        res.status(200).json(data) 
     }else{
         res.status(404).json({message: 'NO_REVIEWS_AVAILABLE'})
     }
     console.log(" ")
}) 


// Endpoint para obtener las RESEÑAS (REVIEWS) de UN AREA.
app.get('/ratings3', async function (req, res) {
    let data = await Rating.findAll({         
        attributes: ['review'],

        where: {
            id_area: req.query.id_area
        }
    })
    if(data){
        //res.send(data).status(200) 
        res.status(200).json(data) 
     }else{
         res.status(404).json({message: 'NO_REVIEWS_AVAILABLE'})
     }
     console.log(" ")
}) 


// Endpoint para obtener todas las ASISTENCIAS (REQUESTS) de un HUÉSPED (GUEST).
app.get('/requests2', async function (req, res) {
    let data = await Request.findAll({         
        where: {
            id_guest: req.query.id_guest
        }
    })
    if(data){
        //res.send(data).status(200) 
        res.status(200).json(data) 
     }else{
         res.status(404).json({message: 'NO_REQUESTS_AVAILABLE'})
     }
     console.log(" ")
}) 


// Endpoint para obtener el AREA más concurrida de todas.
app.get('/requests3', async function (req, res) {

    let PiscCubierta = {
        conteo: await Request.count({
            where : {
            id_area: 1
        }}),
        id_area: 1
    }

    let PiscClimatizada = {
        conteo: await Request.count({
            where : {
            id_area: 2
        }}),
        id_area: 2
    }

    let Jacuzzi = {
        conteo: await Request.count({
            where : {
            id_area: 3
        }}),
         id_area: 3
    }

    let Gym = {
        conteo: await Request.count({
            where : {
            id_area: 4
        }}),
        id_area: 4
    }
    let Sauna = {
        conteo: await Request.count({
            where : {
            id_area: 5
        }}),
        id_area: 5

    }

    let max=PiscCubierta
    if(max.conteo<PiscClimatizada.conteo){
        max=PiscClimatizada
    }if(max.conteo<Jacuzzi.conteo){
        max=Jacuzzi
    }if(max.conteo<Gym.conteo ){
        max=Gym 
    }if(max.conteo<Sauna.conteo){
        max=Sauna
    }

    if(max){
        //res.send(data).status(200) 
        res.status(200).json(max) 
     }else{
         res.status(404).json({message: 'NO_REQUESTS_AVAILABLE'})
     }
     console.log(" ")
}) 



// ----------- SIN TERMINAR -------------
// Endpoint para obtener el promedio más alto de calificaciones numéricas de un AREA en particular.
 app.get('/ratings4', async function (req, res) {

    let data = {
        conteo: await Rating.count({
            where : {
            id_area: req.query.id_area,
            }
        }),
        scores: await Rating.findAll({
            where :{
                id_area: req.query.id_area,
            },
            attributes: ['score'],
        }),       
        promedio: function (){
            for (let i = 0; i < scores.length; i++) {
                sum += scores[i].score;
            }
            return total = sum/scores.length
        }
    }

    if(data){
        //res.send(data).status(200) 
        res.status(200).json(data) 
     }else{
         res.status(404).json({message: 'NO_DATA_AVAILABLE'})
     }
     console.log(" ")
})  




app.listen(7000)