//Definir rutas o endpoints, con sus parámetros.
const express = require('express')
const app = express()


const {Rating} = require('./src/db/models')

app.get('/ratings', async function(req,res){
	
	let data = await Rating.findAll()
    res.send(data)
    })

app.get('/ratings/:id', async function(req,res){
    let data = await Rating.findByPk(req.params.id)
    res.send(data)
    })
    
app.listen(8000)



const {Guest} = require('./src/db/models')

app.get('/guests', async function(req,res){
	
	let data = await Guest.findAll()
    res.send(data)
    })

app.get('/guests/:id', async function(req,res){
    let data = await Guest.findByPk(req.params.id)
    res.send(data)
    })
    
app.listen(8000) 




const {Area} = require('./src/db/models')

app.get('/areas', async function(req,res){
    let data = await Area.findAll()
	res.send(data) 
})

app.get('/areas/:id', async function(req,res){
	let data = await Area.findByPk(req.params.id)
res.send(data)
})


app.listen(8000)