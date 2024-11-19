import config from '../config/config.js';
import Material from '../models/Materiales.js';
import fs from 'fs'
import Materias from '../models/Materias.js';
import path from 'path';

class MaterialesController {

  // Subir un material
  static subirMaterial = async (req, res) => {
    const { nombre, anio, descripcion, profesor, materia, tipoAporte } = req.body;


    try {
      const maxFileSize = 5 * 1024 * 1024; // 5 MB por archivo
      const maxTotalSize = 20 * 1024 * 1024; // 20 MB en total  
      let totalSize = 0;

      const rutasArchivos = [];
      const tiposArchivos = [];

      //Itero sobre todos los archivos subidos
      req.files.forEach((file) => {
        totalSize += file.size; // Sumar el tamaño del archivo
        
        // Validar el tamaño de cada archivo
        if (file.size > maxFileSize) {
          throw new Error(`El archivo ${file.originalname} excede el tamaño máximo permitido de 5 MB.`);
        }
        console.log(file.destination);
        const folderName = file.destination.split('\\').pop(); //Agarro el nombre de la carpeta donde va a estar el archivo
        const rutaArchivo = `uploads/${folderName}/${file.filename}`; //Hago la ruta con la carpeta done se va a ubicar el archivo
        const extension = path.extname(rutaArchivo).toLowerCase(); //Saco la extension del archivo que viene

        let tipo = '';
        if (['.jpg', '.jpeg', '.png', '.gif', '.svg'].includes(extension)) {
          tipo = 'imagen';
        } else if (['.pdf', '.doc', '.docx', '.ppt', '.pptx'].includes(extension)) {
          tipo = 'archivo';
        } else {
          tipo = 'desconocido';
        }

        rutasArchivos.push(rutaArchivo);
        tiposArchivos.push(tipo);
      })

      // Validar el tamaño total de los archivos
      if (totalSize > maxTotalSize) {
        return res.status(400).send('El tamaño total de los archivos excede el límite máximo permitido de 20 MB.');
      }

      const nuevoMaterial = new Material({
        nombre,
        anio,
        descripcion,
        profesor,
        rutasArchivos,
        materia,
        tipoAporte,
        tipo: tiposArchivos
      });

      await nuevoMaterial.save();
      res.status(201).json({ message: 'Material subido correctamente', material: nuevoMaterial });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al subir el material');
    }
  }

  //Obetener un material
  static getMaterial = async (req, res) => {
    try {
      const material = await Material.findOne({ _id: req.params.id })

      if (!material) {
        return res.status(404).send('Material no encontrdo')
      }

      res.json(material)
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al obtener el material');
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

      // Eliminar todos los archivos usando Promise.all()
      await Promise.all(material.rutasArchivos.map(async (rutaArchivo) => {
        const rutaSinUpload = rutaArchivo.replace('uploads', '')
        const rutaCompleta = config.URL_FIELDS + rutaSinUpload
        await fs.promises.unlink(rutaCompleta);
      }));

      // Eliminar el registro de la base de datos
      await material.deleteOne();
      res.send('Material eliminado correctamente');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar el material');
    }
  };


  //Traer todos los materiales de una materia
  static getMaterialesByMateria = async (req, res) => {

    try {

      const materia = await Materias.findById(req.params.id)

      if (!materia) {
        return res.status(404).send('Materia no encontrada');
      }

      const materiales = await Material.find({ materia: req.params.id }).sort({ anio: -1 })

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


  //Eliminar reporte de un material
  static eliminarDenuncia = async (req, res) => {
    try {
      const material = await Material.findById(req.params.id);

      if (!material) {
        return res.status(404).send('Material no encontrado');
      }
      // Incrementar el campo denuncias
      material.denuncias = 0;
      await material.save();

      return res.status(200).send('Denuncia eliminada corrertamente');
    } catch (error) {
      console.log(error);
      return res.status(500).send('Error al eliminar la denuncia denuncia');
    }
  }

  //Obtener las materias reportadas
  static getMaterialesReportados = async (req, res) => {
    try {
      const materialesReportados = await Material.find({ denuncias: { $gt: 0 } });

      if (!materialesReportados || materialesReportados.length === 0) {
        return res.status(404).send('No hay materiales denunciados');
      }

      res.json(materialesReportados)
    } catch (error) {
      console.log(error);

      return res.status(500).send('Error al obtener materiales reportados');
    }
  }

}



export default MaterialesController;
