import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-[#333333] py-10  flex flex-col justify-center items-center  text-white">
      <div>
        <span className="text-sm ">
          © 2024 Classic Watch Store . All Rights Reserved.
        </span>
      </div>
      <div>
        {" "}
        <ul className="flex flex-wrap  gap-3 font-semibold">
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
