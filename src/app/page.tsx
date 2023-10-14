import { Navbar } from "@/components/navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserProfile } from "@/components/userProfile";
import { authOptions } from "@/lib/authOptions";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="relative  h-screen">
      <Navbar session={session} />
      <section className=" grid place-items-center w-full h-full">
        <div className="text-center relative ">
          <span className="-z-10 absolute w-32  aspect-square top-4 blur-3xl  -translate-y-full -left-9 -translate-x-full  rounded-full bg-primary" />
          <h1 className="text-8xl font-cal py-2">File Uploader</h1>
          <p className="text-2xl font-cal pb-3">for all your JS apps.</p>
          <Link
            href={session?.user ? "/dashboard" : "/login"}
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
      <footer className="absolute inset-x-0 bottom-0 text-center py-5 text-sm">
        Made with ❤️
        <br />
        by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/kratos-respawned"
          className="hover:text-primary transition-colors"
        >
          @kratos-respawned
        </a>
      </footer>
    </main>
  );
}
