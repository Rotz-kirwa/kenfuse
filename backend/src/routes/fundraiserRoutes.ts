import { Router } from 'express'
import { getAllFundraisers, getFundraiserById, createFundraiser, donateToFundraiser, updateFundraiser, deleteFundraiser } from '../controllers/fundraiserController'
import { authenticate } from '../middleware/auth'

const router = Router()

router.get('/', getAllFundraisers)
router.get('/:id', getFundraiserById)
router.post('/', authenticate, createFundraiser)
router.post('/:id/donate', donateToFundraiser)
router.put('/:id', authenticate, updateFundraiser)
router.delete('/:id', authenticate, deleteFundraiser)

export default router
