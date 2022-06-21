import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Container
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "@firebase/auth";
import { toast } from "react-toastify";
//import { Logo } from "./logo/Logo";

const Links = ["Home", "Dashboard", "Results", "Play"];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const auth = getAuth();

  const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700")
      }}
      onClick={() =>
        navigate(
          children === "Home"
            ? "/"
            : children == "Play"
            ? "/dashboard?startPlaying=true"
            : "/" + children.toLowerCase()
        )
      }
    >
      {children}
    </Link>
  );

  function signout() {
    signOut(auth)
      .then(() => {
        toast.success("Successfully signed out!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Container maxWidth="container.xl">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: !isOpen ? "none" : "inherit" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            {
              //<Logo w="10" />
            }
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                {auth.currentUser ? (
                  <MenuItem
                    onClick={() => {
                      signout();
                    }}
                  >
                    Log out
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => {
                      navigate("login");
                    }}
                  >
                    Login to Account
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
            <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}
