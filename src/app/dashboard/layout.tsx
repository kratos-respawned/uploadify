import { Navbar } from "@/components/navbar";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

import { FileIcon, LockOpen1Icon, BackpackIcon } from "@radix-ui/react-icons";
import { Navlink } from "./Navlinks";
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  //   if (!session) {
  //     redirect("/login");
  //   }
  return (
    <div className="relative min-h-screen ">
      <Navbar session={session} />
      <main className="px-20 pt-32 flex gap-x-36">
        <div className="flex flex-col gap-3">
          <Navlink name={Navlinks.FILES} url="/dashboard/files" />
          <Navlink name={Navlinks.API} url="/dashboard/keys" />
          <Navlink name={Navlinks.BILLING} url="/dashboard/coming_soon" />
        </div>
        {children}
      </main>
    </div>
  );
};
export default Layout;
export enum Navlinks {
  FILES = "Files",
  API = "API Keys",
  BILLING = "Billing",
}
