import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBarComponent from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartProvider from "./CartContext";
import Store from "./pages/Store";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {
  return (
    <CartProvider>
      <Container>
        <NavBarComponent />
        <BrowserRouter>
          <Routes>
            <Route index element={<Store />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </CartProvider>
  );
}

export default App;
