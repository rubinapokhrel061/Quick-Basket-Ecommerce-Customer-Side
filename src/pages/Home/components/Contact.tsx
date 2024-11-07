const Contact = () => {
  return (
    <div className="flex flex-col pt-28  md:flex md:flex-row md:justify-between   sm:px-6 min-h-[60vh] lg:px-8 pb-4  w-[90%] mx-auto">
      <div className="w-full md:max-w-[50%]">
        <h2 className="text-3xl text-center font-extrabold underline text-[#FFA500]">
          Contact Us
        </h2>
        <p className="mt-4 text-gray-700 text-lg">GET IN TOUCH WITH US</p>
        <p className="mt-2 text-gray-600  tracking-wide text-justify">
          At QuickBasket, we're committed to delivering a seamless shopping
          experience for all our customers. Whether you need assistance with
          your order, have a question about a product, or want to share
          feedback, our customer support team is always here to help.
        </p>
      </div>
      <div className="flex flex-start flex-col pb-8">
        <div className="mt-8  ">
          <h3 className="text-xl font-bold text-gray-800">Our Location</h3>
          <p className="text-gray-600"> Kathmandu, Nepal</p>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-800">Phone Number</h3>
          <p className="text-gray-600">(+977) 9763457887</p>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-800">Email Address</h3>
          <p className="text-gray-600">support@quickbasket.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
