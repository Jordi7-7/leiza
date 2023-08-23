import {PORT} from './config.js';
import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import fs from fs;

const app = express();

app.set('view engine','ejs');



app.use('/recursos',express.static(process.cwd()+'/public'));

//CONEXION A BDD

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



app.get('/buscar/:id_prod',(req,res)=>{

    const id = req.params.id_prod;

    conexion.query('SELECT * FROM PRODUCTOS WHERE ID_PROD = ?',[id],(error,results)=>{

        if(error) throw error;  

        console.log(results);
        res.json(results);
        

    });
});


app.post('/insertar',(req,res)=>{

    const id = req.body.ID;
    const nombre = req.body.NOMBRE;
    const cantidad = req.body.CANTIDAD;
    const precio = req.body.PRECIO;
    const descripcion = req.body.DESCRIPCION;
    const categoria = req.body.CATEGORIA;
    const genero = req.body.GENERO;

    //Guardar la imagen
    const imageBase64 = req.body.file; // La imagen en formato binario como base64
  const imageName = id+".jpg"; // Nombre que deseas para la imagen guardada
  const directoryPath = path.join('recursos', 'img', 'Catalogo');

  // Decodificar la imagen base64 a formato binario
  const imageBuffer = Buffer.from(imageBase64, 'base64');
  const imagePath = path.join(directoryPath, imageName);

  // Guardar la imagen en el directorio
  fs.writeFile(imagePath, imageBuffer, (err) => {
    if (err) {
      console.error('Error al guardar la imagen:', err);
      res.status(500).send('Error al guardar la imagen');
    } else {
      console.log('Imagen guardada exitosamente');
      res.status(200).send('Imagen guardada exitosamente');
    }
  });
    

    conexion.query("INSERT INTO productos VALUES ('"+id+"', "+genero+", "+categoria+",'"+nombre+"', '"+descripcion+"', "+cantidad+","+precio+",'"+imagePath+")",(error,results)=>{

        if(error) throw error;  

        console.log(results);
        res.json(results);
        

    });
});

