import { revalidatePath } from "next/cache";

export const RefreshKeys = async () => {
  "use server";
  const { keygen } = await import("@/lib/keygen");
  const { error, API_KEY, API_SECRET } = await keygen();
  revalidatePath("/dashboard/keys");
};
