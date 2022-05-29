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

