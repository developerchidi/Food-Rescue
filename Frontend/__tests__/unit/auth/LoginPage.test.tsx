import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// --- Mocks ---
const mockPush = jest.fn();
const mockRefresh = jest.fn();
const mockSignIn = jest.fn() as jest.MockedFunction<
  (provider: string, options: { redirect: boolean; email: string; password: string }) => Promise<{ error: string | null }>
>;

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: mockRefresh }),
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock("next-auth/react", () => ({
  signIn: (provider: string, options: { redirect: boolean; email: string; password: string }) =>
    mockSignIn(provider, options),
}));

// Mock lucide-react icons to simple spans
jest.mock("lucide-react", () => ({
  Mail: (props: Record<string, unknown>) => <span data-testid="icon-mail" {...props} />,
  Lock: (props: Record<string, unknown>) => <span data-testid="icon-lock" {...props} />,
  ArrowRight: (props: Record<string, unknown>) => <span data-testid="icon-arrow" {...props} />,
  Eye: (props: Record<string, unknown>) => <span data-testid="icon-eye" {...props} />,
  EyeOff: (props: Record<string, unknown>) => <span data-testid="icon-eyeoff" {...props} />,
  Leaf: (props: Record<string, unknown>) => <span data-testid="icon-leaf" {...props} />,
}));

import LoginPage from "@/app/(auth)/login/page";

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("hiển thị tiêu đề và form đăng nhập", () => {
    render(<LoginPage />);
    expect(screen.getByText("Chào mừng trở lại!")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("ten@ví-dụ.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /đăng nhập/i })).toBeInTheDocument();
  });

  it("hiển thị link đăng ký", () => {
    render(<LoginPage />);
    const registerLink = screen.getByRole("link", { name: /đăng ký ngay/i });
    expect(registerLink).toHaveAttribute("href", "/register");
  });

  it("gọi signIn và redirect khi đăng nhập thành công", async () => {
    mockSignIn.mockResolvedValue({ error: null });
    const user = userEvent.setup();

    render(<LoginPage />);

    await user.type(screen.getByPlaceholderText("ten@ví-dụ.com"), "test@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "password123");
    await user.click(screen.getByRole("button", { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("credentials", {
        redirect: false,
        email: "test@example.com",
        password: "password123",
      });
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it("hiển thị lỗi khi đăng nhập thất bại", async () => {
    mockSignIn.mockResolvedValue({ error: "CredentialsSignin" });
    const user = userEvent.setup();

    render(<LoginPage />);

    await user.type(screen.getByPlaceholderText("ten@ví-dụ.com"), "wrong@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "wrongpass");
    await user.click(screen.getByRole("button", { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(screen.getByText("Email hoặc mật khẩu không chính xác")).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("hiển thị lỗi khi signIn ném exception", async () => {
    mockSignIn.mockRejectedValue(new Error("Network error"));
    const user = userEvent.setup();

    render(<LoginPage />);

    await user.type(screen.getByPlaceholderText("ten@ví-dụ.com"), "test@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "password123");
    await user.click(screen.getByRole("button", { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(screen.getByText("Đã xảy ra lỗi không mong muốn")).toBeInTheDocument();
    });
  });

  it("disable nút submit trong khi đang loading", async () => {
    // signIn trả về promise chưa resolve để giữ trạng thái loading
    let resolveSignIn: (value: { error: string | null }) => void;
    mockSignIn.mockReturnValue(
      new Promise((resolve) => {
        resolveSignIn = resolve;
      })
    );
    const user = userEvent.setup();

    render(<LoginPage />);

    await user.type(screen.getByPlaceholderText("ten@ví-dụ.com"), "test@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "password123");
    await user.click(screen.getByRole("button", { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(screen.getByText("Đang đăng nhập...")).toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", { name: /đang đăng nhập/i });
    expect(submitButton).toBeDisabled();

    // Cleanup
    resolveSignIn!({ error: null });
  });
});
