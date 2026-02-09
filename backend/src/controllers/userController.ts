import { Request, Response } from 'express'
import prisma from '../config/database'
import bcrypt from 'bcryptjs'

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const { name, phone, avatar } = req.body

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, phone, avatar },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
    })

    res.json({ success: true, data: updatedUser })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
}

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    const { currentPassword, newPassword } = req.body

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' })
      return
    }

    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      res.status(400).json({ success: false, error: 'Current password is incorrect' })
      return
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })

    res.json({ success: true, message: 'Password changed successfully' })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
}
