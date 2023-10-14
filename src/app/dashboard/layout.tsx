import { Navbar } from "@/components/navbar";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { Navlink } from "./Navlinks";
import { Footer } from "../Footer";
import { redirect } from "next/navigation";
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="relative min-h-screen ">
      <Navbar session={session} />
      <main className="px-4 md:px-20 pt-32 flex-col lg:flex-row flex gap-x-36 gap-y-5">
        <div className="flex flex-row lg:flex-col  gap-3">
          <Navlink name={Navlinks.FILES} url="/dashboard/files" />
          <Navlink name={Navlinks.API} url="/dashboard/keys" />
          <Navlink name={Navlinks.BILLING} url="/dashboard/comingSoon" />
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
export enum Navlinks {
  FILES = "Files",
  API = "API Keys",
  BILLING = "Billing",
}
