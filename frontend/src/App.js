import { Navigate, Route, Routes } from "react-router-dom";
import Schedule from "./components/schedule/Schedule";
import NavigationBar from "./components/NavigationBar";
import Protocols from "./components/Protocols";
import AddWzhz from "./components/wzhz/AddWzhz";
import BrowseWzhz from "./components/wzhz/BrowseWzhz";
import LecturersList from "./components/lecturer/LecturersList";
import LecturersPlan from "./components/lecturer/LecturersPlan";
import { ChakraProvider } from "@chakra-ui/react";

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
          path="/protocols"
          element={
            <ChakraProvider>
              <Protocols />
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
