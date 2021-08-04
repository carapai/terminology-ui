import { Button, Input } from '@chakra-ui/react'
import { ChangeEvent, FC, useState } from 'react';
import pluralize from 'pluralize';
import { SearchResults } from './SearchResults';
import { useRouter } from 'next/router';
import { HStack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
interface TerminologyProps {
  index: string
}
const Terminologies: FC<TerminologyProps> = ({ index }) => {
  const [query, setQuery] = useState<string>('');
  const router = useRouter()
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }
  return <>
    <HStack>
      <Input placeholder={`Search ${index}`} onChange={onChange} value={query} />
      <Button onClick={() => router.push(`/${index}/form`)}>Add {pluralize.singular(index)}</Button>
    </HStack>
    {query !== "" && <SearchResults q={query} index={index} />}
  </>
}

export default Terminologies
