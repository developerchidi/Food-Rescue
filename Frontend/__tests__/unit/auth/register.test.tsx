import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RegisterPage from "@/app/(auth)/register/page";

const pushMock = jest.fn();
const originalFetch = global.fetch;

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("RegisterPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("submits register successfully and redirects to login page", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "ok" }),
    }) as unknown as typeof fetch;

    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText("Nguyễn Văn A"), {
      target: { value: "Nguyen Van A" },
    });

    fireEvent.change(screen.getByPlaceholderText("ten@ví-dụ.com"), {
      target: { value: "newuser@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Bắt đầu hành trình/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Nguyen Van A",
          email: "newuser@example.com",
          password: "12345678",
          registerAsMerchant: false,
        }),
      });
    });

    expect(pushMock).toHaveBeenCalledWith("/login?success=Account created");
  });

  it("shows error when register API returns invalid input", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Email này đã được sử dụng" }),
    }) as unknown as typeof fetch;

    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText("Nguyễn Văn A"), {
      target: { value: "Nguyen Van B" },
    });

    fireEvent.change(screen.getByPlaceholderText("ten@ví-dụ.com"), {
      target: { value: "existing@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Bắt đầu hành trình/i }));

    expect(await screen.findByText("Email này đã được sử dụng")).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("shows system error when register request throws", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Đã xảy ra lỗi hệ thống")) as unknown as typeof fetch;

    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText("Nguyễn Văn A"), {
      target: { value: "Nguyen Van C" },
    });

    fireEvent.change(screen.getByPlaceholderText("ten@ví-dụ.com"), {
      target: { value: "network@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Bắt đầu hành trình/i }));

    expect(await screen.findByText("Đã xảy ra lỗi hệ thống")).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
