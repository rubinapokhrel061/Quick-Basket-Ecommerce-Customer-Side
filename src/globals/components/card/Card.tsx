import { Link } from "react-router-dom";
import { Product } from "../../types/productTypes";

import { useAppDispatch } from "../../../store/hooks";
import { addToCart } from "../../../store/cartSlice";
import renderStars from "../../../pages/SingleProduct/Component/renderStars ";

interface CardProps {
  data: Product;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (id: string) => {
    if (id) {
      dispatch(addToCart(id));
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg max-w-sm sm:max-w-[300px] md:max-w-sm p-4 hover:shadow-2xl mx-auto">
      <Link to={`/product/${data.id}`} className="block">
        <img
          className="rounded-t-lg w-[70vw] h-[30vh] object-contain"
          src={data?.productImageUrl}
          alt="product image"
        />
        <h2 className="capitalize text-2xl font-bold pt-2 tracking-tight text-gray-800 hover:text-blue-600 transition-colors duration-200">
          {data?.productName}
        </h2>
        <span className="text-xl text-gray-700">Rs.{data?.productPrice}</span>
      </Link>

      <div className=" pb-5">
        <div className="flex items-center justify-between mt-2.5 mb-5">
          {/* Rating Stars */}
          <div className="flex items-center mt-2.5 mb-2">
            {renderStars(data?.rating || 0)}
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
              {data?.numReviews || 0}
            </span>
          </div>
          <button
            onClick={() => handleAddToCart(data.id)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 md:px-5 md:py-2.5 text-center transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
