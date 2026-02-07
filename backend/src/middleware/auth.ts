import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from './errorHandler'
import prisma from '../config/database'

interface JwtPayload {
  userId: string
  email: string
}

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      throw new AppError('Authentication required', 401)
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true
      }
    })

    if (!user) {
      throw new AppError('User not found', 401)
    }

    req.user = user
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token', 401))
    } else {
      next(error)
    }
  }
}

export const authorize = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401))
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions', 403))
    }

    next()
  }
}
