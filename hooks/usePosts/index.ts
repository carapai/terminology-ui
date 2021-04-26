import axios from 'axios'
import { useQuery } from 'react-query'

const fetchPosts = async (limit: number = 10) => {
  const parsed = await axios.get('https://jsonplaceholder.typicode.com/posts')
  const result = parsed.data.filter((x: any) => x.id <= limit)
  return result
}

const usePosts = (limit: number) => {
  return useQuery(['posts', limit], () => fetchPosts(limit))
}

export { usePosts, fetchPosts }
