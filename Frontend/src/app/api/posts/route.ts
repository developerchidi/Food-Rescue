import { NextResponse } from "next/server";
import { FoodPostService } from "@/services/FoodPostService";

export async function GET() {
  try {
    const posts = await FoodPostService.getAvailablePosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
