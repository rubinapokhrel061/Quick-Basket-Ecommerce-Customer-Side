// src/pages/SingleProduct.tsx

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../globals/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addReview, fetchByProductId } from "../../store/productSlice";

import { addToCart } from "../../store/cartSlice";
import { Review } from "../../globals/types/productTypes";
import { FaUserCircle } from "react-icons/fa";
import { Status } from "../../globals/types/types";
import Footer from "../../globals/components/footer/Footer";

const SingleProduct = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { status, singleProduct } = useAppSelector((state) => state.products);
  console.log(singleProduct?.Reviews);
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  console.log(userId, username);
  const [formData, setFormData] = useState({
    rating: 0,
    reviewContent: "",
    userId: userId,
    reviewerName: username,
  });

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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const productId = id;
    dispatch(addReview(productId as string, formData as Review));

    // Reset formData after submission
    setFormData({
      rating: 0,
      reviewContent: "",
      userId: userId,
      reviewerName: username,
    });
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className={`w-6 h-6 cursor-pointer ${
            rating >= index + 1 ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ));
  };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const [, setRandomColor] = useState(getRandomColor());

  useEffect(() => {
    setRandomColor(getRandomColor());
  }, [dispatch]);

  if (status === Status.LOADING) {
    console.log("loading");
  } else if (status === Status.SUCCESS) {
    console.log("sucess");
  } else {
    console.log("error");
  }
  return (
    <>
      <Navbar />

      <div className="max-w-6xl pt-32 lg:pt-36 mx-auto px-4 sm:px-6 lg:px-8 rounded-md">
        <div className="flex flex-col lg:flex-row -mx-4 lg:p-14 rounded-md bg-green-50">
          {/* Product Image and Cart Buttons */}
          <div className="md:flex-1 px-4 mt-4  border-2 rounded-xl mx-4 lg:border-green-500 lg:mt-0">
            <div className="rounded-lg mb-4 shadow-lg hover:scale-105 transition-transform duration-300 m-6">
              <img
                className="w-full h-full object-contain rounded-lg"
                src={singleProduct?.productImageUrl}
                alt={singleProduct?.productName}
              />
            </div>
            <div className="flex -mx-2 mt-8 mb-4">
              <div className="w-1/2 px-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full text-[8px] sm:text-sm md:text-base bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <Link to="/cart">
                  <button
                    className="w-full
                  text-[8px] sm:text-sm md:text-base  bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-500 transition-all duration-300"
                  >
                    View My Cart
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:flex-1 pl-10 px-4 p-4">
            <h1 className="underline pt-4 text-xl text-[#FFA500] font-extrabold pb-2">
              Product Details
            </h1>
            <h2 className="text-lg font-semibold">
              Name:{" "}
              <small className="text-base capitalize text-blue-900">
                {" "}
                {singleProduct?.productName}
              </small>
            </h2>
            <h2 className="text-lg font-semibold">
              Price:{" "}
              <small className="text-base text-blue-900">
                {" "}
                {singleProduct?.productPrice}
              </small>
            </h2>
            <h2 className="text-lg font-semibold">
              Availability:{" "}
              <small className="text-base text-blue-900">
                {singleProduct?.productTotalStockQty}
              </small>
            </h2>
            <h2 className="text-lg font-semibold">
              Description:{" "}
              <small className="text-base capitalize text-blue-900">
                {" "}
                {singleProduct?.productDescription}
              </small>
            </h2>

            {/* Rating Stars */}
            <div className="flex items-center mt-2.5 mb-2">
              {renderStars(singleProduct?.rating || 0)}
              <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
                {singleProduct?.numReviews || 0}
              </span>
            </div>
          </div>
        </div>
        {/* Reviews Section */}
        <div className="mt-8 p-6">
          <h3 className="text-lg pb-3 font-semibold">Reviews</h3>
          <div className="space-y-4">
            {singleProduct?.Reviews && singleProduct?.Reviews?.length > 0 ? (
              singleProduct?.Reviews?.map((review) => {
                const randomColor = getRandomColor();
                return (
                  <div key={review?.id} className="border-b pb-4">
                    <div className="flex  items-center space-x-2">
                      <div>
                        <FaUserCircle
                          style={{ color: randomColor }}
                          className="text-xl"
                        />
                      </div>
                      <span className="text-lg capitalize font-semibold text-blue-900">
                        {review?.reviewerName}
                      </span>

                      <div className="flex">{renderStars(review?.rating)}</div>

                      <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
                        {review?.rating || 0}
                      </span>
                    </div>

                    <p className="mt-1 text-gray-700">
                      {review?.reviewContent}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">
                No reviews yet. Be the first to write a review!
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 mb-10 bg-green-50 p-6 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold">Add a Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() =>
                    setFormData((prevData) => ({ ...prevData, rating: star }))
                  }
                  className={`w-8 h-8 cursor-pointer ${
                    formData.rating >= star
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>

            {/* Comment Section */}
            <textarea
              className="w-full outline-none  bg-green-50 p-2 border-2 border-green-100 focus:border-green-200 rounded-lg"
              placeholder="Write your review here..."
              value={formData.reviewContent}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  reviewContent: e.target.value,
                }))
              }
              rows={4}
            ></textarea>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2  bg-[#28A745] hover:bg-[#21903b] text-white rounded-md"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
