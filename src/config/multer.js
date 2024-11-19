import config from './config.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Materias from '../models/Materias.js';

// Guardar los archivos en subcarpetas por materia
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      // ID de la materia
      const materiaId = req.body.materia;

      // Buscar la materia en la base de datos para agarrar el nombre
      const materia = await Materias.findById(materiaId);
      if (!materia) {
        return cb(new Error('Materia no encontrada'));
      }

      // Convertir el nombre de la materia a minúsculas y reemplazar los espacios por guiones
      const folderName = materia.name.toLowerCase().replace(/\s+/g, '-');
      const folderPath = path.join(config.URL_FIELDS, folderName); // Ruta 'uploads/nombre-materia'

      // Si no existe la carpeta, crearla
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true }); // Crear la carpeta si no existe
      }

      cb(null, folderPath); // Guardar el archivo en la carpeta de la materia
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para cada archivo
  }
});

// Exporto el middleware
export const upload = multer({ storage });

