import { Router } from 'express'
import { getAllWills, getWillById, createWill, updateWill, deleteWill, generateWillPDF } from '../controllers/willController'
import { authenticate } from '../middleware/auth'

const router = Router()

router.use(authenticate)

router.get('/', getAllWills)
router.get('/:id', getWillById)
router.get('/:id/pdf', generateWillPDF)
router.post('/', createWill)
router.put('/:id', updateWill)
router.delete('/:id', deleteWill)

export default router
