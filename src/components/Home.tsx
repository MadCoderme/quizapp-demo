import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./Footer";
import Hero from "./Hero";

import Navbar from "./Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
}
