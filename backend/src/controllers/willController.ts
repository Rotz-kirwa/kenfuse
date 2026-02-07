import { Request, Response, NextFunction } from 'express'
import prisma from '../config/database'
import { AppError } from '../middleware/errorHandler'
import PDFDocument from 'pdfkit'

export const getAllWills = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wills = await prisma.will.findMany({
      where: { userId: req.user.id },
      include: {
        beneficiaries: true,
        assets: true,
        witnesses: true
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json({
      success: true,
      data: wills
    })
  } catch (error) {
    next(error)
  }
}

export const getWillById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const will = await prisma.will.findFirst({
      where: { id, userId: req.user.id },
      include: {
        beneficiaries: true,
        assets: true,
        witnesses: true
      }
    })

    if (!will) {
      throw new AppError('Will not found', 404)
    }

    res.json({
      success: true,
      data: will
    })
  } catch (error) {
    next(error)
  }
}

export const createWill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, executor, beneficiaries, assets, witnesses } = req.body

    const will = await prisma.will.create({
      data: {
        userId: req.user.id,
        title: title || 'Last Will and Testament',
        executor: executor || 'Not specified',
        beneficiaries: beneficiaries?.length ? {
          create: beneficiaries.map(({ id, ...b }: any) => ({
            ...b,
            userId: req.user.id
          }))
        } : undefined,
        assets: assets?.length ? {
          create: assets.map(({ id, ...a }: any) => a)
        } : undefined,
        witnesses: witnesses?.length ? {
          create: witnesses.map(({ id, ...w }: any) => w)
        } : undefined
      },
      include: {
        beneficiaries: true,
        assets: true,
        witnesses: true
      }
    })

    res.status(201).json({
      success: true,
      message: 'Will created successfully',
      data: will
    })
  } catch (error) {
    next(error)
  }
}

export const updateWill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { title, executor, status } = req.body

    const existingWill = await prisma.will.findFirst({
      where: { id, userId: req.user.id }
    })

    if (!existingWill) {
      throw new AppError('Will not found', 404)
    }

    const will = await prisma.will.update({
      where: { id },
      data: { title, executor, status },
      include: {
        beneficiaries: true,
        assets: true,
        witnesses: true
      }
    })

    res.json({
      success: true,
      message: 'Will updated successfully',
      data: will
    })
  } catch (error) {
    next(error)
  }
}

export const deleteWill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const will = await prisma.will.findFirst({
      where: { id, userId: req.user.id }
    })

    if (!will) {
      throw new AppError('Will not found', 404)
    }

    await prisma.will.delete({ where: { id } })

    res.json({
      success: true,
      message: 'Will deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const generateWillPDF = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const will = await prisma.will.findFirst({
      where: { id, userId: req.user.id },
      include: {
        beneficiaries: true,
        assets: true,
        witnesses: true
      }
    })

    if (!will) {
      throw new AppError('Will not found', 404)
    }

    const doc = new PDFDocument({ margin: 50 })
    
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=will_${will.id}.pdf`)
    
    doc.pipe(res)

    doc.fontSize(20).text('LAST WILL AND TESTAMENT', { align: 'center' })
    doc.moveDown()
    doc.fontSize(12).text(`Title: ${will.title}`)
    doc.text(`Executor: ${will.executor}`)
    doc.text(`Date: ${new Date().toLocaleDateString()}`)
    doc.moveDown()

    if (will.beneficiaries.length > 0) {
      doc.fontSize(16).text('Beneficiaries', { underline: true })
      doc.moveDown(0.5)
      will.beneficiaries.forEach((b, i) => {
        doc.fontSize(12).text(`${i + 1}. ${b.name} (${b.relationship}) - ${b.percentage}%`)
        doc.fontSize(10).text(`   Email: ${b.email}, Phone: ${b.phone}`)
        doc.text(`   Address: ${b.address}`)
        doc.moveDown(0.5)
      })
      doc.moveDown()
    }

    if (will.assets.length > 0) {
      doc.fontSize(16).text('Assets', { underline: true })
      doc.moveDown(0.5)
      will.assets.forEach((a, i) => {
        doc.fontSize(12).text(`${i + 1}. ${a.name} (${a.type})`)
        doc.fontSize(10).text(`   Value: KES ${a.value.toLocaleString()}`)
        doc.text(`   Location: ${a.location || 'N/A'}`)
        doc.moveDown(0.5)
      })
      doc.moveDown()
    }

    if (will.witnesses.length > 0) {
      doc.fontSize(16).text('Witnesses', { underline: true })
      doc.moveDown(0.5)
      will.witnesses.forEach((w, i) => {
        doc.fontSize(12).text(`${i + 1}. ${w.name}`)
        doc.fontSize(10).text(`   ID Number: ${w.idNumber}`)
        doc.moveDown(0.5)
      })
    }

    doc.end()
  } catch (error) {
    next(error)
  }
}
