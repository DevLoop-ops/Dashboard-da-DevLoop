import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    })
    
    return NextResponse.json({ success: true, users })
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Erro ao buscar usuários' 
    }, { 
      status: 500 
    })
  }
}

export async function POST() {
  try {
    const user = await prisma.user.create({
      data: {
        name: 'João',
        email: 'joaotaxas12@gmail.com',
        password: '123456'
      }
    })
    
    return NextResponse.json({ 
      success: true, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Erro ao criar usuário' 
    }, { 
      status: 500 
    })
  }
} 