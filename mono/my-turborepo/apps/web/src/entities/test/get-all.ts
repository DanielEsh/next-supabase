import { $api } from '@/shared/api/api'

export const getAll = async () => {
  // return await fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
  //   res.json(),
  // )
  // return await fetch('http://localhost:8000/').then(
  //   (res) => res.json() as Promise<any>,
  // )
  return $api.get('http://localhost:8000/').catch((e) => JSON.stringify(e))
}
