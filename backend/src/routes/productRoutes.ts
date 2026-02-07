import { Router } from 'express'
import prisma from '../config/database'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query
    const products = await prisma.product.findMany({
      where: category ? { category: category as any } : {},
      orderBy: { createdAt: 'desc' }
    })
    res.json({ success: true, data: products })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id }
    })
    res.json({ success: true, data: product })
  } catch (error) {
    next(error)
  }
})

export default router
