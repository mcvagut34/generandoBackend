import express from "express";
import { check } from 'express-validator';
import {crearActor, obtenerActorPorId, obtenerActores, actualizarActor, eliminarActor} from "../controllers/actor.js";

const router = express.Router();

router.post('/', [
  check('first_name').notEmpty().withMessage('El campo first_name es requerido'),
  check('last_name').notEmpty().withMessage('El campo last_name es requerido'),
], crearActor);

router.get('/:id', obtenerActorPorId);

router.get('/', obtenerActores);

router.put('/:id', [
  check('first_name').notEmpty().withMessage('El campo first_name es requerido'),
  check('last_name').notEmpty().withMessage('El campo last_name es requerido'),
], actualizarActor);

router.delete('/:id', eliminarActor);

export default router;

