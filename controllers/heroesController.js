const { RequestHeaderFieldsTooLarge } = require('http-errors')
let heroes = require('../data/heroes.json')

module.exports = {

    list: function(req,res){
        res.render('heroes', {title: "HEROES - VOUGHT INTERNATIONAL", heroes: heroes})
    },
    show: function (req,res){
 
        let resultado = heroes.find(function(heroes){
            return heroes.id == req.params.id            
        })

        if (resultado){
            let powersArray= resultado.powers.split(", ")
            return res.render('hero', { title: resultado.alias, resultado, powersArray})
        }
    },
    search: function(req,res){

        let userSearch = req.query.alias
        let upperFirst = userSearch.charAt(0).toUpperCase() + userSearch.slice(1).toLowerCase()
        let lowerSecond = userSearch.toLowerCase()
        let results =[]

        for(i=0; i< heroes.length; i++){
            if(heroes[i].alias.includes(userSearch) || heroes[i].alias.includes(upperFirst) || heroes[i].alias.includes(lowerSecond) ){

                results.push(heroes[i])

            }
        
        }

        res.render('heroSearch', {title: "SEARCH RESULTS - VOUGHT INTERNATIONAL", results,})

    },
    create: function(req,res){
        res.render('create')
    },
    save: function(req,res){
        let usuario = {
            alias: req.body.alias,
            name: req.body.name,
            powers: req.body.powers,
            review: req.body.review
        }

        res.redirect('/heroes')
    },

    edit: function(req,res){

        let heroId = req.params.id
        let editing =heroes[heroId-1]
        res.render ('edit', {title: 'EDIT HERO - VOUGHT INTERNATIONAL', editing})
    },
    refresh: function (req,res){
        let heroEdited = {
            id: req.body.id,
            alias: req.body.alias,
            name: req.body.name,
            powers: req.body.powers,
            review: req.body.review
        }
        res.send(heroEdited)
    },

    delete: function (req,res){
        res.send('HEROE ELIMIADO. F POR EL HEROE')
    }


 }