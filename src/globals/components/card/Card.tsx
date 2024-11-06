import { Link } from "react-router-dom";
import { Product } from "../../types/productTypes";
import { FaStar } from "react-icons/fa"; // Import the star icon from react-icons
import { useAppDispatch } from "../../../store/hooks";
import { addToCart } from "../../../store/cartSlice";

interface CardProps {
  data: Product;
}

const Card: React.FC<CardProps> = ({ data }) => {
  console.log(data);
  const dispatch = useAppDispatch();
  const handleAddToCart = (id: string) => {
    if (id) {
      dispatch(addToCart(id));
    }
  };
  return (
    <div className="bg-white shadow-md rounded-lg max-w-sm sm:max-w-[300px] md:max-w-sm p-2 ">
      <Link to={`/product/${data.id}`}>
        {" "}
        <img
          className="rounded-t-lg w-full h-[30vh]  rounded-lg"
          src={data?.productImageUrl}
          alt="product image"
        />
        <h2 className="capitalize  text-2xl  font-bold pt-2 tracking-tight">
          {data?.productName}
        </h2>
        <span className="text-xl ">Rs.{data?.productPrice}</span>
      </Link>
      <div className="px-5 pb-5">
        <div className="flex  items-center justify-between  mt-2.5 mb-5">
          <div className="flex items-center justify-between ">
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar key={index} className="w-5 h-5 text-yellow-300" />
            ))}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
              5.0
            </span>
          </div>

          <button
            onClick={() => handleAddToCart(data.id)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
