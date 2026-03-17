import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User, LayoutDashboard, Phone } from "lucide-react";
import { isLoginAction } from "../../store/reducers/isOpenSlice";
import { authClient } from "../../lib/auth-client";

function Header() {
  const dispatch = useDispatch();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="hidden lg:block bg-gray-100">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
        <div className="flex justify-between text-gray-700 text-xs py-2 font-sans font-medium border-b">
          <span className="flex items-center">
            <Phone className="mr-2 w-3.5 h-3.5 text-emerald-500" />
            We are available 24/7, Need help? Call Us:
            <a className="font-bold !no-underline !text-emerald-500 ml-1" href="tel:+01234560352">+01234560352</a>
          </span>

          <div className="flex items-center lg:text-right gap-4">
            <Link to="about-us" className="!text-black !no-underline hover:!text-emerald-600 transition-colors">About Us</Link>
            <span className="text-gray-300">|</span>
            <Link to="contact-us" className="!no-underline !text-black hover:!text-emerald-600 transition-colors">Contact Us</Link>
            <span className="text-gray-300">|</span>

            {user ? (
              <Link
                to="/user/dashboard"
                className="!no-underline !text-black flex items-center font-semibold cursor-pointer hover:!text-emerald-600 transition-colors"
              >
                <LayoutDashboard className="mr-1.5 w-4 h-4 text-emerald-500" />
                Go to Dashboard
              </Link>
            ) : (
              <button
                onClick={() => dispatch(isLoginAction(true))}
                className="!no-underline !text-black flex items-center font-semibold cursor-pointer hover:!text-emerald-600 transition-colors"
              >
                <User className="mr-1.5 w-4 h-4" />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;