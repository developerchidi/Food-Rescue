"use server";

import { auth } from "@/auth";
import { fetchFromBackend } from "@/lib/proxy";
import { revalidatePath } from "next/cache";

export async function approveDonationAction(donationId: string): Promise<{
  ok: boolean;
  message: string;
}> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, message: "Bạn cần đăng nhập." };
  }

  try {
    await fetchFromBackend(`/donations/${donationId}/approve`, {
      method: "PATCH",
    });
    revalidatePath("/merchant/orders");
    revalidatePath("/merchant/dashboard");
    revalidatePath("/orders");
    revalidatePath("/marketplace");
    revalidatePath(`/rescue/success/${donationId}`);
    return { ok: true, message: "" };
  } catch (e: unknown) {
    const msg =
      e instanceof Error && e.message ? e.message : "Không thể duyệt đơn.";
    return { ok: false, message: msg };
  }
}

export async function cancelDonationAction(donationId: string): Promise<{
  ok: boolean;
  message: string;
}> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, message: "Bạn cần đăng nhập." };
  }

  try {
    await fetchFromBackend(`/donations/${donationId}/cancel`, {
      method: "PATCH",
    });
    revalidatePath("/orders");
    revalidatePath("/merchant/orders");
    revalidatePath("/merchant/dashboard");
    revalidatePath("/marketplace");
    revalidatePath(`/rescue/success/${donationId}`);
    return { ok: true, message: "" };
  } catch (e: unknown) {
    const msg =
      e instanceof Error && e.message ? e.message : "Không thể hủy đơn.";
    return { ok: false, message: msg };
  }
}
