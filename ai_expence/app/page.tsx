
import Guest from "@/components/Guest";
import { checkUser } from "../lib/checkUser";
// import Image from "next/image";

export default async function Home() {
  const user = await checkUser();
  return (
    <div >
      {!user ? <Guest /> : <h1 className="text-3xl font-bold underline">Welcome back!</h1>}


    </div>
  );
}
