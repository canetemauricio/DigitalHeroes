const fs = require('fs')
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

        let userSearch = req.query.alias.toLowerCase()
        //let upperFirst = userSearch.charAt(0).toUpperCase() + userSearch.slice(1).toLowerCase()
        //let lowerSecond = userSearch.toLowerCase()
        let results = heroes.filter(function(hero){
            return hero.alias.toLowerCase().includes(userSearch)
        })
        
        res.render('heroSearch', {title: "SEARCH RESULTS - VOUGHT INTERNATIONAL", results,})

    },
    create: function(req,res){
        res.render('create')
    },
    save: function(req,res){
        
        heroesFile = fs.readFileSync('./data/heroes.json', {encoding: 'utf-8'})
        
        if (heroesFile == ""){
            heroesList =[]
        }  else{
            heroesList = JSON.parse(heroesFile)   
        }
        heroesList.push(
            {
                    id: heroesList[heroesList.length-1].id+1,
                    alias: req.body.alias,
                    name: req.body.name,
                    powers: req.body.powers,
                    review: req.body.review
                
            }
        )

        let heroesJSON = JSON.stringify(heroesList)
        fs.writeFileSync('./data/heroes.json', heroesJSON)

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

        heroesFile = fs.readFileSync('./data/heroes.json', {encoding: 'utf-8'})

        if (heroesFile == ""){
            heroesList =[]
        }  else{
            heroesList = JSON.parse(heroesFile)   
        }

        let notdeleted = heroes.filter(function(hero){
            return hero.id != req.params.id
        })

        let toWrite = JSON.stringify(notdeleted)
        fs.writeFileSync('./data/heroes.json',toWrite)
     
        res.redirect('/heroes')
    }


 }