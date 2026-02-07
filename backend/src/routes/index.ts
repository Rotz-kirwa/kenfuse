import { Router } from 'express'
import authRoutes from './authRoutes'
import willRoutes from './willRoutes'
import memorialRoutes from './memorialRoutes'
import beneficiaryRoutes from './beneficiaryRoutes'
import fundraiserRoutes from './fundraiserRoutes'
import productRoutes from './productRoutes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/wills', willRoutes)
router.use('/memorials', memorialRoutes)
router.use('/beneficiaries', beneficiaryRoutes)
router.use('/fundraisers', fundraiserRoutes)
router.use('/products', productRoutes)

export default router
