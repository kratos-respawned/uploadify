import { db } from "@/db";
import { files } from "@/db/schema";
import { authOptions } from "@/lib/authOptions";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { DataTable } from "../dataTable";
import { redirect } from "next/navigation";

const Files = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const uploads = await db
    .select()
    .from(files)
    .where(eq(files.userId, session?.user.id));
  return (
    <section className="flex-grow">
      <DataTable data={uploads} />
    </section>
  );
};
export default Files;
