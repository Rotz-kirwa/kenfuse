import { Router } from 'express'
import { updateProfile, changePassword } from '../controllers/userController'
import { authenticate } from '../middleware/auth'
import { body } from 'express-validator'
import { validate } from '../middleware/validate'

const router = Router()

router.put('/profile', authenticate, updateProfile)

router.put('/password', authenticate, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 4, max: 4 }).withMessage('New PIN must be exactly 4 digits'),
  validate
], changePassword)

export default router
