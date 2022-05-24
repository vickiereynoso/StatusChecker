//Definir rutas o endpoints, con sus parámetros.
const express = require(express)
const app = express()
const {Request} = require('./src/db/models')

app.get('/requests', async function(req,res){
	
	let data = await Request.findAll()
    res.send(data)
    })
app.listen(8000) 

