import { Request, Response, NextFunction } from 'express'
import prisma from '../config/database'
import { AppError } from '../middleware/errorHandler'

export const getAllFundraisers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fundraisers = await prisma.fundraiser.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        donations: {
          select: { amount: true, donorName: true, createdAt: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const fundraisersWithStats = fundraisers.map(f => ({
      ...f,
      donors: f.donations.length,
      daysLeft: Math.ceil((new Date(f.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    }))

    res.json({
      success: true,
      data: fundraisersWithStats
    })
  } catch (error) {
    next(error)
  }
}

export const getFundraiserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const fundraiser = await prisma.fundraiser.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        donations: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!fundraiser) {
      throw new AppError('Fundraiser not found', 404)
    }

    res.json({
      success: true,
      data: {
        ...fundraiser,
        donors: fundraiser.donations.length,
        daysLeft: Math.ceil((new Date(fundraiser.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      }
    })
  } catch (error) {
    next(error)
  }
}

export const createFundraiser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, goal, duration, image } = req.body

    const endDate = new Date()
    endDate.setDate(endDate.getDate() + parseInt(duration))

    const fundraiser = await prisma.fundraiser.create({
      data: {
        userId: req.user.id,
        title,
        description,
        goal: parseFloat(goal),
        image,
        endDate
      }
    })

    res.status(201).json({
      success: true,
      message: 'Fundraiser created successfully',
      data: fundraiser
    })
  } catch (error) {
    next(error)
  }
}

export const donateToFundraiser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { amount, donorName, message, isAnonymous, transactionId } = req.body

    const fundraiser = await prisma.fundraiser.findUnique({ where: { id } })

    if (!fundraiser) {
      throw new AppError('Fundraiser not found', 404)
    }

    if (fundraiser.status !== 'ACTIVE') {
      throw new AppError('Fundraiser is not active', 400)
    }

    const donation = await prisma.donation.create({
      data: {
        fundraiserId: id,
        userId: req.user?.id,
        donorName,
        amount: parseFloat(amount),
        message,
        isAnonymous: isAnonymous || false,
        transactionId
      }
    })

    await prisma.fundraiser.update({
      where: { id },
      data: {
        raised: { increment: parseFloat(amount) }
      }
    })

    res.status(201).json({
      success: true,
      message: 'Donation successful',
      data: donation
    })
  } catch (error) {
    next(error)
  }
}

export const updateFundraiser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { title, description, status } = req.body

    const existingFundraiser = await prisma.fundraiser.findFirst({
      where: { id, userId: req.user.id }
    })

    if (!existingFundraiser) {
      throw new AppError('Fundraiser not found', 404)
    }

    const fundraiser = await prisma.fundraiser.update({
      where: { id },
      data: { title, description, status }
    })

    res.json({
      success: true,
      message: 'Fundraiser updated successfully',
      data: fundraiser
    })
  } catch (error) {
    next(error)
  }
}

export const deleteFundraiser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const fundraiser = await prisma.fundraiser.findFirst({
      where: { id, userId: req.user.id }
    })

    if (!fundraiser) {
      throw new AppError('Fundraiser not found', 404)
    }

    await prisma.fundraiser.delete({ where: { id } })

    res.json({
      success: true,
      message: 'Fundraiser deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
