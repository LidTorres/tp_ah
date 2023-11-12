import { resultadoSchema } from "../schemas/resultadoss.js";

export function validadorResul(req, res, next){

        resultadoSchema.validate(req.body, 
        {
            stripUnknown: true,
            abortEarly: false
        })

        .catch(function(err)
        {
         res.status(400).json(err);
        })

        .then(async function(resultado)
        {
            req.body = resultado;
            next();
        })
}