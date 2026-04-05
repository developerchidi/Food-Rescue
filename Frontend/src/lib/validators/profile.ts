import { z } from "zod";

/** Đồng bộ với Backend `MerchantToggleSchema` (PATCH /users/merchant). */
export const MerchantToggleSchema = z.object({
  registerAsMerchant: z.boolean(),
});

export type MerchantToggleInput = z.infer<typeof MerchantToggleSchema>;
