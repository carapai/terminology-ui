import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import { usePosts } from '../../hooks/usePosts'

export const PostList = () => {
  const [postCount, setPostCount] = useState(10)
  const { data, isLoading, isFetching } = usePosts(postCount)
  if (isLoading) return <div>Loading</div>
  return (
    <Box>
      <ul>
        {data?.map((post: any, index: number) => (
          <li key={post.id}>
            <div>
              <span>{index + 1}. </span>
              <a href="#">{post.title}</a>
            </div>
          </li>
        ))}
      </ul>
      {postCount <= 90 && (
        <button
          onClick={() => setPostCount(postCount + 10)}
          disabled={isFetching}
        >
          {isFetching ? 'Loading...' : 'Show More'}
        </button>
      )}
    </Box>
  )
}
