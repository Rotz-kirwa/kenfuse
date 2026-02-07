import { Router } from 'express'
import { register, login, getMe } from '../controllers/authController'
import { authenticate } from '../middleware/auth'
import { body } from 'express-validator'
import { validate } from '../middleware/validate'

const router = Router()

router.post('/register', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 4, max: 4 }).withMessage('PIN must be exactly 4 digits'),
  body('name').notEmpty().withMessage('Name is required'),
  validate
], register)

router.post('/login', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
], login)

router.get('/me', authenticate, getMe)

export default router
