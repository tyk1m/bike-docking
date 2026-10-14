import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homePage";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import Stations from "./pages/stations";
import Bikes from "./pages/bikes";
import MyRentals from "./pages/myRentals";
import RentBike from "./pages/rentBike";

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-purple-50 px-6 text-center">
      <h1 className="text-4xl font-bold text-purple-900">Page not found</h1>
      <p className="mt-3 text-gray-600">That CycleEazy page does not exist.</p>
      <a href="/" className="mt-6 rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white hover:bg-purple-800">Go home</a>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup/*" element={<SignUp />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/rent-bike" element={<RentBike />} />
        <Route path="/my-rentals" element={<MyRentals />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
