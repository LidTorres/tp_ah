import express from 'express';
import juegoRo from './routes/juegos.js';
import resultadoRo from './routes/resultadoss.js';

const app = express();

app.use(express.json());
app.use(juegoRo);
app.use(resultadoRo);

app.listen(2023, function () 
{
    console.log("el servidor está vivoooo http://localhost:2023");
});
