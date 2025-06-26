import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    console.log("Registration API called:", { name, email })

    // Mock validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'A senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      )
    }

    // Mock user creation (replace with real database logic)
    const user = {
      id: Date.now().toString(),
      name,
      email,
      isAdmin: email === 'rayque542@gmail.com',
      createdAt: new Date().toISOString(),
      plan: 'free',
      balance: 0,
      totalEarnings: 0
    }

    // Mock JWT token generation (replace with real JWT)
    const token = 'mock_jwt_token_' + Date.now()

    console.log("User registered successfully:", user.id)

    return NextResponse.json({
      success: true,
      message: 'Conta criada com sucesso!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        plan: user.plan
      },
      token
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}