module.exports = {

home: function(req,res){
res.render('index', {title: 'VOUGHT INTERNATIONAL'})
},

about: function(req,res){
    res.send('Mauricio Cañete')

}








}