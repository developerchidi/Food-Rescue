import { donationStatusLabel } from "@/lib/donation-status";

describe("donationStatusLabel", () => {
  it("maps known statuses to Vietnamese labels", () => {
    expect(donationStatusLabel("REQUESTED")).toBe("Chờ shop duyệt");
    expect(donationStatusLabel("COMPLETED")).toBe("Hoàn tất");
    expect(donationStatusLabel("CANCELLED")).toBe("Đã hủy");
    expect(donationStatusLabel("APPROVED")).toBe("Đã duyệt — chờ quét QR");
  });

  it("returns raw string for unknown status", () => {
    expect(donationStatusLabel("UNKNOWN")).toBe("UNKNOWN");
  });
});
