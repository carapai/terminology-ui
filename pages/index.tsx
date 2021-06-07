import { Box } from '@chakra-ui/react';
import type { KeycloakTokenParsed } from 'keycloak-js';

type ParsedToken = KeycloakTokenParsed & {
  email?: string
  preferred_username?: string
  given_name?: string
  family_name?: string
}


export default function Home() {
  return (
    <Box>Home</Box>
  )
}

// export async function getStaticProps() {
//   const queryClient = new QueryClient()
//   await queryClient.prefetchQuery(['posts', 10], () => fetchPosts(10))
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }
