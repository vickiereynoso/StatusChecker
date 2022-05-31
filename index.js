//Definir rutas o endpoints, con sus parámetros.
const express = require('express')

const app = express()

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