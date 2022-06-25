import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index";
import Fonts from "./theme/globals/fonts";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Auth from "./components/Auth";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import { toast, ToastContainer } from "react-toastify";

import { initializeApp } from "@firebase/app";
import Navbar from "./components/Navbar";

const firebaseConfig = {
  //config data
};

const app = initializeApp(firebaseConfig);

export const App = () => (
  <ChakraProvider theme={theme}>
    <Fonts />
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth appConfig={app} />} />
        <Route path="/signup" element={<Signup appConfig={app} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz appConfig={app} />} />
        <Route path="/results" element={<Results appConfig={app} />} />
      </Routes>
    </Router>
  </ChakraProvider>
);
