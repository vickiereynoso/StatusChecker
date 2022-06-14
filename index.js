//SANTI
//Definir rutas o endpoints, con sus parámetros.
const { default: axios } = require('axios')
const express = require('express')
const app = express()
const {Rating, Guest, Area, Request} = require('./src/db/models')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//**************** */
//SANTI
app.get('/requests', async function(req, res){
    console.log(req.body)
    let data = await Request.findOne({
        where : {
            id_guest: req.params.id_guest
        }  
    }).then(data => {
        console.log(data)
        res.status(201).json({})
    }).catch(err => {
        console.log(err)
        res.status(422).json(err)
    })
})


//GET RATINGS
app.get('/ratings', async function(req,res){
	
   
	let data = await Rating.findAll()
    res.send(data)
    })

//GET RATINGS/ID
app.get('/ratings/:id', async function(req,res){
    let data = await Rating.findByPk(req.params.id)
    res.send(data)
    })

//POST RATINGS
//SANTI
//Creo en la bbdd una calificacion para testear:
app.post('/ratings', async function(req, res){

    let count = await Rating.count({
        where : {
            id: req.body.id
        }
    })  //Busco la cantidad que existe.
    if (count > 0) {
    return res.status(422).json({message:'RATING_EXISTS'})    //Si existe mando mensaje de error.
    }
    Rating.create({
        /** id_area: DataTypes.INTEGER,
    id_request: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    review: DataTypes.STRING */
        id: req.body.id,
        id_area: req.body.id_area,
        id_request: req.body.id_request,
        score: req.body.score,
        review: req.body.review,
    
/* createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt */
    }).then(data => {
        res.status(201).json({})
    }).catch(err => {
        res.status(422).json(err)
    })
})
    
//app.listen(8000)



//const {Guest} = require('./src/db/models')

app.get('/guests', async function(req,res){
	
	let data = await Guest.findAll()
    res.send(data)
    })

app.get('/guests/:id', async function(req,res){
    let data = await Guest.findByPk(req.params.id)
    res.send(data)
    })
    
//app.listen(8000) 




//const {Area} = require('./src/db/models')

app.get('/areas', async function(req,res){
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
})






app.listen(7000)