import express from 'express';
import JuegoControl from '../controllers/juegos.js'
import { validadorJuego, validadorActu } from '../middleware/juegos.js';

const route = express.Router();

route.get('/:idJuego/points', JuegoControl.getPuntaje);

route.get('/juegos/edicion/:edicion', JuegoControl.getTodosdatos);

route.get('/juegos/:idname', JuegoControl.getJuegosyId);

route.get('/juegos', JuegoControl.getJuegos);

route.post('/juegos',[validadorJuego], JuegoControl.createJuego);

route.patch('/juegos/:idname', [validadorActu], JuegoControl.actuJuego);

route.put('/juegos/:idname',[validadorJuego], JuegoControl.restaJuego);

route.delete('/juegos/:idname', JuegoControl.deleteTodo);


export default route;