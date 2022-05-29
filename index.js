//Definir rutas o endpoints, con sus parámetros.
const express = require('express')
const app = express()
const {Request} = require('./src/db/models')

//Me traigo todas las requests.
app.get('/requests', async function(req,res){
	let data = await Request.findAll()
    res.send(data)
    })

//Me traigo de a una.
app.get('/requests/:id', async function(req,res){
    let data = await Request.findByPk(req.params.id)
    res.send(data)
    })
    
app.listen(8000)

