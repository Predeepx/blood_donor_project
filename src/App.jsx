import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Donor from "./pages/Donor";
import FindBlood from "./pages/FindBlood";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/donor" element={<Donor />} />
        <Route path="/find-blood" element={<FindBlood />} />
      </Routes>
    </BrowserRouter>
  );
}
