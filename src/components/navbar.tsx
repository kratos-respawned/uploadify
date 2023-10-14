import { cn } from "@/lib/utils";
import { Session, getServerSession } from "next-auth";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { UserProfile } from "./userProfile";
import { authOptions } from "@/lib/authOptions";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className=" absolute inset-x-0 top-0 flex justify-between px-4 md:px-20 pt-8">
      <Link href="/" className="font-cal text-xl md:text-2xl">
        <span className="text-primary">Upload</span>ify
      </Link>
      {!session?.user ? (
        <Link href="/login" className={cn(buttonVariants())}>
          Sign In
        </Link>
      ) : (
        <UserProfile session={session} />
      )}
    </header>
  );
};
