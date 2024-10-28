const Contact = () => {
  return (
    <div className="flex flex-col  md:flex md:flex-row md:justify-between  sm:px-6 min-h-[60vh] lg:px-8  w-[90%] mx-auto">
      <div className="w-full md:max-w-[50%]">
        <h2 className="text-3xl font-extrabold text-gray-900">Contact Us</h2>
        <p className="mt-4 text-gray-700 text-lg">GET IN TOUCH WITH US</p>
        <p className="mt-2 text-gray-600  tracking-wide text-justify">
          At Classic Watch Store, we are dedicated to providing our customers
          with a unique shopping experience. We offer a curated selection of
          luxury watches from renowned international brands, ensuring that each
          piece reflects quality and craftsmanship. Our knowledgeable team is
          here to assist you in finding the perfect timepiece that suits your
          style and needs.
        </p>
      </div>
      <div className="flex flex-start flex-col pb-8">
        <div className="mt-8  ">
          <h3 className="text-xl font-bold text-gray-800">Our Location</h3>
          <p className="text-gray-600">Thamel, Kathmandu, Nepal</p>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-800">Phone Number</h3>
          <p className="text-gray-600">(+977) 9763457887</p>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-800">Email Address</h3>
          <p className="text-gray-600">info@classicwatchstore.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
