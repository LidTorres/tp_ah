import { juegoSchema, juegoActuSchema } from "../schemas/juegoss.js";

export function validadorJuego(req, res, next)
{
        juegoSchema.validate(req.body, 
        {
            stripUnknown: true,
            abortEarly: false
        })

        .catch(function(err)
        {
            res.status(400).json(err);
        })

        .then(async function(juego)
        {
            req.body = juego;
            next();
        })
}

export function validadorActu(req, res, next)
{
    juegoActuSchema.validate(req.body, 
        {
    })

    .catch(function(err)
    {
        res.status(400).json(err);
    })

    .then(async function(juego)
    {
        req.body = juego;
        next();
    })
}