//Definir rutas o endpoints, con sus parámetros.
const express = require('express')
const req = require('express/lib/request')
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

/*  app.get('/areas/:id', async function (req, res) {
    let data = await Area.findByPk(req.params.id)
    res.send(data)
})   */


app.get('/requests', async function (req, res) {
    let data = await Request.findAll()
    res.send(data)
})

app.get('/requests/:id', async function (req, res) {
    let data = await Request.findByPk(req.params.id)
    res.send(data)
})

//------------------------------------------------

//PARA usar en TEST peticionSectorLlenoTest.js:

//Creo en la bbdd un usuario fulano para testear:
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
})




//Para ver si un area existe o no .
 app.get('/areas/:id', async function (req, res) {
    let data = await Area.findByPk(req.params.id)
        .then(data => {
            //console.log(data)
            res.status(201).json({})
        }).catch(err => {
            console.log(err)
            res.status(422).json(err)
        })
}) 


//Para ver si un area con determinado nombre tiene capacidad LLENA.
//SELECT state FROM areas where id=3;
//Intento con query string:
//'/areas?name=Jacuzzi&state=Lleno'
app.get('/areas', async function (req, res) {
 
    let q={}
    if (req.query.name && req.query.state){       
		q.name = req.query.name
        q.state = req.query.state
    }
    let area = await Area.findOne({ where: q })
    .then(area => {
        //console.log(data)
        //res.send(data)
        res.status(422).json({message:'FULL_AREA'})
        //res.status(201).json({})
        //console.log("ANDUVO BIEN ", res)
    }).catch(err => {
        //console.log(err)
        //("ANDUVO MAL ", res)
        res.status(422).json({})
    }) 

    console.log(area)
    if(area===null){
        console.log(area)
     return res.status(422).json({})
    }
})


app.get('/areas', async function (req, res) {
 
    let q={}
    if (req.query.name && req.query.state){       
		q.name = req.query.name
        q.state = req.query.state
    }
    let area = await Area.findOne({ where: q })
    .then(area => {
        //console.log(data)
        //res.send(data)
        res.status(422).json({message:'FULL_AREA'})
        //res.status(201).json({})
        //console.log("ANDUVO BIEN ", res)
    }).catch(err => {
        //console.log(err)
        //("ANDUVO MAL ", res)
        res.status(422).json({})
    }) 

    console.log(area)
    if(area===null){
        console.log(area)
     return res.status(422).json({})
    }
})



/* //Intento con URL parameter:
app.get('/areas/name', async function (req, res) {
    res.send(req.params.name)
    console.log(req.params.name)
}) */


//Creo en la bbdd una asistencia/request para testear:
app.post('/requests', async function(req, res){
    console.log(req.body)
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
            console.log(data)
            res.status(201).json({})
        }).catch(err => {
            console.log(err)
            res.status(422).json(err)
        })
        //Sumo 1 a currentOcupation:
        await Area.increment({currentOcupation:1},{where:{id:req.body.id_area}})
    }
})








//--------------------------------------------------------------------------------

//Creo en la bbdd una calificacion para testear:
app.post('/ratings', async function(req, res){

    let count = await Rating.count({
        where : {
            id: req.body.id
        }
    })  //Busco la cantidad que existe.
    if (count > 0) {
    return res.status(422).json({message:'GUEST_EXISTS'})    //Si existe mando mensaje de error.
    }
    Guest.create({
        id: req.body.id,
        id_room: req.body.id_room,
        identificationNumber: req.body.identificationNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
/*         createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt */
    }).then(data => {
        res.status(201).json({})
    }).catch(err => {
        res.status(422).json(err)
    })
})





app.listen(7000)