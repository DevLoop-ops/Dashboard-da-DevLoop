import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json({ success: true, users })
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    return NextResponse.json({ success: false, error: 'Erro ao buscar usuários' }, { status: 500 })
  }
}

export async function POST() {
  try {
    // Lista de usuários de teste
    const testUsers = [
      {
        name: 'Maria Silva',
        email: 'maria.silva@gmail.com',
        password: 'senha123',
        accountType: 'personal'
      },
      {
        name: 'Carlos Oliveira',
        email: 'carlos.oliveira@gmail.com',
        password: 'senha456',
        accountType: 'personal'
      },
      {
        name: 'Empresa ABC Ltda',
        email: 'contato@empresaabc.com.br',
        password: 'senha789',
        accountType: 'business'
      },
      {
        name: 'Ana Santos',
        email: 'ana.santos@hotmail.com',
        password: 'senha101',
        accountType: 'personal'
      },
      {
        name: 'Tech Solutions S.A.',
        email: 'admin@techsolutions.com.br',
        password: 'senha202',
        accountType: 'business'
      }
    ]
    
    // Criar os usuários
    const createdUsers = await Promise.all(
      testUsers.map(user => 
        prisma.user.create({
          data: user
        })
      )
    )
    
    return NextResponse.json({ 
      success: true, 
      users: createdUsers.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        accountType: user.accountType,
        createdAt: user.createdAt
      }))
    })
  } catch (error) {
    console.error('Erro ao criar usuários de teste:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Erro ao criar usuários de teste' 
    }, { 
      status: 500 
    })
  }
} 