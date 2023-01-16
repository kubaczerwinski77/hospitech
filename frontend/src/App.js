import { Navigate, Route, Routes } from "react-router-dom";
import Schedule from "./components/schedule/Schedule";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/schedule" element={<Schedule />} />
        <Route path="*" element={<Navigate to="/schedule" replace />} />
      </Routes>
    </>
  );
}

export default App;
