import { Navbar } from "@/components/navbar";
import { Navlink } from "./Navlinks";
import { Footer } from "../Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uploadify/Dashboard",
  description: "Dashboard to manage your files and API keys.",
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="px-4 md:px-20 pt-32 flex-col lg:flex-row flex gap-x-36 gap-y-5">
      <div className="flex flex-row lg:flex-col  gap-3">
        <Navlink name={Navlinks.FILES} url="/dashboard/files" />
        <Navlink name={Navlinks.API} url="/dashboard/keys" />
        <Navlink name={Navlinks.BILLING} url="/dashboard/comingSoon" />
      </div>
      {children}
    </main>
  );
};
export default Layout;
export enum Navlinks {
  FILES = "Files",
  API = "API Keys",
  BILLING = "Billing",
}
