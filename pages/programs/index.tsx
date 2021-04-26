import { QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import { fetchPosts } from "../../hooks"

export default function index() {
  return (
    <div>
      Programs
    </div>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['posts', 10], () => fetchPosts(10))
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
