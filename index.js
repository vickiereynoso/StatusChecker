//Definir rutas o endpoints, con sus parámetros.
const express = require('express')
const app = express()
const {Room} = require('./src/db/models')

app.get('/rooms', async function(req,res){
	let data = await Room.findAll()
    res.send(data)
})
app.listen(8000) 
