import { LoginContainer } from "./SignIn";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard/files");
  }
  return (
    <main className=" min-h-screen grid place-items-center px-4">
      <LoginContainer />
    </main>
  );
};

export default Login;
