import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/unauthenticated");
  }

  const { data, error, status, count} = await supabase.from("test_items").select("*");

  return (
    <>
      <h1>Hello, {session.user.email}</h1>
      <div>status: {status}</div>
      <div>count: {data?.length}</div>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
