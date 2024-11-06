import { Link, useParams } from "react-router-dom";
import Navbar from "../../globals/components/navbar/Navbar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchByProductId } from "../../store/productSlice";
import { addToCart } from "../../store/cartSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { singleProduct } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchByProductId(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (id && singleProduct) {
      dispatch(addToCart(id));
    }
  };

  return (
    <>
      <Navbar />

      <div className=" max-w-6xl md:mt-10 lg:mt-20 mx-auto px-4 sm:px-6 lg:px-8 rounded-md ">
        <div className="flex flex-col lg:flex-row -mx-4  lg:p-14 rounded-md lg:bg-gray-200 ">
          <div className="md:flex-1 px-4 mt-4 md:mt-0 border-2 rounded-xl mx-4 lg:border-red-500  lg:mt-0">
            <div className=" rounded-lg mb-4  shadow-lg hover:scale-105 transition-transform duration-300 m-6">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={singleProduct?.productImageUrl}
                alt="Product Image"
              />
            </div>
            <div className="flex -mx-2 mt-8 mb-4">
              <div className="w-1/2 px-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <Link to="/cart">
                  <button className="w-full bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-500 transition-all duration-300">
                    View My Cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:flex-1 pl-10  px-4 p-4   ">
            <h1 className="underline pt-4 text-2xl text-green-600 font-semibold pb-2">
              Product Details
            </h1>
            <h2 className="text-xl font-semibold">
              Product Name :{" "}
              <small className="text-lg capitalize text-blue-900">
                {" "}
                {singleProduct?.productName}
              </small>
            </h2>

            <h2 className="text-xl font-semibold">
              Product Price :{" "}
              <small className="text-lg text-blue-900">
                {" "}
                {singleProduct?.productPrice}
              </small>
            </h2>
            <h2 className="text-xl font-semibold">
              Product Availability :{" "}
              <small className="text-lg text-blue-900">
                {" "}
                {singleProduct?.productTotalStockQty}
              </small>
            </h2>
            <h2 className="text-xl font-semibold">
              Product Description :{" "}
              <small className="text-lg capitalize text-blue-900">
                {" "}
                {singleProduct?.productDescription}
              </small>
            </h2>
            <div className="flex items-center mt-2.5 mb-2">
              {/* Star Rating */}
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg
                    key={index}
                    className="w-6 h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
                5.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
