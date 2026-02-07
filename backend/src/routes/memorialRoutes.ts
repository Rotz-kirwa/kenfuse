import { Router } from 'express'
import { getAllMemorials, getMemorialById, createMemorial, updateMemorial, deleteMemorial, generateMemorialPDF } from '../controllers/memorialController'
import { authenticate } from '../middleware/auth'

const router = Router()

router.use(authenticate)

router.get('/', getAllMemorials)
router.get('/:id', getMemorialById)
router.get('/:id/pdf', generateMemorialPDF)
router.post('/', createMemorial)
router.put('/:id', updateMemorial)
router.delete('/:id', deleteMemorial)

export default router
