import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

// Mock LoginForm component for testing
const MockLoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const successMessage = searchParams.get('success')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (res?.error) {
        setError('Email hoặc mật khẩu không chính xác')
      } else {
        router.push('/')
        router.refresh()
      }
    } catch (err) {
      setError('Đã xảy ra lỗi không mong muốn')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Chào mừng trở lại!</h1>
      <p>Hãy đăng nhập để tiếp tục hành trình giải cứu của bạn.</p>

      {successMessage && (
        <div role="alert" className="success-message">
          Đăng ký thành công! Hãy đăng nhập ngay.
        </div>
      )}

      {error && (
        <div role="alert" className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="ten@ví-dụ.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <div>
          <button type="button" className="forgot-password">
            Quên mật khẩu?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          data-testid="login-submit"
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>

      <p>
        Bạn chưa có tài khoản?{' '}
        <a href="/register">Đăng ký ngay</a>
      </p>
    </div>
  )
}

// Mock React to use in this test
import React from 'react'

describe('LoginForm Component', () => {
  const mockPush = jest.fn()
  const mockRefresh = jest.fn()
  const mockSearchParams = new URLSearchParams()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    })
    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams)
  })

  test('should render login form with all required elements', () => {
    render(<MockLoginForm />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Chào mừng trở lại!')
    expect(screen.getByText(/Hãy đăng nhập để tiếp tục/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mật khẩu/i)).toBeInTheDocument()
    expect(screen.getByTestId('login-submit')).toBeInTheDocument()
  })

  test('should render email input with correct type and attributes', () => {
    render(<MockLoginForm />)

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('required')
    expect(emailInput).toHaveAttribute('placeholder', 'ten@ví-dụ.com')
  })

  test('should render password input with correct type and attributes', () => {
    render(<MockLoginForm />)

    const passwordInput = screen.getByLabelText(/mật khẩu/i) as HTMLInputElement
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(passwordInput).toHaveAttribute('required')
    expect(passwordInput).toHaveAttribute('placeholder', '••••••••')
  })

  test('should toggle password visibility when show/hide button is clicked', async () => {
    const user = userEvent.setup()
    render(<MockLoginForm />)

    const passwordInput = screen.getByLabelText(/mật khẩu/i) as HTMLInputElement
    const toggleButton = screen.getByRole('button', { name: /show/i })

    expect(passwordInput.type).toBe('password')

    await user.click(toggleButton)
    expect(passwordInput.type).toBe('text')

    await user.click(toggleButton)
    expect(passwordInput.type).toBe('password')
  })

  test('should display success message when coming from register page', () => {
    const searchParams = new URLSearchParams('?success=Account created')
    ;(useSearchParams as jest.Mock).mockReturnValue(searchParams)

    render(<MockLoginForm />)

    expect(screen.getByRole('alert')).toHaveTextContent(/Đăng ký thành công/i)
  })

  test('should allow user to type in email field', async () => {
    const user = userEvent.setup()
    render(<MockLoginForm />)

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement

    await user.type(emailInput, 'test@example.com')

    expect(emailInput.value).toBe('test@example.com')
  })

  test('should allow user to type in password field', async () => {
    const user = userEvent.setup()
    render(<MockLoginForm />)

    const passwordInput = screen.getByLabelText(/mật khẩu/i) as HTMLInputElement

    await user.type(passwordInput, 'password123')

    expect(passwordInput.value).toBe('password123')
  })

  test('should call signIn with correct credentials on form submit', async () => {
    const user = userEvent.setup()
    ;(signIn as jest.Mock).mockResolvedValue({ ok: true })

    render(<MockLoginForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/mật khẩu/i)
    const submitBtn = screen.getByTestId('login-submit')

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitBtn)

    expect(signIn).toHaveBeenCalledWith('credentials', {
      redirect: false,
      email: 'test@example.com',
      password: 'password123',
    })
  })

  test('should show error message when login fails', async () => {
    const user = userEvent.setup()
    ;(signIn as jest.Mock).mockResolvedValue({ error: 'Invalid credentials' })

    render(<MockLoginForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/mật khẩu/i)
    const submitBtn = screen.getByTestId('login-submit')

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'wrongpassword')
    await user.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Email hoặc mật khẩu không chính xác/i)
    })
  })

  test('should disable submit button during submission', async () => {
    const user = userEvent.setup()
    ;(signIn as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 1000))
    )

    render(<MockLoginForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/mật khẩu/i)
    const submitBtn = screen.getByTestId('login-submit') as HTMLButtonElement

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')

    expect(submitBtn.disabled).toBe(false)

    await user.click(submitBtn)

    expect(submitBtn.disabled).toBe(true)
    expect(submitBtn).toHaveTextContent('Đang đăng nhập...')
  })

  test('should navigate to home page on successful login', async () => {
    const user = userEvent.setup()
    ;(signIn as jest.Mock).mockResolvedValue({ ok: true })

    render(<MockLoginForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/mật khẩu/i)
    const submitBtn = screen.getByTestId('login-submit')

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitBtn)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/')
      expect(mockRefresh).toHaveBeenCalled()
    })
  })

  test('should render forgot password link', () => {
    render(<MockLoginForm />)

    const forgotPasswordLink = screen.getByRole('button', { name: /Quên mật khẩu/i })
    expect(forgotPasswordLink).toBeInTheDocument()
  })

  test('should render sign up link with correct href', () => {
    render(<MockLoginForm />)

    const signupLink = screen.getByRole('link', { name: /Đăng ký ngay/i })
    expect(signupLink).toHaveAttribute('href', '/register')
  })

  test('should show generic error message on exception', async () => {
    const user = userEvent.setup()
    ;(signIn as jest.Mock).mockRejectedValue(new Error('Network error'))

    render(<MockLoginForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/mật khẩu/i)
    const submitBtn = screen.getByTestId('login-submit')

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Đã xảy ra lỗi không mong muốn/i)
    })
  })

  test('should clear error message before new submission attempt', async () => {
    const user = userEvent.setup()
    ;(signIn as jest.Mock)
      .mockResolvedValueOnce({ error: 'Invalid credentials' })
      .mockResolvedValueOnce({ ok: true })

    render(<MockLoginForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/mật khẩu/i)
    const submitBtn = screen.getByTestId('login-submit')

    // First attempt - fails
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'wrongpassword')
    await user.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Email hoặc mật khẩu không chính xác/i)
    })

    // Clear inputs and try again
    await user.clear(passwordInput)
    await user.type(passwordInput, 'correctpassword')
    await user.click(submitBtn)

    // Error message should be cleared before new attempt
    expect(screen.queryByText(/Email hoặc mật khẩu không chính xác/i)).not.toBeInTheDocument()
  })
})
