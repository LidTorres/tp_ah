import express from 'express';
import JuegoResulContro from '../controllers/resultados.js';
import { validadorResul } from '../middleware/resultados.js';

const route = express.Router();

route.get('/jueces/', JuegoResulContro.getJueces);

route.post('/jueces/:idJueces/resultados/:idnombre',[validadorResul], JuegoResulContro.createResul);


route.get('/jueces/:idJueces/resultados', JuegoResulContro.getResulJueces);

export default route;