<!-- Dynamic Navbars and more -->

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";
import { fetchCartItems } from "../../../store/cartSlice";

const Navbar = () => {
<!-- add -->
const dispatch = useAppDispatch();
const { user } = useAppSelector((state) => state.auth);
const { items } = useAppSelector((state) => state.carts);
const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
useEffect(() => {
const token = localStorage.getItem("token");
dispatch(fetchCartItems());
setIsLoggedIn(!!token || !!user.token);
}, [user.token]);

useEffect(() => {
const token = localStorage.getItem("token"); // "ey24234"
setIsLoggedIn(!!token || !!user.token);
dispatch(fetchCartItems());
}, [user.token]);

const handleLogout = () => {
localStorage.removeItem("token");
setIsLoggedIn(false);
};

return (
<>
<header
        id="page-header"
        className="relative flex flex-none items-center py-8 bg-green-400"
      >
<div className="container mx-auto flex flex-col gap-4 px-4 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-0 lg:px-8 xl:max-w-7xl">
<div>
<Link
              to="/"
              className="group inline-flex items-center  text-lg font-bold tracking-wide text-gray-800 hover:text-gray-950 dark:text-gray-100 dark:hover:text-gray-300"
            >
<span>E</span>
<span className="text-pink-600 hover:text-pink-700">
-Commerce
</span>
</Link>
</div>
<nav className="space-x-3 md:space-x-6">
<!-- add  -->
{!isLoggedIn ? (
<>
<Link
                  to="register"
                  className="text-sm font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                >
<span>Register</span>
</Link>
<Link
                  to="/login"
                  className="text-sm font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                >
<span>Login</span>
</Link>
</>
) : (
<>
<Link
                  to="/cart"
                  className="text-sm font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                >
<span>
Cart<sub>{items.length}</sub>
</span>
</Link>
<Link
                  to="/login"
                  onClick={handleLogout}
                  className="text-sm font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                >
<span>Logout</span>
</Link>
</>
)}
</nav>
</div>
{/_ END Main Header Content _/}
</header>
</>
);
};

export default Navbar;
