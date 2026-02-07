import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../config/database'
import { AppError } from '../middleware/errorHandler'

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name, phone } = req.body

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      throw new AppError('Email already registered', 400)
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true
      }
    })

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { user, token }
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new AppError('Invalid credentials', 401)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401)
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )

    const { password: _, ...userWithoutPassword } = user

    res.json({
      success: true,
      message: 'Login successful',
      data: { user: userWithoutPassword, token }
    })
  } catch (error) {
    next(error)
  }
}

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        role: true,
        isVerified: true,
        createdAt: true
      }
    })

    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
}
