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
    <section className="h-[100dvh] grid place-items-center w-full ">
      <div className="text-center relative ">
        <span className="-z-10 absolute w-32  aspect-square top-4 blur-3xl  -translate-y-full max-sm:-left-0 -left-9 -translate-x-full  rounded-full bg-primary" />
        <h1 className=" text-[clamp(2.5rem,10vw,5rem)]  font-cal py-2">
          File Uploader
        </h1>
        <p className="text-[clamp(1rem,5vw,1.5rem)] font-cal pb-3">
          for all your JS apps.
        </p>
        <div className="flex justify-center items-center gap-x-4">
          <Link
            href={session?.user ? "/dashboard/files" : "/login"}
            className={cn(
              buttonVariants({
                variant: "default",
                className: "",
              })
            )}
          >
            Get Started
          </Link>
          <Link
            href={
              "https://github.com/kratos-respawned/younicorn_uploadify#uploadify"
            }
            target="_blank"
            referrerPolicy="no-referrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "",
              })
            )}
          >
            Docs
          </Link>
        </div>
      </div>
    </section>
  );
}
