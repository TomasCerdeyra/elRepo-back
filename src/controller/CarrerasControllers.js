import Carreras from "../models/Carerra.js";

class carrerasController {
  
  static createCarreras = async (req, res) => {
    const carrera = new Carreras(req.body);
    try {
      await carrera.save();
      res.send('Carrera creada correctamente');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al crear la carrera');
    }
  };

  static updateCarrera = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const carrera = await Carreras.findByIdAndUpdate(id, updatedData, { new: true });
      if (!carrera) {
        return res.status(404).send('Carrera no encontrada');
      }
      res.json(carrera);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al actualizar la carrera');
    }
  };

  static deleteCarrera = async (req, res) => {
    const { id } = req.params;
    try {
      const carrera = await Carreras.findByIdAndDelete(id);
      if (!carrera) {
        return res.status(404).send('Carrera no encontrada');
      }
      res.send('Carrera eliminada correctamente');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al eliminar la carrera');
    }
  };

  static getAllCarreras = async (req, res) => {
    try {
      const carreras = await Carreras.find({});
      res.json(carreras);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al obtener las carreras');
    }
  };
}

export default carrerasController;
