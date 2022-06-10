import axios from "axios";
import { useQuery } from "react-query";

export const api = axios.create({
  baseURL: 'https://services.fhir.hispuganda.org/fhir/'
  // baseURL: "http://localhost:3001/fhir/",
});

async function searchConcepts(index: string, q: string) {
  let { data } = await api.get("concepts", {
    params: { q, index },
  });
  return data;
}

async function searchConcept(index: string, id: string) {
  let { data } = await api.get(`concepts/${id}`, {
    params: { index },
  });
  return data;
}

function useSearch(index: string, q: string) {
  return useQuery<any, Error>(["search", index, q], async () => {
    return await searchConcepts(index, q);
  });
}

function useConcept(index: string, id: string) {
  return useQuery<any, Error>(["concept", index, id], async () => {
    return await searchConcept(index, id);
  });
}

async function indexConcept(concept: any) {
  const { index, ...rest } = concept;
  return await api.post("index", rest, { params: { index } });
}

export { searchConcepts, useSearch, indexConcept, searchConcept, useConcept };
