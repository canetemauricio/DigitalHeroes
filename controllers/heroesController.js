const { RequestHeaderFieldsTooLarge } = require('http-errors')
let heroes = require('../data/heroes.json')

module.exports = {

//http://localhost:3000/heroes


list: function(req,res){
res.render('heroes', {title: "HEROES - VOUGHT INTERNATIONAL", heroes: heroes})
} ,


//http://localhost:3000/heroes/:id

show: function (req,res){
 
    let resultado = heroes.find(function(heroes){
        return heroes.id == req.params.id 
              
    })

    if (resultado){
        return res.render('hero', { title: resultado.alias, resultado})
    }
    /* return res.send('404') */

 
},

search: function(req,res){

    let userSearch = req.query.alias
    const searchParams = userSearch.charAt(0).toUpperCase() + userSearch.slice(1)
    let results =[]

    for(i=0; i< heroes.length; i++){
        if(heroes[i].alias.includes(userSearch) || heroes[i].alias.includes(searchParams) ){

            results.push(heroes[i])

        }
        
    }

res.render('heroSearch', {title: "SEARCH RESULTS - VOUGHT INTERNATIONAL", results,})

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
