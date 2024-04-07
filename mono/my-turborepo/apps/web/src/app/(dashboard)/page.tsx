import { Login } from '@/app/(dashboard)/LoginBtn'
import { getAll } from '@/entities/test/get-all'

export default async function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Login />
      {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
    </div>
  )
}
