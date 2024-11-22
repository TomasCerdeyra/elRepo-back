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
            const materia = await Materias.findByIdAndDelete(id); 
            if (!materia) {
                return res.status(404).send('Materia no encontrada') 
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

            // Busca todas las materias que tienen el id 
            const materias = await Materias.find({ carreras: id });

            if (!materias) {
                return res.status(404).send('Materias no encontrada en la carrera');
            }

            res.json(materias);   
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al obtener las materias por carrera')
        }
    };

    static getMateriaByName = async (req, res) => {
        const { name } = req.query;
    
        // Normaliza el nombre ingresado y elimina tildes
        const normalizedInputName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
        try {
            // Busca todas las materias
            const materias = await Materias.find();
    
            const matchedMateria = materias.find(materia => {
                const normalizedName = materia.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                return normalizedName === normalizedInputName;
            });
    
            if (!matchedMateria) {
                return res.status(404).json({ message: 'Materia no encontrada' });
            }
    
            res.json(matchedMateria);
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al obtener la materia por nombre');
        }
    };

    
    

}



export default materiasController