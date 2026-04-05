import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPage from "@/app/(auth)/login/page";
import { signIn } from "next-auth/react";

const pushMock = jest.fn();
const refreshMock = jest.fn();
let successQuery: string | null = null;

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
  useSearchParams: () => ({
    get: (key: string) => (key === "success" ? successQuery : null),
  }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    successQuery = null;
  });

  it("shows success message when redirected from register", () => {
    successQuery = "Account created";

    render(<LoginPage />);

    expect(screen.getByText("Đăng ký thành công! Hãy đăng nhập ngay.")).toBeInTheDocument();
  });

  it("submits login successfully and redirects to home", async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: null });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("ten@ví-dụ.com"), {
      target: { value: "user@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Đăng nhập/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        redirect: false,
        email: "user@example.com",
        password: "12345678",
      });
    });

    expect(pushMock).toHaveBeenCalledWith("/");
    expect(refreshMock).toHaveBeenCalledTimes(1);
  });

  it("shows error message for invalid credentials", async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: "CredentialsSignin" });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("ten@ví-dụ.com"), {
      target: { value: "wrong@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "wrong-pass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Đăng nhập/i }));

    expect(await screen.findByText("Email hoặc mật khẩu không chính xác")).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
