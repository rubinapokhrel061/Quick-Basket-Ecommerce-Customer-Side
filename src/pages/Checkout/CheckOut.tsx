import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Navbar from "../../globals/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  ItemDetails,
  OrderData,
  PaymentMethod,
} from "../../globals/types/CheckoutTypes";
import { orderItem, resetStatus } from "../../store/checkoutSlice";
import { Status } from "../../globals/types/types";
import { useNavigate } from "react-router-dom";
import Footer from "../../globals/components/footer/Footer";

const Checkout = () => {
  const { items } = useAppSelector((state) => state.carts);
  const { khaltiUrl, status } = useAppSelector((state) => state.orders);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.COD
  );
  const [data, setData] = useState<OrderData>({
    phoneNumber: "",
    shippingAddress: "",
    totalAmount: 0,
    paymentDetails: { paymentMethod: PaymentMethod.COD },
    items: [],
  });

  const handlePaymentMethod = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value as PaymentMethod);
    setData({
      ...data,
      paymentDetails: { paymentMethod: e.target.value as PaymentMethod },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  let subtotal = items.reduce(
    (total, item) => item.Product.productPrice * item.quantity + total,
    0
  );
  if (paymentMethod === PaymentMethod.COD) {
    subtotal += 100;
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const itemDetails: ItemDetails[] = items.map((item) => ({
      productId: item.Product.id,
      quantity: item.quantity,
    }));

    const orderData = { ...data, items: itemDetails, totalAmount: subtotal };
    await dispatch(orderItem(orderData));
  };

  useEffect(() => {
    if (subtotal < 1000 && khaltiUrl) {
      window.location.href = khaltiUrl;
      return;
    } else if (subtotal >= 1000) {
      // alert("You can only pay up to Rs 1000 using Khalti.");
    }

    if (status === Status.SUCCESS) {
      dispatch(resetStatus());
      navigate("/myorder");
    }
  }, [status, khaltiUrl, subtotal, dispatch, navigate]);

  return (
    <>
      <Navbar />
      <div className="bg-white pb-12 pt-36 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl underline  mt-4 font-extrabold text-[#FFA500] text-center mb-6">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Order Summary
              </h2>
              <div className="bg-white shadow-md rounded-lg p-4">
                {items.length > 0 ? (
                  items.map((item) => (
                    <div
                      key={item.Product.id}
                      className="flex items-center space-x-4 py-4 border-b"
                    >
                      <img
                        src={item.Product.productImageUrl}
                        alt={item.Product.productName}
                        className="w-32 h-32 object-contain rounded-md"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          Product Name : {item?.Product?.productName}
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          Category : {item?.Product?.Category?.categoryName}
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          Product Price : Rs. {item?.Product?.productPrice}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No items in the cart.</p>
                )}
              </div>

              {/* Payment Methods */}
              <h2 className="text-xl font-semibold text-gray-900 mt-8">
                Payment Methods
              </h2>
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={PaymentMethod.COD}
                    checked={paymentMethod === PaymentMethod.COD}
                    onChange={handlePaymentMethod}
                    className="hidden"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                    {paymentMethod === PaymentMethod.COD && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium text-gray-800">
                    COD (Cash On Delivery)
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={PaymentMethod.Khalti}
                    checked={paymentMethod === PaymentMethod.Khalti}
                    onChange={handlePaymentMethod}
                    className="hidden"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                    {paymentMethod === PaymentMethod.Khalti && (
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium text-gray-800">
                    Online (Khalti)
                  </span>
                </label>
              </div>
            </div>

            {/* Shipping & Payment Details */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Shipping & Payment Details
              </h2>
              <div className="bg-white shadow-sm rounded-lg p-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-800"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Your phone number"
                />

                <label
                  htmlFor="shippingAddress"
                  className="block text-sm font-medium text-gray-800 mt-4"
                >
                  Shipping Address
                </label>
                <input
                  type="text"
                  id="shippingAddress"
                  name="shippingAddress"
                  value={data.shippingAddress}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Street address"
                />
              </div>

              {/* Order Summary */}
              {paymentMethod === PaymentMethod.Khalti ? (
                <>
                  <div className="bg-white shadow-sm rounded-lg p-4">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-800">Total Amount</p>
                      <p className="font-semibold text-gray-800">
                        Rs {subtotal}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white shadow-sm rounded-lg p-4">
                    <div className="flex justify-between">
                      <p className="font-medium text-gray-800">Subtotal</p>
                      <p className="font-semibold text-gray-800">
                        Rs {subtotal - 100}
                      </p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="font-medium text-gray-800">Shipping</p>
                      <p className="font-semibold text-gray-800">Rs 100</p>
                    </div>
                    <div className="border-t mt-4 pt-4 flex justify-between">
                      <p className="font-medium text-gray-800">Total Amount</p>
                      <p className="font-semibold text-gray-800">
                        Rs {subtotal}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Payment Button */}
              <div className="mt-6">
                {paymentMethod === PaymentMethod.Khalti ? (
                  <a href={khaltiUrl || "#"}>
                    <button className="w-full py-3 px-6 bg-purple-600 text-white rounded-md text-center">
                      {" "}
                      Pay with Khalti
                    </button>
                  </a>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-3 px-6  bg-[#28A745] hover:bg-[#21903b] text-white rounded-md"
                  >
                    Place Order
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
