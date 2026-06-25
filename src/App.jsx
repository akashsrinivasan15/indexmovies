import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./contexts/MovieContext";
// import Footer from "./components/Footer";

function App() {
  return (
    <MovieProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </MovieProvider>
  );
}

export default App;
