import Material from '../models/Materiales.js';
import fs from 'fs'
import Materias from '../models/Materias.js';

class MaterialesController {

  // Subir un material
  static subirMaterial = async (req, res) => {
    const { nombre, anio, descripcion, profesor, materia } = req.body;

    const folderName = req.file.destination.split('\\').pop();

    const rutaArchivo = `${folderName}/${req.file.filename}`; //Agarro la referencia de la ruta de la imagen

    try {
      const nuevoMaterial = new Material({
        nombre,
        anio,
        descripcion,
        profesor,
        rutaArchivo,
        materia   
      });

      await nuevoMaterial.save();
      res.status(201).json({ message: 'Material subido correctamente', material: nuevoMaterial });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al subir el material');
    }
  }

  // Obtener todos los materiales
  static getMateriales = async (req, res) => {
    try {
      const materiales = await Material.find() // Populamos la referencia de la materia
      res.json(materiales);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los materiales');
    }
  }

  // Eliminar un material
  static eliminarMaterial = async (req, res) => {
    try {
      const material = await Material.findById(req.params.id);

      if (!material) {
        return res.status(404).send('Material no encontrado');
      }

      // Eliminar el archivo del sistema de archivos
      fs.unlink(material.rutaArchivo, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error al eliminar el archivo');
        }
      });

      // Eliminar el registro de la base de datos
      await material.deleteOne();
      res.send('Material eliminado correctamente');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar el material');
    }
  }

  //Traer todos los materiales de una materia
  static getMaterialesByMateria = async (req, res) => {

    try {
      const materiales = await Material.find({materia: req.params.id})

      if (!materiales) {
        return res.status(404).send('Esta materia no tiene material en este momento');
      }

      res.json(materiales)
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al obtener los materiales por materia')
    }
  } 

  //Denunciar un material
  static reportMaterial = async (req, res) => {
    try {
      const material = await Material.findById(req.params.id);

      if (!material) {
        return res.status(404).send('Material no encontrado');
      }
      // Incrementar el campo denuncias
      material.denuncias += 1;
      await material.save();

      return res.status(200).send('Denuncia registrada exitosamente');
    } catch (error) {
      console.log(error);
      return res.status(500).send('Error al registrar la denuncia');
    }
  }
}



export default MaterialesController;
