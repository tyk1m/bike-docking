import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homePage";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import Stations from "./pages/stations";
import Bikes from "./pages/bikes";
import MyRentals from "./pages/myRentals";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup/*" element={<SignUp />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/my-rentals" element={<MyRentals />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
