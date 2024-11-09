import { useEffect } from "react";
import Navbar from "../../../globals/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  cancelMyOrder,
  fetchMyOrderDetails,
} from "../../../store/checkoutSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  OrderStatus,
  PaymentMethod,
} from "../../../globals/types/CheckoutTypes";
import Footer from "../../../globals/components/footer/Footer";

const MyOrderDetails = () => {
  const { id } = useParams();
  const { orderDetails } = useAppSelector((state) => state.orders);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchMyOrderDetails(id));
    }
  }, [id, dispatch]);

  const handleCancelOrder = async () => {
    if (id) {
      await dispatch(cancelMyOrder(id));
      await dispatch(fetchMyOrderDetails(id));
      navigate("/myorder");
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-28 pb-8  px-6 md:px-10 2xl:px-20 2xl:container mx-auto">
        {/* Order Info */}
        <div className="text-center space-y-4">
          <h1 className="mb-6 mt-8 text-2xl underline font-extrabold text-[#FFA500]">
            Order Details
          </h1>
          <p className="text-sm text-gray-500">
            {new Date(orderDetails[0]?.Order?.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              My Order
            </h3>

            {orderDetails.length > 0 &&
              orderDetails?.map((order) => (
                <div
                  className="flex flex-col lg:flex-row items-start space-y-4 lg:space-x-6 lg:space-y-0"
                  key={order?.Order?.id}
                >
                  <div className="w-full md:w-40">
                    <img
                      className="w-full h-40 object-cover rounded-lg"
                      src={order?.Product?.productImageUrl}
                      alt={order?.Product?.productName}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                      Product Name : {order?.Product?.productName}
                    </p>
                    <p className="text-base text-gray-800">
                      Quantity: {order?.quantity}
                    </p>
                    <p className="text-base text-gray-800">
                      Price: Rs. {order?.Product?.productPrice}
                    </p>
                    <p className="text-base  text-gray-800">
                      Total: Rs. {order?.Product?.productPrice * order.quantity}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Order Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-base text-gray-600">Payment Method:</p>
                <p className="text-base text-gray-800">
                  {orderDetails[0]?.Order?.Payment?.paymentMethod}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-base text-gray-600">Payment Status:</p>
                <p className="text-base text-gray-800">
                  {orderDetails[0]?.Order?.Payment?.paymentStatus}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-base text-gray-600">Order Status:</p>
                <p className="text-base text-gray-800">
                  {orderDetails[0]?.Order?.orderStatus}
                </p>
              </div>
              {orderDetails[0]?.Order?.Payment?.paymentMethod ===
              PaymentMethod.COD ? (
                <>
                  {" "}
                  <div className="flex justify-between">
                    <p className="text-base text-gray-600">Shpping Charge:</p>
                    <p className="text-base text-gray-800">Rs.100</p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="border-t pt-4 flex justify-between">
              <p className="text-lg font-semibold text-gray-800">
                Total Amount
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Rs. {orderDetails[0]?.Order?.totalAmount}
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="mt-10 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Shipping Details
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-base text-gray-600">Address:</p>
              <p className="text-base text-gray-800">
                {orderDetails[0]?.Order?.shippingAddress}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-base text-gray-600">Phone:</p>
              <p className="text-base text-gray-800">
                {orderDetails[0]?.Order?.phoneNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Cancel Order Button */}
        {orderDetails[0]?.Order?.orderStatus !== OrderStatus.Cancel && (
          <div className="mt-8 text-center">
            <button
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
              onClick={handleCancelOrder}
            >
              Cancel Order
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrderDetails;
