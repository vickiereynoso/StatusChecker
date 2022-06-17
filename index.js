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



/* app.get('/ratings', async function(req,res){
	
   
	let data = await Rating.findAll()
    res.send(data)
    })

app.get('/ratings/:id', async function(req,res){
    let data = await Rating.findByPk(req.params.id)
    res.send(data)
    }) */
    
//app.listen(8000)



//const {Guest} = require('./src/db/models')

/* app.get('/guests', async function(req,res){
	
	let data = await Guest.findAll()
    res.send(data)
    })

app.get('/guests/:id', async function(req,res){
    let data = await Guest.findByPk(req.params.id)
    res.send(data)
    }) */
    
//app.listen(8000) 




//const {Area} = require('./src/db/models')

/* app.get('/areas', async function(req,res){
    let data = await Area.findAll()
	res.send(data) 
})

app.get('/areas/:id', async function(req,res){
	let data = await Area.findByPk(req.params.id)
res.send(data)
})


app.get('/requests', async function(req,res){
    let data = await Request.findAll()
	res.send(data) 
})

app.get('/requests/:id', async function(req,res){
	let data = await Request.findByPk(req.params.id)
    res.send(data)
}) */

//PARA usar en TEST peticionSectorLlenoCerrado.js:

//Creo en la bbdd un usuario para testear:
/* app.post('/guests', async function(req, res){
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
}) */


//Para ver si un area existe o no .
/*    app.get('/areas/:id', async function (req, res) {
    let data = await Area.findByPk(req.params.id)

    if(data){
       res.send(data).status(200) 
    }else{
        res.status(404).json({message: 'AREA_NONEXISTENT'})
    }
    console.log(" ")
})  
 */

//Para ver si existe un area con determinado nombre y que tenga al momento capacidad LLENA.
//SELECT state FROM areas where id=3;
//Intento con query string:
//'/areas?name=Jacuzzi&state=Lleno'
/* app.get('/areas', async function (req, res) {
    let data = await Area.findOne({         
        where: {
            name : req.query.name,
            state : req.query.state
        }
    })
  
    //res.json(data)
    if(data){
        res.status(200).json(data) 
     }else{
         res.status(404).json({message: 'AREA_AT_FULL_CAPACITY_AT_THE_MOMENT'})
     }
     console.log(" ")
}) */

/* //Intento con URL parameter:
app.get('/areas/name', async function (req, res) {
    res.send(req.params.name)
    console.log(req.params.name)
}) */


//Creo en la bbdd una asistencia/request para testear:
/* app.post('/requests', async function(req, res){
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
 */
//Para ver si existe un area con determinado nombre y que este CERRADO.
//SELECT state FROM areas where id=5;
//Intento con query string:
//'/areas?name=Gym&state=Cerrado'
app.post('/requests5', async function(req, res){
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
            state: 'Accepted'
        }).then(data => {
            //console.log(data)
            res.status(201).json({})
        }).catch(err => {
            res.status(422).json(err)
        })
        //Sumo 1 a currentOcupation:
        await Area.increment({currentOcupation:1},{where:{id:req.body.id_area}})
    }
    console.log(" ")
})



/* app.put('/areas', async function(req, res){
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
 */



app.listen(7000)