import axios from 'axios'
import { useQuery } from 'react-query';

export const api = axios.create({
  baseURL: 'http://localhost:8081/',
  timeout: 10000
});

const fetchPosts = async (limit: number = 10) => {
  const parsed = await axios.get('https://jsonplaceholder.typicode.com/posts')
  const result = parsed.data.filter((x: any) => x.id <= limit)
  return result
}

async function searchConcepts(index: string, q: string) {
  let { data } = await api.get('concepts', {
    params: { q, index }
  });
  return data;
}

async function searchConcept(index: string, id: string) {
  let { data } = await api.get(`concepts/${id}`, {
    params: { index }
  });
  return data;
}

function useSearch(index: string, q: string) {
  return useQuery<any, Error>(['concepts', index, q], async () => {
    return await searchConcepts(index, q)
  })
}

function useConcept(index: string, id: string) {
  return useQuery<any, Error>(['concept', index, id], async () => {
    return await searchConcept(index, id)
  })
}


async function indexConcept(concept: any) {
  const { index, ...rest } = concept
  return await api.post('index', rest, { params: { index } });
}

const usePosts = (limit: number) => {
  return useQuery(['posts', limit], () => fetchPosts(limit))
}


export { usePosts, fetchPosts, searchConcepts, useSearch, indexConcept, searchConcept, useConcept }
