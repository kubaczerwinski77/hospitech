import { Navigate, Route, Routes } from "react-router-dom";
import Schedule from "./components/schedule/Schedule";
import NavigationBar from "./components/NavigationBar";
import Protocols from "./components/Protocols";
import AddWzhz from "./components/wzhz/AddWzhz";
import BrowseWzhz from "./components/wzhz/BrowseWzhz";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/protocols" element={<Protocols />} />
        <Route path="/wzhz/add" element={<AddWzhz />} />
        <Route path="/wzhz/browse" element={<BrowseWzhz />} />
        <Route path="*" element={<Navigate to="/schedule" replace />} />
      </Routes>
    </>
  );
}

export default App;
