//Definir rutas o endpoints, con sus parámetros.
const { default: axios } = require('axios')
const express = require('express')
const app = express()
const {Rating, Guest, Area, Request} = require('./src/db/models')
const guest = require('./src/db/models/guest')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Hacer GET de un REQUEST que contenga un GUEST y un AREA particulares 
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

//Hacer POST de un RATING 
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

// app.get('/ratings', async function(req,res){
// 	let data = await Rating.findAll()
//     res.send(data)
//     })

// app.get('/ratings/:id', async function(req,res){
//     let data = await Rating.findByPk(req.params.id)
//     res.send(data)
//     })

// app.get('/guests', async function(req,res){
// 	let data = await Guest.findAll()
//     res.send(data)
//     })

// app.get('/guests/:id', async function(req,res){
//     let data = await Guest.findByPk(req.params.id)
//     res.send(data)
//     })
    
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

// app.get('/areas', async function(req,res){
//     let data = await Area.findAll()
// 	res.send(data) 
// })

app.get('/areas/:id', async function(req,res){
	let data = await Area.findByPk(req.params.id)
res.send(data)
})

// app.get('/requests', async function(req,res){
//     let data = await Request.findAll()
// 	res.send(data) 
// })

// app.get('/requests/:id', async function(req,res){
// 	let data = await Request.findByPk(req.params.id)
//     res.send(data)
// })


app.listen(7000)