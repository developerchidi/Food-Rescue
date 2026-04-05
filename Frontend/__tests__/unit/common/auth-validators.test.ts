import { LoginSchema, RegisterSchema } from "@/lib/validators/auth";
import { EmailSchema, PasswordSchema } from "@/lib/validators/common";

describe("Auth Validators", () => {
  describe("EmailSchema", () => {
    it("accepts valid email and normalizes format", () => {
      const result = EmailSchema.parse("  USER@Example.com  ");
      expect(result).toBe("user@example.com");
    });

    it("rejects invalid email", () => {
      const parsed = EmailSchema.safeParse("not-an-email");
      expect(parsed.success).toBe(false);
    });
  });

  describe("PasswordSchema", () => {
    it("accepts password with at least 8 chars", () => {
      const parsed = PasswordSchema.safeParse("12345678");
      expect(parsed.success).toBe(true);
    });

    it("rejects short password", () => {
      const parsed = PasswordSchema.safeParse("1234");
      expect(parsed.success).toBe(false);
    });
  });

  describe("RegisterSchema", () => {
    it("passes with valid input", () => {
      const parsed = RegisterSchema.safeParse({
        name: "Nguyen Van A",
        email: "new@example.com",
        password: "12345678",
      });

      expect(parsed.success).toBe(true);
    });

    it("rejects invalid input", () => {
      const parsed = RegisterSchema.safeParse({
        name: "A",
        email: "invalid-email",
        password: "123",
      });

      expect(parsed.success).toBe(false);
    });
  });

  describe("LoginSchema", () => {
    it("passes with valid input", () => {
      const parsed = LoginSchema.safeParse({
        email: "user@example.com",
        password: "12345678",
      });

      expect(parsed.success).toBe(true);
    });

    it("rejects invalid input", () => {
      const parsed = LoginSchema.safeParse({
        email: "bad-email",
        password: "123",
      });

      expect(parsed.success).toBe(false);
    });
  });
});
