import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { Body } from '@/app/(dashboard)/server/Body'
import { getUsers } from '@/entities/test/repository/requests'
import { getUsersKey } from '@/entities/test/use-users'
import { getQueryClient } from '@/shared/libs/query/query-client'

const HomePage = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: getUsersKey(),
    queryFn: getUsers,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Body />
    </HydrationBoundary>
  )
}

export default HomePage
