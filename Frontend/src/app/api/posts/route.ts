import { NextResponse } from "next/server";
import { getBackendApiBaseForServer } from "@/lib/backend-url";

/**
 * Proxy danh sách bài đăng công khai — tránh client gọi nhầm cổng Next (3000).
 */
export async function GET() {
  try {
    const base = getBackendApiBaseForServer();
    const res = await fetch(`${base}/posts`, { cache: "no-store" });
    const body = await res.text();
    return new NextResponse(body, {
      status: res.status,
      headers: {
        "Content-Type":
          res.headers.get("Content-Type") || "application/json; charset=utf-8",
      },
    });
  } catch (e) {
    console.error("[api/posts] proxy error:", e);
    return NextResponse.json(
      {
        error:
          "Không kết nối được backend. Chạy API (thường cổng 3001) hoặc đặt BACKEND_INTERNAL_URL.",
      },
      { status: 502 }
    );
  }
}
