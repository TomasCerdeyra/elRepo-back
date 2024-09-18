import mongoose from "mongoose";

const MateriaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    carreras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Carrera' }] // Arreglo de referencias a IDs de Carrera
}) 

const Materias = mongoose.model('Materias', MateriaSchema)

export default Materias