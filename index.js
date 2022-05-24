//Definir rutas o endpoints, con sus parámetros.
const express = require('express')
const app = express()
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


