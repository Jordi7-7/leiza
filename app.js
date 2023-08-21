import {PORT} from './config.js';
import express from 'express';
import mysql from 'mysql';

const app = express();

app.set('view engine','ejs');

app.use('/recursos',express.static(__dirname+'/public'));

//CONEXION A BDD
var mysql = require('mysql');

var conexion = mysql.createConnection({
    host:'btx78x8b1go9kvgzaj9b-mysql.services.clever-cloud.com',
    database:'btx78x8b1go9kvgzaj9b',
    user:'u1nsyx1syggpwojc',
    password:'jeEP24uTBZjDT95jqs4T'
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('CONEXION EXITOSA');
    }
}); 


app.listen(PORT, (req,res)=>{

    console.log('SERVER UP');

});

app.get('/',(req,res)=>{
    res.render('index');
});




app.get('/hombre',(req,res)=>{

    conexion.query('SELECT * FROM PRODUCTOS WHERE ID_GEN = 1',(error,results)=>{

        if(error) throw error;  

        console.log(results);

        res.render('hombre',{data:results});

    });
});

app.get('/mujer',(req,res)=>{
    conexion.query('SELECT * FROM PRODUCTOS WHERE ID_GEN = 2',(error,results)=>{

        if(error) throw error;  

        console.log(results);

        res.render('mujer',{data:results});

    });
});



