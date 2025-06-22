import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const user = await prisma.user.create({
      data: {
        email: 'teste@exemplo.com',
        name: 'Usuário de Teste',
        password: 'senha123'
      }
    })
    
    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return NextResponse.json({ success: false, error: 'Erro ao criar usuário' }, { status: 500 })
  }
} 