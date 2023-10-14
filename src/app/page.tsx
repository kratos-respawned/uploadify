import { Navbar } from "@/components/navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserProfile } from "@/components/userProfile";
import { authOptions } from "@/lib/authOptions";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Footer } from "./Footer";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="relative  h-screen">
      <Navbar />
      <section className=" grid place-items-center w-full h-full">
        <div className="text-center relative ">
          <span className="-z-10 absolute w-32  aspect-square top-4 blur-3xl  -translate-y-full -left-9 -translate-x-full  rounded-full bg-primary" />
          <h1 className="text-8xl font-cal py-2">File Uploader</h1>
          <p className="text-2xl font-cal pb-3">for all your JS apps.</p>
          <Link
            href={session?.user ? "/dashboard/files" : "/login"}
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "",
              })
            )}
          >
            Get Started
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
