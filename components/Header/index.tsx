import { useRouter } from 'next/router';
import type { KeycloakInstance } from 'keycloak-js';
import { useKeycloak } from '@react-keycloak/ssr'
import NextLink from 'next/link'
import { Button, Flex, HStack, Link, Spacer } from '@chakra-ui/react';

export const Header = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const { pathname } = useRouter();
  return (
    <Flex bg="#2b6cb0" p="2" h="4rem" color="white">
      <HStack>
        <Link href="/" as={NextLink}>
          <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
        </Link>
        <Link href="/client-only" as={NextLink}>
          <a className={pathname === '/client-only' ? 'is-active' : ''}>
            Client-Only
        </a>
        </Link>
      </HStack>
      <Spacer />

      {keycloak?.authenticated ? (
        <HStack>
          <Button
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createAccountUrl()
              }
            }}
          >
            My Account
          </Button>

          <button
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createLogoutUrl()
              }
            }}
          >
            Logout
          </button>
        </HStack>
      ) : (
        <HStack>
          <Button
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createRegisterUrl()
              }
            }}
          >
            Signup
          </Button>
          <Button
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
