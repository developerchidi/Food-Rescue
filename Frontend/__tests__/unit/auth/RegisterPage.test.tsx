import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// --- Mocks ---
const mockPush = jest.fn();
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("lucide-react", () => ({
  User: (props: Record<string, unknown>) => <span data-testid="icon-user" {...props} />,
  Mail: (props: Record<string, unknown>) => <span data-testid="icon-mail" {...props} />,
  Lock: (props: Record<string, unknown>) => <span data-testid="icon-lock" {...props} />,
  ArrowRight: (props: Record<string, unknown>) => <span data-testid="icon-arrow" {...props} />,
  Leaf: (props: Record<string, unknown>) => <span data-testid="icon-leaf" {...props} />,
}));

// Mock global fetch
beforeAll(() => {
  global.fetch = mockFetch as unknown as typeof fetch;
});

import RegisterPage from "@/app/(auth)/register/page";

describe("RegisterPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("hiển thị form đăng ký với đầy đủ fields", () => {
    render(<RegisterPage />);
    expect(screen.getByText(/Tham gia/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nguyễn Văn A")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("ten@ví-dụ.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /bắt đầu hành trình/i })).toBeInTheDocument();
  });

  it("hiển thị link đăng nhập", () => {
    render(<RegisterPage />);
    const loginLink = screen.getByRole("link", { name: /đăng nhập/i });
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("gửi form và redirect khi đăng ký thành công", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Created" }),
    } as Response);
    const user = userEvent.setup();

    render(<RegisterPage />);

    await user.type(screen.getByPlaceholderText("Nguyễn Văn A"), "Trần Minh");
    await user.type(screen.getByPlaceholderText("ten@ví-dụ.com"), "minh@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "secure123");
    await user.click(screen.getByRole("button", { name: /bắt đầu hành trình/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Trần Minh",
          email: "minh@example.com",
          password: "secure123",
        }),
      });
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login?success=Account created");
    });
  });

  it("hiển thị lỗi khi server trả về error", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Email đã tồn tại" }),
    } as Response);
    const user = userEvent.setup();

    render(<RegisterPage />);

    await user.type(screen.getByPlaceholderText("Nguyễn Văn A"), "Trần Minh");
    await user.type(screen.getByPlaceholderText("ten@ví-dụ.com"), "exists@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "secure123");
    await user.click(screen.getByRole("button", { name: /bắt đầu hành trình/i }));

    await waitFor(() => {
      expect(screen.getByText("Email đã tồn tại")).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("hiển thị lỗi khi fetch ném exception (network error)", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));
    const user = userEvent.setup();

    render(<RegisterPage />);

    await user.type(screen.getByPlaceholderText("Nguyễn Văn A"), "Trần Minh");
    await user.type(screen.getByPlaceholderText("ten@ví-dụ.com"), "test@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "secure123");
    await user.click(screen.getByRole("button", { name: /bắt đầu hành trình/i }));

    await waitFor(() => {
      expect(screen.getByText("Network error")).toBeInTheDocument();
    });
  });

  it("disable nút submit khi đang loading", async () => {
    let resolveRequest: (value: Response) => void;
    mockFetch.mockReturnValue(
      new Promise<Response>((resolve) => {
        resolveRequest = resolve;
      })
    );
    const user = userEvent.setup();

    render(<RegisterPage />);

    await user.type(screen.getByPlaceholderText("Nguyễn Văn A"), "Trần Minh");
    await user.type(screen.getByPlaceholderText("ten@ví-dụ.com"), "test@example.com");
    await user.type(screen.getByPlaceholderText("••••••••"), "secure123");
    await user.click(screen.getByRole("button", { name: /bắt đầu hành trình/i }));

    await waitFor(() => {
      expect(screen.getByText("Đang xử lý...")).toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", { name: /đang xử lý/i });
    expect(submitButton).toBeDisabled();

    // Cleanup
    resolveRequest!({ ok: true, json: async () => ({}) } as Response);
  });
});
