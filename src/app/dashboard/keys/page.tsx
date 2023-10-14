import { Button } from "@/components/ui/button";
import { keygen } from "@/lib/keygen";
import { Suspense } from "react";
import { Keys } from "./Keys";

const Dashboard = async () => {
  const { API_KEY, API_SECRET, error } = await keygen();
  if (error) {
    return <div>error</div>;
  }
  return (
    <main className=" flex-grow">
      <Keys api_key={API_KEY!} secret={API_SECRET!} />
    </main>
  );
};

export default Dashboard;
