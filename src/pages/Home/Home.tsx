import { useEffect } from "react";
import Card from "../../globals/components/card/Card";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Hero from "./components/Hero";
import { fetchProducts } from "../../store/productSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { status, product } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  console.log(product);
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900 dark:text-gray-100">
      <Hero />
      <div className="flex flex-col items-center">
        <h1>Top products</h1>
        <div className="flex flex-wrap gap-4">
          {product.length > 0 &&
            product.map((pd) => {
              return <Card key={pd.id} data={pd} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
