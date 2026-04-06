/**
 * Hướng B: REQUESTED = chờ shop duyệt → APPROVED = đã duyệt, quét QR hoàn tất → COMPLETED.
 */
export function donationStatusLabel(status: string): string {
  switch (status) {
    case "REQUESTED":
      return "Chờ shop duyệt";
    case "APPROVED":
      return "Đã duyệt — chờ quét QR";
    case "COMPLETED":
      return "Hoàn tất";
    case "CANCELLED":
      return "Đã hủy";
    default:
      return status;
  }
}
