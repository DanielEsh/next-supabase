import { Login } from '@/app/(dashboard)/LoginBtn'

export default async function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Login />
      {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}

      <div className="mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="p-6 border border-neutral-900 rounded-md bg-neutral-900">
          <div className="p-4 bg-neutral-950 rounded-md mb-4"></div>
          New document
        </div>
        <div className="p-6 border border-neutral-900 rounded-md bg-neutral-900">
          New folder
        </div>
      </div>
    </div>
  )
}
