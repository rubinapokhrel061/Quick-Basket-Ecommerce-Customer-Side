import { useEffect } from "react";
import Card from "../../globals/components/card/Card";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Hero from "./components/Hero";
import { fetchProducts } from "../../store/productSlice";
import About from "./components/About";
import Footer from "../../globals/components/footer/Footer";
import Contact from "./components/Contact";

const Home = () => {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  console.log(product);
  return (
    <div className="">
      <Hero />
      <div className="flex flex-col pt-10 min-h-[100vh]  items-center">
        <h1 className="text-green-700  underline pt-6 md:pt-10 text-2xl font-bold ">
          Best Watches
        </h1>
        <div className="flex flex-wrap items-center justify-center mx-auto gap-4 md:gap-6 mt-6">
          {product.length > 0 &&
            product.map((pd) => {
              return <Card key={pd.id} data={pd} />;
            })}
        </div>
        <div>
          <About />
        </div>
        <div>
          <Contact />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
