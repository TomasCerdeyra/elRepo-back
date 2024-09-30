import Carreras from "../models/Carerra.js";
import Materias from "../models/Materias.js";

class materiasController {

    static createMateria = async (req, res) => {
        try {
            const { name, carreras } = req.body

            // Verifico si la materia ya esta creada
            const materia = await Materias.findOne({ name: name });
            if (materia) {
                return res.status(404).send('Esta materia ya existe');
            }

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
    };

    static getAllMaterias = async (req, res) => {
        try {
            const materias = await Materias.find({})
            res.json(materias)

        } catch (error) {
            console.log(error)
            res.status(500).send("Error al obtener todas las materias");
        }

    };

    static deleteMateria = async (req, res) => {
        const { id } = req.params;  //obtencion del id de la materia
        try {
            const materia = await Materias.findByIdAndDelete(id); //buscar y elimina la materia por su identificador. Si no se encuentra, el resultado será null
            if (!materia) {
                return res.status(404).send('Materia no encontrada')  //Si no se encuentra la materia con el id proporcionado, se envía una respuesta con un estado 404 indicando que la materia no fue hallada.
            }
            res.json('Materia eliminada correctamente');
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al eliminar la materia');
        }
    };

    static updateMateria = async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;
        try {
            const materia = await Materias.findByIdAndUpdate(id, updatedData, { new: true });
            if (!materia) {
                return res.status(404).send('Materia no encontrada');
            }
            res.json(materia);
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al actualizar la materia');
        }
    };

    static getMateriaByCarrera = async (req, res) => {
        const { id } = req.params;

        try {

            const carrera = await Carreras.findById(id);

            if (!carrera) {
                return res.status(404).send('Carrear no encontrada');
            }

            // Busca todas las materias que tienen el id en el campo 'carreras: []' 
            const materias = await Materias.find({ carreras: id });

            if (!materias) {
                return res.status(404).send('Materias no encontrada en la carrera');
            }
            
            res.json({
                carrera: {
                    name: carrera.name
                },
                materias: materias
            });
            //la respuesta de esta petición GET será un JSON de las materias que estan asociadas al ID de la carrera   
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al obtener las materias por carrera')
        }
    };

}



export default materiasController