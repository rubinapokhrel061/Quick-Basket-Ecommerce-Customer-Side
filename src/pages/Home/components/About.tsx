const About = () => {
  return (
    <>
      <div className="flex justify-center mx-auto py-16  sm:px-6 min-h-[100vh] lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center w-[90%] gap-8">
          <div className="mt-12 md:mt-0 transition-transform duration-500 transform hover:scale-105 ">
            <img
              src="/public/1.jpg"
              alt="About Us Image"
              className="object-cover h-full rounded-lg shadow-md "
            />
          </div>
          <div className=" transition-transform duration-500 transform ">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About Us
            </h2>
            <p className="mt-4  tracking-wide text-justify text-gray-600 text-lg">
              Welcome to Classic Watch Store, located in Kathmandu, Nepal. We
              provide a curated selection of high-quality watches from reputable
              international brands, combining timeless design with modern
              craftsmanship. Known for our commitment to integrity and customer
              satisfaction, we are your trusted source for discounted luxury
              timepieces. Explore our collection and find your
              perfect watch today.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
