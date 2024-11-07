import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-[#FFA500] py-10  flex flex-col justify-center items-center  text-white">
      <div>
        <span className="text-sm ">
          © 2024
          <span className="text-[#28A745]"> Quick Basket .</span> All Rights
          Reserved.
        </span>
      </div>
      <div>
        {" "}
        <ul className="flex flex-wrap text-blue-800  gap-3 font-semibold">
          <li>
            <Link to="#">About</Link>
          </li>
          <li>
            <Link to="#">contact</Link>
          </li>
          <li>
            <Link to="#">Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
