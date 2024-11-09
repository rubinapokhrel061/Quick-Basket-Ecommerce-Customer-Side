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

import { io } from "socket.io-client";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import Protected from "./protected/Protected";
export const socket = io("http://localhost:8080", {
  auth: {
    token: localStorage.getItem("token"),
  },
});
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/cart"
            element={
              <Protected>
                <Cart />
              </Protected>
            }
          ></Route>
          <Route
            path="/myorder"
            element={
              <Protected>
                <MyOrder />
              </Protected>
            }
          ></Route>
          <Route
            path="/myorder/:id"
            element={
              <Protected>
                <MyOrderDetails />
              </Protected>
            }
          />
          <Route
            path="/checkout"
            element={
              <Protected>
                <Checkout />
              </Protected>
            }
          ></Route>
          <Route path="/product/:id" element={<SingleProduct />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </Provider>
  );
}

export default App;
