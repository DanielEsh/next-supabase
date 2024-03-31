import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {ClientUser} from "@/components/client-user";
import {Permissions} from "@/components/Permissions";
import {Groups} from "@/components/Groups";
import {Users} from "@/components/Users";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/unauthenticated");
  }

  const user = await supabase.auth.getUser()

  const { data, error, status, count} = await supabase.from("user").select("*").eq('id', user?.data.user?.id).single();

  return (
    <>
      <h1>Hello, {session.user.email}</h1>
      <div>status: {status}</div>
      <div>count: {data?.length}</div>

        {/*<ClientUser />*/}

        <pre>{JSON.stringify(session, null, 2)}</pre>

        USER
        <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>

        <Permissions />
        <Groups />
        <Users />
    </>
  );
}
