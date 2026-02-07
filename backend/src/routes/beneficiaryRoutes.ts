import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import prisma from '../config/database'

const router = Router()

router.use(authenticate)

router.get('/', async (req, res, next) => {
  try {
    const beneficiaries = await prisma.beneficiary.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    })
    res.json({ success: true, data: beneficiaries })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const beneficiary = await prisma.beneficiary.create({
      data: { ...req.body, userId: req.user.id }
    })
    res.status(201).json({ success: true, data: beneficiary })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const beneficiary = await prisma.beneficiary.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.json({ success: true, data: beneficiary })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.beneficiary.delete({ where: { id: req.params.id } })
    res.json({ success: true, message: 'Beneficiary deleted' })
  } catch (error) {
    next(error)
  }
})

export default router
