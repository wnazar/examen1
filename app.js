//Espress - Backend: (Recibe y devuelve datos)
var express = require('express')
var app = express()

//Ejs - Frontend: Indica que se utilizara ejs
app.set('view engine', 'ejs')

//Para linkear archivos estaticos CSS
app.use(express.static('public'))

//Sqlite3 - BDD
var sqlite3 = require('sqlite3').verbose()

//-------------------------------------------------------------------------------------------

//Irse a la pagina de guardar
app.get('/guardar', function(req, res) {
  var usuarios = []

  var db = new sqlite3.Database("bdd.sqlite3")
  db.all("select * from usuarios;", function(err, rows)
  {  
    rows.forEach(function (row) {  
      usuarios.push([row.nombre, row.telefono, row.id, row.correo,row.edad])
    })
    res.render('guardar', { usuarios: usuarios })
  });
  db.close();

});

//-------------------------------------------------------------------------------------------

//Irse a la pagina de mostrar
app.get('/mostrar', function(req, res) {
  var usuarios = []

  var db = new sqlite3.Database("bdd.sqlite3")
  db.all("select * from usuarios;", function(err, rows)
  {  
    rows.forEach(function (row) {  
      usuarios.push([row.nombre, row.telefono, row.id, row.correo,row.edad])
    })
    res.render('mostrar', { usuarios: usuarios })
  });
  db.close();

});

//-------------------------------------------------------------------------------------------

//Irse a la pagina de borrar
app.get('/borrar', function(req, res) {
  var usuarios = []

  var db = new sqlite3.Database("bdd.sqlite3")
  db.all("select * from usuarios;", function(err, rows)
  {  
    rows.forEach(function (row) {  
      usuarios.push([row.nombre, row.telefono, row.id, row.correo,row.edad])
    })
    res.render('borrar', { usuarios: usuarios })
  });
  db.close();

});

//-------------------------------------------------------------------------------------------

//Irse a la pagina de editar
app.get('/editar', function(req, res) {
  var usuarios = []

  var db = new sqlite3.Database("bdd.sqlite3")
  db.all("select * from usuarios;", function(err, rows)
  {  
    rows.forEach(function (row) {  
      usuarios.push([row.nombre, row.telefono, row.id, row.correo,row.edad])
    })
    res.render('editar', { usuarios: usuarios })
  });
  db.close();

});

//-------------------------------------------------------------------------------------------

//Guarda usuario en agenda
app.get('/saved', function(req, res) {

  var db = new sqlite3.Database("bdd.sqlite3")
  db.serialize(function() {

    var stmt = db.prepare("INSERT INTO usuarios VALUES (?,?,?,?,?)")
    stmt.run(req.query.nombre,req.query.telefono,req.query.id,req.query.correo,req.query.edad)
    stmt.finalize()

    var usuarios = []
    db.all("select * from usuarios;", function(err, rows)
    {  
      rows.forEach(function (row) {  
        usuarios.push([row.nombre, row.telefono, row.id, row.correo,row.edad])
      })
      res.render('mostrar', { usuarios: usuarios })
    });

  });
  db.close();
})

//-------------------------------------------------------------------------------------------

//Edita usuario de agenda
app.get('/edited', function(req, res) {

  var db = new sqlite3.Database("bdd.sqlite3")
  db.serialize(function() {

    var stmt = db.prepare("UPDATE usuarios " 
                          + "SET nombre=? , "
                          + "telefono=? , "
                          + "id=? , "
                          + "correo=? , "
                          + "edad=? "
                          + "WHERE nombre=?")
    stmt.run(req.query.nombre,req.query.telefono,req.query.id,req.query.correo,req.query.edad,req.query.nombreEdit)
    stmt.finalize()

    var usuarios = []
    db.all("select * from usuarios;", function(err, rows)
    {  
      rows.forEach(function (row) {  
        usuarios.push([row.nombre, row.telefono, row.id, row.correo,row.edad])
      })
      res.render('mostrar', { usuarios: usuarios })
    });

  });
  db.close();
})

//-------------------------------------------------------------------------------------------

//Borra usuario de agenda
app.get('/erased', function(req, res) {

  var db = new sqlite3.Database("bdd.sqlite3")
  db.serialize(function() {

    var stmt = db.prepare("DELETE FROM usuarios " 
                          + "WHERE nombre=? "
                          + "AND telefono=? "
                          + "AND id=? "
                          + "AND correo=? "
                          + "AND edad=? ")
    stmt.run(req.query.nombre,req.query.telefono,req.query.id,req.query.correo,req.query.edad)
    stmt.finalize()

    var usuarios = []
    db.all("select * from usuarios;", function(err, rows)
    {  
      rows.forEach(function (row) {  
        usuarios.push([row.nombre, row.telefono, row.id, row.correo,row.edad])
      })
      res.render('mostrar', { usuarios: usuarios })
    });

  });
  db.close();
})

//-------------------------------------------------------------------------------------------

app.get('/', function(req, res) {

  var usuarios = []

  var db = new sqlite3.Database("bdd.sqlite3")
  db.all("select * from usuarios;", function(err, rows)
  {  
    rows.forEach(function (row) {  
      usuarios.push([row.nombre, row.telefono, row.id, row.correo,row.edad])
    })
    res.render('index', { usuarios: usuarios })
  });
  db.close();

});
  
app.listen(8000)