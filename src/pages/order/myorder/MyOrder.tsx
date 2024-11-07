import { useEffect, useState } from "react";
import Navbar from "../../../globals/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchMyOrders,
  updateOrderStatusInStore,
  updatePaymentStatusInStore,
} from "../../../store/checkoutSlice";
import { Link } from "react-router-dom";
import { OrderStatus } from "../../../globals/types/CheckoutTypes";
import { socket } from "../../../App";

const MyOrder = () => {
  const dispatch = useAppDispatch();
  const { myOrders } = useAppSelector((state) => state.orders);
  const [selectedItem, setSelectedItem] = useState<OrderStatus>(
    OrderStatus.All
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const filteredOrders = myOrders
    .filter(
      (order) =>
        selectedItem === OrderStatus.All || order.orderStatus === selectedItem
    )
    .filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm) ||
        order.Payment.paymentMethod.toLowerCase().includes(searchTerm) ||
        order.totalAmount.toString().includes(searchTerm)
    )
    .filter(
      (order) =>
        date === "" ||
        new Date(order.createdAt).toLocaleDateString() ===
          new Date(date).toLocaleDateString()
    );

  useEffect(() => {
    const handleStatusUpdated = (data: any) => {
      dispatch(updateOrderStatusInStore(data));
    };

    const handlePaymentStatusUpdated = (data: any) => {
      if (data?.orderId && data?.paymentStatus) {
        dispatch(updatePaymentStatusInStore(data));
      } else {
        console.error("Invalid data received for payment status update:", data);
      }
    };

    socket.on("statusUpdated", handleStatusUpdated);
    socket.on("paymentStatusUpdated", handlePaymentStatusUpdated);

    return () => {
      socket.off("statusUpdated", handleStatusUpdated);
      socket.off("paymentStatusUpdated", handlePaymentStatusUpdated);
    };
  }, [dispatch, socket]);

  return (
    <>
      <Navbar />
      <div className="pt-32 bg-gray-100 pb-4 min-h-screen">
        <div className="container mx-auto px-4 sm:px-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            My Orders
          </h2>
          <div className="my-4 flex flex-col sm:flex sm:flex-row flex-wrap gap-4">
            {/* Order Status Filter */}
            <div className="flex-1">
              <select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value as OrderStatus)}
                className="w-full bg-white border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={OrderStatus.All}>All Orders</option>
                <option value={OrderStatus.Pending}>Pending</option>
                <option value={OrderStatus.Delivered}>Delivered</option>
                <option value={OrderStatus.Ontheway}>On the Way</option>
                <option value={OrderStatus.Cancel}>Cancelled</option>
                <option value={OrderStatus.Preparation}>In Preparation</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Orders"
                className="w-full bg-white border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date Filter */}
            <div className="flex-1">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-y-auto">
            <table className="min-w-full   bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-5 py-3 text-left text-sm font-medium">
                    Order ID
                  </th>
                  <th className="px-5 py-3 text-left text-sm font-medium">
                    Total Amt
                  </th>
                  <th className="px-5 py-3 text-left text-sm font-medium">
                    Payment Status
                  </th>
                  <th className="px-5 py-3 text-left text-sm font-medium">
                    Order Status
                  </th>
                  <th className="px-5 py-3 text-left text-sm font-medium">
                    Ordered At
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-5 py-3 text-sm text-blue-600">
                        <Link to={`/myorder/${order.id}`} className="underline">
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-sm">{order.totalAmount}</td>
                      <td className="px-5 py-3 text-sm">
                        {order.Payment.paymentStatus}
                      </td>
                      <td className="px-5 py-3 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.orderStatus === OrderStatus.Delivered
                              ? "bg-green-200 text-green-700"
                              : "bg-yellow-200 text-yellow-700"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-3 text-center text-sm text-gray-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrder;
