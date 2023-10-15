import { validationResult } from 'express-validator';
import connection from "../db.js";

// Controlador para crear un actor
export const crearActor = async (req, res) => {
  // Validación de datos de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { first_name, last_name } = req.body;
  try {
    const query = 'INSERT INTO actor (first_name, last_name) VALUES (?, ?)';
    const [result] = await connection.execute(query, [first_name, last_name]);
    res.status(201).json({ success: true, message: 'Actor creado correctamente', actorId: result.insertId });
  } catch (error) {
    console.error('Error al crear el actor:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Controlador para obtener un actor por ID
export const obtenerActorPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM actor WHERE actor_id = ?';
    const [results] = await connection.execute(query, [id]);
    if (results.length === 0) {
      res.status(404).json({ success: false, message: 'Actor no encontrado' });
    } else {
      res.json({ success: true, actor: results[0] });
    }
  } catch (error) {
    console.error('Error al obtener el actor:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Controlador para obtener actores con paginación
export const obtenerActores = async (req, res) => {
    const { page = 1, perPage = 5 } = req.query;
    const startIndex = (page - 1) * perPage;
    
    try {
      const query = 'SELECT * FROM actor LIMIT ? OFFSET ?';
      const [results] = await connection.execute(query, [parseInt(perPage), parseInt(startIndex)]);
      res.json({ success: true, actores: results });
    } catch (error) {
      console.error('Error al obtener los actores:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    };
  }
  

// Controlador para actualizar un actor por ID
export const actualizarActor = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;
  try {
    const query = 'UPDATE actor SET first_name = ?, last_name = ? WHERE actor_id = ?';
    await connection.execute(query, [first_name, last_name, id]);
    res.json({ success: true, message: 'Actor actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el actor:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Controlador para eliminar un actor por ID
export const eliminarActor = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM actor WHERE actor_id = ?';
    await connection.execute(query, [id]);
    res.json({ success: true, message: 'Actor eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el actor:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};
