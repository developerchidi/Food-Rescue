import { LoginSchema, RegisterSchema } from "@/lib/validators/auth";
import { EmailSchema, PasswordSchema, IdSchema } from "@/lib/validators/common";
import { RescueSchema } from "@/lib/validators/donations";
import { CreateFoodPostSchema } from "@/lib/validators/posts";
import { calculateDistance, formatDistance } from "@/lib/geolocation";

// ====== Common Validators ======

describe("EmailSchema", () => {
  it("chấp nhận email hợp lệ", () => {
    const result = EmailSchema.safeParse("test@example.com");
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe("test@example.com");
  });

  it("trim và lowercase email", () => {
    const result = EmailSchema.safeParse("  Test@Example.COM  ");
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe("test@example.com");
  });

  it("từ chối email không hợp lệ", () => {
    const result = EmailSchema.safeParse("not-an-email");
    expect(result.success).toBe(false);
  });

  it("từ chối chuỗi rỗng", () => {
    const result = EmailSchema.safeParse("");
    expect(result.success).toBe(false);
  });
});

describe("PasswordSchema", () => {
  it("chấp nhận mật khẩu >= 8 ký tự", () => {
    const result = PasswordSchema.safeParse("12345678");
    expect(result.success).toBe(true);
  });

  it("từ chối mật khẩu < 8 ký tự", () => {
    const result = PasswordSchema.safeParse("1234567");
    expect(result.success).toBe(false);
  });
});

describe("IdSchema", () => {
  it("chấp nhận UUID hợp lệ", () => {
    const result = IdSchema.safeParse("550e8400-e29b-41d4-a716-446655440000");
    expect(result.success).toBe(true);
  });

  it("từ chối chuỗi không phải UUID", () => {
    const result = IdSchema.safeParse("not-a-uuid");
    expect(result.success).toBe(false);
  });
});

// ====== Auth Validators ======

describe("LoginSchema", () => {
  it("chấp nhận input hợp lệ", () => {
    const result = LoginSchema.safeParse({
      email: "user@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("từ chối khi thiếu email", () => {
    const result = LoginSchema.safeParse({ password: "password123" });
    expect(result.success).toBe(false);
  });

  it("từ chối khi mật khẩu quá ngắn", () => {
    const result = LoginSchema.safeParse({
      email: "user@example.com",
      password: "short",
    });
    expect(result.success).toBe(false);
  });
});

describe("RegisterSchema", () => {
  it("chấp nhận input đầy đủ hợp lệ", () => {
    const result = RegisterSchema.safeParse({
      name: "Nguyễn Văn A",
      email: "a@example.com",
      password: "secure1234",
    });
    expect(result.success).toBe(true);
  });

  it("từ chối tên quá ngắn (< 2 ký tự)", () => {
    const result = RegisterSchema.safeParse({
      name: "A",
      email: "a@example.com",
      password: "secure1234",
    });
    expect(result.success).toBe(false);
  });

  it("trim khoảng trắng tên", () => {
    const result = RegisterSchema.safeParse({
      name: "  Minh  ",
      email: "a@example.com",
      password: "secure1234",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Minh");
  });
});

// ====== Donation / Rescue Validators ======

describe("RescueSchema", () => {
  const validUUID = "550e8400-e29b-41d4-a716-446655440000";

  it("chấp nhận PICKUP không cần address/phone", () => {
    const result = RescueSchema.safeParse({
      postId: validUUID,
      quantity: 2,
      fulfillmentMethod: "PICKUP",
    });
    expect(result.success).toBe(true);
  });

  it("chấp nhận DELIVERY với address + phone", () => {
    const result = RescueSchema.safeParse({
      postId: validUUID,
      quantity: 1,
      fulfillmentMethod: "DELIVERY",
      address: "123 Nguyễn Huệ, Q1",
      phone: "0912345678",
    });
    expect(result.success).toBe(true);
  });

  it("từ chối DELIVERY khi thiếu address", () => {
    const result = RescueSchema.safeParse({
      postId: validUUID,
      quantity: 1,
      fulfillmentMethod: "DELIVERY",
      phone: "0912345678",
    });
    expect(result.success).toBe(false);
  });

  it("từ chối DELIVERY khi thiếu phone", () => {
    const result = RescueSchema.safeParse({
      postId: validUUID,
      quantity: 1,
      fulfillmentMethod: "DELIVERY",
      address: "123 Nguyễn Huệ, Q1",
    });
    expect(result.success).toBe(false);
  });

  it("từ chối quantity <= 0", () => {
    const result = RescueSchema.safeParse({
      postId: validUUID,
      quantity: 0,
      fulfillmentMethod: "PICKUP",
    });
    expect(result.success).toBe(false);
  });

  it("từ chối số điện thoại không hợp lệ", () => {
    const result = RescueSchema.safeParse({
      postId: validUUID,
      quantity: 1,
      fulfillmentMethod: "DELIVERY",
      address: "123 Nguyễn Huệ",
      phone: "12345",
    });
    expect(result.success).toBe(false);
  });
});

// ====== Food Post Validators ======

describe("CreateFoodPostSchema", () => {
  const validPost = {
    title: "Combo trưa văn phòng",
    quantity: 5,
    expiryDate: new Date(Date.now() + 86400000).toISOString(), // ngày mai
  };

  it("chấp nhận bài đăng hợp lệ tối thiểu", () => {
    const result = CreateFoodPostSchema.safeParse(validPost);
    expect(result.success).toBe(true);
  });

  it("từ chối title quá ngắn (< 5 ký tự)", () => {
    const result = CreateFoodPostSchema.safeParse({
      ...validPost,
      title: "ABC",
    });
    expect(result.success).toBe(false);
  });

  it("từ chối khi expiryDate đã qua", () => {
    const result = CreateFoodPostSchema.safeParse({
      ...validPost,
      expiryDate: "2020-01-01T00:00:00Z",
    });
    expect(result.success).toBe(false);
  });

  it("từ chối khi rescuePrice >= originalPrice", () => {
    const result = CreateFoodPostSchema.safeParse({
      ...validPost,
      originalPrice: 50000,
      rescuePrice: 60000,
    });
    expect(result.success).toBe(false);
  });

  it("chấp nhận khi rescuePrice < originalPrice", () => {
    const result = CreateFoodPostSchema.safeParse({
      ...validPost,
      originalPrice: 50000,
      rescuePrice: 25000,
    });
    expect(result.success).toBe(true);
  });
});

// ====== Geolocation Utils ======

describe("calculateDistance", () => {
  it("trả về 0 khi 2 điểm trùng nhau", () => {
    expect(calculateDistance(10.762622, 106.660172, 10.762622, 106.660172)).toBe(0);
  });

  it("tính khoảng cách HCM - Hà Nội khoảng 1200-1300km", () => {
    // HCM: 10.7769, 106.7009 — HN: 21.0285, 105.8542
    const d = calculateDistance(10.7769, 106.7009, 21.0285, 105.8542);
    expect(d).toBeGreaterThan(1100);
    expect(d).toBeLessThan(1400);
  });

  it("tính khoảng cách ngắn chính xác (~1km)", () => {
    // ~1km giữa 2 điểm gần nhau ở HCM
    const d = calculateDistance(10.762622, 106.660172, 10.771, 106.660172);
    expect(d).toBeGreaterThan(0.5);
    expect(d).toBeLessThan(2);
  });
});

describe("formatDistance", () => {
  it("hiển thị 'm' khi < 1km", () => {
    expect(formatDistance(0.5)).toBe("500m");
  });

  it("hiển thị 'km' khi >= 1km", () => {
    expect(formatDistance(2.3)).toBe("2.3km");
  });

  it("làm tròn mét", () => {
    expect(formatDistance(0.123)).toBe("123m");
  });
});
