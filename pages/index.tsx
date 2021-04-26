import type { KeycloakTokenParsed } from 'keycloak-js';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { PostList } from '../components';
import { fetchPosts } from '../hooks';

type ParsedToken = KeycloakTokenParsed & {
  email?: string
  preferred_username?: string
  given_name?: string
  family_name?: string
}


export default function Home() {
  return (
    <PostList />
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
