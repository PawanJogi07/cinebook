import express from 'express'
import { getTheatres, getTheatreById, createTheatre, updateTheatre, deleteTheatre } from '../controllers/theatreController.js'

const router = express.Router()

router.get('/', getTheatres)
router.get('/:id', getTheatreById)
router.post('/', createTheatre)
router.put('/:id', updateTheatre)
router.delete('/:id', deleteTheatre)

export default router
