import Carreras from "../models/Carerra.js";
import Materias from "../models/Materias.js";

class materiasController {

    static createMateria = async (req, res) => {
        try {
            //Tomo el nombre y el nombre de las carreras que me vienen de la peticion
            const { name, carreras } = req.body

            //Busco las carreras que tengan el nombre de las que  me vienen en la peticion
            const carrerasEncontradas = await Carreras.find({ name: { $in: carreras } });
            //Tomo las id de las carreras
            const idsCarreras = carrerasEncontradas.map(carrera => carrera._id);

            const nuevaMateria = new Materias({
                name, // Nombre de la materia
                carreras: idsCarreras // Asigno los IDs de las carreras a la materia
            });

            await nuevaMateria.save();
            res.status(201).json(nuevaMateria);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la materia', error });
        }
    }

    static getAllMaterias = async (req, res) => {

    }

    static deletMateria = async (req, res) => {

    }
}

export default materiasController