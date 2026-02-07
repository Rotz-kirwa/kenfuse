import { Request, Response, NextFunction } from 'express'
import prisma from '../config/database'
import { AppError } from '../middleware/errorHandler'
import PDFDocument from 'pdfkit'

export const getAllMemorials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const memorials = await prisma.memorial.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    })

    res.json({
      success: true,
      data: memorials
    })
  } catch (error) {
    next(error)
  }
}

export const getMemorialById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const memorial = await prisma.memorial.findFirst({
      where: { id, userId: req.user.id }
    })

    if (!memorial) {
      throw new AppError('Memorial not found', 404)
    }

    res.json({
      success: true,
      data: memorial
    })
  } catch (error) {
    next(error)
  }
}

export const createMemorial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, name, birth_date, death_date, biography } = req.body

    const memorial = await prisma.memorial.create({
      data: {
        userId: req.user.id,
        title,
        name,
        birthDate: birth_date ? new Date(birth_date) : null,
        deathDate: death_date ? new Date(death_date) : null,
        biography
      }
    })

    res.status(201).json({
      success: true,
      message: 'Memorial created successfully',
      data: memorial
    })
  } catch (error) {
    next(error)
  }
}

export const updateMemorial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { title, name, birthDate, deathDate, biography, photos } = req.body

    const existingMemorial = await prisma.memorial.findFirst({
      where: { id, userId: req.user.id }
    })

    if (!existingMemorial) {
      throw new AppError('Memorial not found', 404)
    }

    const memorial = await prisma.memorial.update({
      where: { id },
      data: {
        title,
        name,
        birthDate: birthDate ? new Date(birthDate) : null,
        deathDate: deathDate ? new Date(deathDate) : null,
        biography,
        photos
      }
    })

    res.json({
      success: true,
      message: 'Memorial updated successfully',
      data: memorial
    })
  } catch (error) {
    next(error)
  }
}

export const deleteMemorial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const memorial = await prisma.memorial.findFirst({
      where: { id, userId: req.user.id }
    })

    if (!memorial) {
      throw new AppError('Memorial not found', 404)
    }

    await prisma.memorial.delete({ where: { id } })

    res.json({
      success: true,
      message: 'Memorial deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const generateMemorialPDF = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const memorial = await prisma.memorial.findFirst({
      where: { id, userId: req.user.id }
    })

    if (!memorial) {
      throw new AppError('Memorial not found', 404)
    }

    const doc = new PDFDocument({ margin: 50 })
    
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=memorial_${memorial.name.replace(/\s+/g, '_')}.pdf`)
    
    doc.pipe(res)

    // Title
    doc.fontSize(24).font('Helvetica-Bold').text(memorial.title, { align: 'center' })
    doc.moveDown()

    // Name
    doc.fontSize(18).font('Helvetica-Bold').text(memorial.name, { align: 'center' })
    doc.moveDown()

    // Dates
    if (memorial.birthDate || memorial.deathDate) {
      const birthStr = memorial.birthDate ? new Date(memorial.birthDate).toLocaleDateString() : '?'
      const deathStr = memorial.deathDate ? new Date(memorial.deathDate).toLocaleDateString() : '?'
      doc.fontSize(12).font('Helvetica').text(`${birthStr} - ${deathStr}`, { align: 'center' })
      doc.moveDown(2)
    }

    // Biography
    if (memorial.biography) {
      doc.fontSize(14).font('Helvetica-Bold').text('Biography', { underline: true })
      doc.moveDown(0.5)
      doc.fontSize(11).font('Helvetica').text(memorial.biography, { align: 'justify' })
    }

    doc.end()
  } catch (error) {
    next(error)
  }
}
