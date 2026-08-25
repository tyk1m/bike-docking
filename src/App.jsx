import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homePage";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import Stations from "./pages/stations";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup/*" element={<SignUp />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/stations" element={<Stations />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
