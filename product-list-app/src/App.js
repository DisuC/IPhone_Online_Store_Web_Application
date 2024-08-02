import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from "./pages/ProductList";
import './App.css';
import ProductInfo from "./pages/ProductInfo";

function App() {
    return (
       <Router>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductInfo />} />
            </Routes>
        </Router>
    );
}

export default App;
