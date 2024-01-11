const validator = require("validator");
const Articulo = require("../modelos/Articulo");

const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una accion de prueba en mi controlador de articulos"
    });
}

const curso = (req, res) => {
    console.log("Se ha ejecutado el endpoint \"probando\"");
    return res.status(200).json([{
        curso: "Master en React",
        autor: "Noel Sariñena Varela",
        url: "noelsarinenaweb.es/master-react"
    },
    {
        curso: "Master en PHP",
        autor: "Noel Sariñena Varela",
        url: "noelsarinenaweb.es/master-php"
    }])
    /*
    `
        <div>
            <h1>Probando ruta nodejs</h1>
            <p>Creando api rest con node</p>
            <ul>
                <li>Master en React</li>
                <li>Master en PHP</li>
            </ul>
        </div>
    `
    */
};

const crear = (req, res) => {

    // Recoger parámetros por post a guardar
    let parametros = req.body;

    // Validar los datos
    try {

        let validar_titulo = !validator.isEmpty(parametros.titulo) && validator.isLength(parametros.titulo, {min: 5, max: undefined});
        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido) {
            throw new Error("No se ha validado la información!!");
        }

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        })
    }

    // Crear el objeto a guardar
    const articulo = new Articulo(parametros);

    // Asignar valores a objeto basado en el modelo (manual o automático)
    // articulo.titulo = parametros.titulo;

    // Guardar el artículo en la base de datos
    /*
    articulo.save((error, articuloGuardado) => {
        
        if (error || !articuloGuardado) {
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha guardado el artículo"
            });
        }

        // Devolver resultado
        return res.status(200).json({
            status: "success",
            articulo: articuloGuardado,
            mensaje: "Articulo creado con exito!!"
        })

    })
    */
    articulo.save().then((articuloGuardado) => {
        return res.status(200).json({
            status: "Success",
            article: articuloGuardado,
            message: "Articulo guardado correctamente!!"
        });
    }).catch((error) => {
        console.error(error);
        return res.status(400).json({
            status: "error",
            message: "Articulo no guardado"
        });
    });

}

module.exports = {
    prueba,
    curso,
    crear
}