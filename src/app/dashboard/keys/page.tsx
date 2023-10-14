import { keygen } from "@/lib/keygen";
import { getKeys } from "@/lib/getKeys";
import { CopyKeyBtn, KeygenBtn } from "./Buttons";
import { RefreshKeys } from "./Actions";

const Dashboard = async () => {
  let keys = {
    API_KEY: "-1",
    API_SECRET: "-1",
    error: false,
  };
  const { API_KEY, API_SECRET, error } = await getKeys();
  if (error) {
    return <div>error</div>;
  }
  keys.API_KEY = API_KEY!;
  keys.API_SECRET = API_SECRET!;
  if (API_KEY == "-1" || API_SECRET == "-1") {
    const { API_KEY, API_SECRET, error } = await keygen();
    if (error) {
      return <div>error</div>;
    }
    keys.API_KEY = API_KEY!;
    keys.API_SECRET = API_SECRET!;
  }

  return (
    <section className=" flex-grow flex flex-col-reverse gap-5 lg:flex-col">
      <form action={RefreshKeys}>
        <KeygenBtn />
      </form>
      <div className="bg-black/40 text-sm overflow-hidden md:text-base px-5 py-4 rounded-lg ">
        <div className="pb-4 flex justify-between items-center">
          <p>.env.local</p>
          <CopyKeyBtn apiKey={keys.API_KEY} secret={keys.API_SECRET} />
        </div>
        <div className="pb-1 text-primary truncate">
          <span className="mr-2">$</span>API_KEY:
          <span className="ml-3 text-white">
            {keys.API_KEY?.slice(0, 30) + "......"}
          </span>
        </div>
        <div className="text-primary truncate">
          <span className="mr-2">$</span>API_SECRET:
          <span className="ml-3 text-white">
            {keys.API_SECRET?.slice(0, 30) + "......"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
