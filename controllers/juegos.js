import * as Juegoss from "../services/juegos.js";

function getJuegos(req,res)
{
    Juegoss.getJuegos(req.query)

    .catch(function(err)
    {
        res.status(500).json({msg: "archivo no ubicado"});
    })

    .then(function(juegos)
    {
        res.status(200).json(juegos); 
    })

}

function getJuegosyId(req,res)
{
    const {idJuego} = req.params;
    
    Juegoss.getJuegosyId(idJuego)

    .catch(function(err)
    {
        if(err?.code)
        {
            res.status(err.code).json({msg: err.msg});
        }

        else
        {
            res.status(500).json({msg: "no se pudo conseguir"});
        }
    })

    .then(function(juego)
    {
        console.log(juego);

        return res.status(200).json(juego)
    })
}

function getPuntaje(req,res){
    const {idJuego} = req.params;
    
    Juegoss.getPuntaje(idJuego)

    .catch(function(err)
    {
        if(err?.code)
        {
            res.status(err.code).json({msg: err.msg});
        }
        else
        {
            res.status(500).json({msg: "no esta"});
        }
    })

    .then(function(juego)
    {
        console.log(juego);
        
        return res.status(200).json(juego)
    })
}

async function createJuego(req,res)
{
   return Juegoss.createJuego(req.body)

   .catch(function(err)
   {
    res.status(500).json({ msg: err.msg });
   })

   .then(function(juego)
   {
    res.status(201).json(juego)
   })
}

async function actuJuego(req, res) 
{
    const { idJuego } = req.params;
    
    const actuDatos = req.body;

    Juegoss.actuJuego(idJuego, actuDatos)

        .then(function (juego)
        {
            res.status(200).json(juego);
        })

        .catch(function (err)
        {
            if (err?.code)
            {
                res.status(err.code).json({ msg: err.msg });
            }

            else
            {
                res.status(500).json({ msg: "no se pudo actualizar" });
            }
        });
}

async function restaJuego(req, res)
{
    const { idJuego } = req.params;

    const reDatos = req.body; 

    Juegoss.restaJuego(idJuego, reDatos)

        .then(function (juego) 
        {
            res.status(200).json(juego);
        })

        .catch(function (err)
        {
            if (err?.code)
            {
                res.status(err.code).json({ msg: err.msg });
            }

            else
            {
                res.status(500).json({ msg: "no se pudo actualizar" });
            }
        });
}

async function getTodosdatos (req, res)
{
    try 
    {
        const { edicion } = req.params;

        const { genero } = req.query;
        
        const juegos = await Juegoss.getTodosdatos(parseInt(edicion), genero);

        res.json(juegos);

    }

    catch (error)
    {
      console.error('Error:', error);

      res.status(500).json({ error: 'no estan los datos' });
    }
  };


async function deleteTodo(req,res)
{
    const {idJuego} = req.params;

    Juegoss.deleteTodo(idJuego)

        .then(function (juego)
        {
            res.status(200).json({ msg: "eliminado" });
        })

        .catch(function (err)
        {
            if (err?.code)
            {
                res.status(err.code).json({ msg: err.msg });
            }
            
            else
            {
                res.status(500).json({ msg: "no se elimino" });
            }
        });
}
  

export {
    getJuegos,
    getJuegosyId,
    createJuego,
    actuJuego,
    restaJuego,
    getTodosdatos,
    getPuntaje,
    deleteTodo
}

export default{
    getJuegos,
    getJuegosyId,
    createJuego,
    actuJuego,
    restaJuego,
    getTodosdatos,
    getPuntaje,
    deleteTodo
}