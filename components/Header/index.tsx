import { Button, Flex, HStack, Link, Spacer } from '@chakra-ui/react';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';
import { useRouter } from 'next/router';

export const Header = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const { pathname, query } = useRouter();
  const { index } = query;
  return (
    <Flex bg="#2b6cb0" p="2" h="4rem" color="white">
      <HStack textTransform="uppercase" spacing="24px" fontSize="16px">
        <Link href="/" borderBottom={pathname === '/' ? '1px white solid' : 'none'}>
          Home
        </Link>
        <Link borderBottom={index === 'concepts' ? '1px white solid' : 'none'} href="/concepts">
          Concepts
        </Link>
        <Link borderBottom={index === 'attributes' ? '1px white solid' : 'none'} href="/attributes">
          Attributes
        </Link>
        <Link borderBottom={index === 'programs' ? '1px white solid' : 'none'} href="/programs">
          Programs
        </Link>
        <Link borderBottom={index === 'entities' ? '1px white solid' : 'none'} href="/entities">
          Entities
        </Link>
        <Link borderBottom={index === 'stages' ? '1px white solid' : 'none'} href="/stages">
          Stages
        </Link>
        <Link borderBottom={index === 'organisations' ? '1px white solid' : 'none'} href="/organisations">
          Organisations
        </Link>
      </HStack>
      <Spacer />

      {keycloak?.authenticated ? (
        <HStack>
          <Button
            colorScheme="blue"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createAccountUrl()
              }
            }}
          >
            My Account
          </Button>

          <Button
            colorScheme="blue"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createLogoutUrl()
              }
            }}
          >
            Logout
          </Button>
        </HStack>
      ) : (
        <HStack>
          <Button
            colorScheme="blue"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createRegisterUrl()
              }
            }}
          >
            Signup
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createLoginUrl()
              }
            }}
          >
            Login
          </Button>
        </HStack>
      )}
    </Flex>
  )
}
