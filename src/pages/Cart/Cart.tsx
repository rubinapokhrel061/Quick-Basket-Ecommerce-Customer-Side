import { Link } from "react-router-dom";
import Navbar from "../../globals/components/navbar/Navbar";
import {
  deleteCartItem,
  fetchCartItems,
  updateCartItem,
} from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Footer from "../../globals/components/footer/Footer";
import { useEffect } from "react";

const Cart = () => {
  const { items } = useAppSelector((state) => state.carts);
  const dispatch = useAppDispatch();

  const handleDelete = (productId: string) => {
    dispatch(deleteCartItem(productId));
  };

  const handleUpdate = (productId: string, quantity: number) => {
    dispatch(updateCartItem(productId, quantity));
  };

  const totalItemInCarts = items.reduce(
    (total, item) => item?.quantity + total,
    0
  );

  const totalPriceInCarts = items.reduce(
    (total, item) => item?.Product?.productPrice * item?.quantity + total,
    0
  );

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen pb-8 pt-36 md:pt-28">
        <h1 className="text-center text-2xl font-extrabold text-[#FFA500] underline mb-8">
          Cart Items
        </h1>
        {items?.length < 1 ? (
          <div className="text-center text-lg text-red-800">
            No products added to cart...
          </div>
        ) : (
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 px-4">
            {/* Cart Items List */}
            <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg p-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item?.Product?.id}
                  className="flex flex-col lg:flex-row justify-center bg-gray-50 rounded-md shadow-sm hover:shadow-lg transition-all p-4"
                >
                  <div className="flex justify-center pr-3 items-center gap-4 md:gap-6">
                    <img
                      src={item?.Product?.productImageUrl}
                      alt={item?.Product?.productName}
                      className="w-32 h-32 object-contain rounded-md"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Product Name: {item?.Product?.productName}
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        Category: {item?.Product?.Category?.categoryName}
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        Price: Rs. {item?.Product?.productPrice}
                      </p>
                    </div>
                  </div>
                  <div className="flex   items-center justify-center  mt-4 md:mt-0">
                    <div className="flex items-center gap-2">
                      <span
                        onClick={() =>
                          handleUpdate(
                            item?.Product?.id,
                            Math.max(item?.quantity - 1, 1)
                          )
                        }
                        className="cursor-pointer rounded-l bg-gray-200 px-4 py-1 text-xl text-gray-600 hover:bg-blue-500 hover:text-white"
                      >
                        -
                      </span>
                      <input
                        className="h-8 w-16 text-center text-sm border bg-white outline-none"
                        type="number"
                        value={item?.quantity}
                        min={1}
                        readOnly
                      />
                      <span
                        onClick={() =>
                          handleUpdate(item?.Product?.id, item?.quantity + 1)
                        }
                        className="cursor-pointer rounded-r bg-gray-200 px-4 py-1 text-xl text-gray-600 hover:bg-blue-500 hover:text-white"
                      >
                        +
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(item?.Product?.id)}
                      className="ml-4   px-2 py-1 rounded-md text-slate-50 bg-red-500 hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="w-full md:w-1/3 bg-white h-[45vh] shadow-lg rounded-lg p-6 space-y-6">
              <div className="text-lg font-semibold text-gray-800">
                Cart Summary
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <p>Total Items</p>
                <p>{totalItemInCarts}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <p>Total Price</p>
                <p>Rs. {totalPriceInCarts}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <p>Total</p>
                first <p>Rs. {totalPriceInCarts}</p>
              </div>
              <div className="mt-4">
                <Link to="/checkout">
                  <button className="w-full py-2 bg-[#28A745] hover:bg-[#21903b] text-white rounded-md text-lg transition-all">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
