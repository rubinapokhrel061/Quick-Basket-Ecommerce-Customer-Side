import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Home from "./pages/Home/Home";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/CheckOut";
import MyOrder from "./pages/order/myorder/MyOrder";
import MyOrderDetails from "./pages/order/myorder/MyOrderDetails";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/myorder" element={<MyOrder />}></Route>
          <Route path="/myorder/:id" element={<MyOrderDetails />} />
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/product/:id" element={<SingleProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
