import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
