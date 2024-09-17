import Carerra from "../models/Carerra.js";

class carrerasController {

    static createCarreras = async (req, res) => {
        const carrera = new Carerra(req.body)
        try {
            await carrera.save()
            res.send('Carrera creada correctamente')
        } catch (error) {
            console.log(error);
        }
    }

    static getAllCarreras = async (req, res)=> {

        const carreras = await Carerra.find({})

        try {
            res.json(carreras)
        } catch (error) {
            console.log(error);
        }
    }
}

export default carrerasController