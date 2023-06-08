const {UsuarioJugador, UsuarioDueño} = require('../models/usuario.js');

const crearUsuarioJugador = async(req, res) => {
        const{nombre} = req.body;

        const jugador = new UsuarioJugador({nombre})

        //Enviar respuesta con el usuario creado
        res.status(201).json({ jugador })
}

const crearUsuarioDuenio = async(request,response) => {
    const{nombre} = request.body;

    const duenio = new UsuarioDueño({nombre})

    response.status(201).json({duenio})
    
}

module.exports = {
    crearUsuarioJugador,
    crearUsuarioDuenio
};