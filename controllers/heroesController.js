const { RequestHeaderFieldsTooLarge } = require('http-errors')
let heroe = require('../data/heroes.json')

module.exports = {

//http://localhost:3000/heroes


list: function(req,res){
res.send(heroe)
} ,



//http://localhost:3000/heroes/:id/profesion

show: function (req,res){
   
    let resultado = heroe.find(function(heroe){
        return heroe.id == req.params.id 
              
    })

    if (resultado){
        return res.send('Mi nombre es ' + resultado.nombre + ' y soy ' + resultado.profesion )
    }

    return res.send('No tenemos en nuestra base ningún héroe ni heroína con ese id')

    
 
},


//http://localhost:3000/heroes/:id/reseña/:tipo?

review: function(req,res){
    
    let resultado = heroe.find(function(heroe){
        return heroe.id == req.params.id 
              
    })

    if(resultado){
        
        if(resultado.resenia.indexOf(req.params.tipo) >= 0){
            res.send(resultado.nombre + ":" + resultado.resenia)
        } 
    
        else{
            let palabras= resultado.resenia.split(" ")
            let reseniaArray= palabras.slice(0,29)
            let reseniaFinal= reseniaArray.join(" ")
            res.send(resultado.nombre + ":" + reseniaFinal+".")


        }
    }

    


 }  
}
