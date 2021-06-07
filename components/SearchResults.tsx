import {
  Box,
  Table,
  Tbody,
  Td, Th, Thead,
  Tr,
  Link
} from "@chakra-ui/react";
import pluralize from 'pluralize';
import NextLink from 'next/link'
import { FC } from 'react';
import { useSearch } from '../hooks';

interface SearchProps {
  q: string,
  index: string
}
export const SearchResults: FC<SearchProps> = ({ q, index }) => {
  const { isError, isSuccess, data, error, isLoading } = useSearch(index, q);
  return (
    <Box mt="20px">
      {isLoading && <Box>Loading</Box>}
      {isSuccess && <>
        {data.length > 0 ? <Table variant="simple">
          <Thead>
            <Tr>
              <Th>{pluralize.singular(index)}</Th>
              <Th>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((dt: any) => <Tr key={dt._id}>
              <Td>{dt._source.name}</Td>
              <Td>
                <Link href={`/${index}/${dt._id}`} as={NextLink}>
                  <a>Details</a>
                </Link>
              </Td>
            </Tr>)}
          </Tbody>
        </Table> : <Box>No Records</Box>}
      </>}
      {isError && <Box>{error.message}</Box>}
    </Box>
  )
}

