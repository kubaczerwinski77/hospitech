import { Navigate, Route, Routes } from "react-router-dom";
import Schedule from "./components/schedule/Schedule";
import NavigationBar from "./components/NavigationBar";
import AddWzhz from "./components/wzhz/AddWzhz";
import BrowseWzhz from "./components/wzhz/BrowseWzhz";
import LecturersList from "./components/lecturer/LecturersList";
import LecturersPlan from "./components/lecturer/LecturersPlan";
import { ChakraProvider } from "@chakra-ui/react";
import AddProtocol from "./components/protocol/AddProtocol";
import BrowseProtocols from "./components/protocol/BrowseProtocols";

function App() {
  return (
    <>
      <ChakraProvider>
        <NavigationBar />
      </ChakraProvider>

      <Routes>
        <Route
          path="/schedule"
          element={
            <ChakraProvider>
              <Schedule />
            </ChakraProvider>
          }
        />
        <Route
          path="/wzhz/add"
          element={
            <ChakraProvider>
              <AddWzhz />
            </ChakraProvider>
          }
        />
        <Route
          path="/wzhz/browse"
          element={
            <ChakraProvider>
              <BrowseWzhz />
            </ChakraProvider>
          }
        />
        <Route
          path="/protocols/add"
          element={
            <ChakraProvider>
              <AddProtocol />
            </ChakraProvider>
          }
        />
        <Route
          path="/protocols/browse"
          element={
            <ChakraProvider>
              <BrowseProtocols />
            </ChakraProvider>
          }
        />
        <Route
          path="/lecturers"
          element={
            <ChakraProvider>
              <LecturersList />
            </ChakraProvider>
          }
        />
        <Route path="/lecturers/:id" element={<LecturersPlan />} />
        <Route path="*" element={<Navigate to="/wzhz/browse" replace />} />
      </Routes>
    </>
  );
}

export default App;
