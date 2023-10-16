import { keygen } from "@/lib/keygen";
import { getKeys } from "@/lib/getKeys";
import { CopyKeyBtn, KeygenBtn } from "./Buttons";
import { RefreshKeys } from "./Actions";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const { API_KEY, API_SECRET, error } = await getKeys();
  if (error != null) return <div>error</div>;

  return (
    <section className=" flex-grow flex flex-col-reverse gap-5 lg:flex-col">
      <form action={RefreshKeys}>
        <KeygenBtn />
      </form>
      <div className="bg-black/40 text-sm overflow-hidden md:text-base px-5 py-4 rounded-lg ">
        <div className="pb-4 flex justify-between items-center">
          <p>.env.local</p>
          <CopyKeyBtn apiKey={API_KEY} secret={API_SECRET} />
        </div>
        <div className="pb-1 text-primary truncate">
          <span className="mr-2">$</span>API_KEY:
          <span className="ml-3 text-white">
            {API_KEY?.slice(0, 30) + "......"}
          </span>
        </div>
        <div className="text-primary truncate">
          <span className="mr-2">$</span>API_SECRET:
          <span className="ml-3 text-white">
            {API_SECRET?.slice(0, 30) + "......"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
