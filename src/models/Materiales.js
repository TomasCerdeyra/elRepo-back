import mongoose from 'mongoose';

const MaterialSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  anio: {
    type: String,
    required: true,
  },
  tipoAporte: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  profesor: {
    type: String,
    trim: true,
  },
  rutasArchivos: [{
    type: String, 
    required: true,
  }],
  materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia',  
    required: true,
  },
  tipo: [{
    type: String,
    required: true,
    trim: true
  }], 
  denuncias: {
    type: Number,
    default: 0,
    trim: true
  }
});

const Material = mongoose.model('Materiales', MaterialSchema);

export default Material;
