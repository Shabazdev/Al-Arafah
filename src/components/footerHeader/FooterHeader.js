import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Basket from "../basket/Basket";
import { useDispatch, useSelector } from 'react-redux';
import { sidebarAction } from "../../store/reducers/sidebarSlice";
import { authClient } from "../../lib/auth-client";
import { isLoginAction } from "../../store/reducers/isOpenSlice";
import { Menu, Transition } from "@headlessui/react";
import { User, LogOut, LayoutDashboard, Settings } from "lucide-react";

const FooterHeader = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const { isOpen } = useSelector((state) => state.isOpen);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: session } = await authClient.getSession();
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      }
    };
    fetchSession();
  }, [isOpen]);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setUser(null);
          window.location.reload();
        },
      },
    });
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <footer className="lg:hidden fixed z-30 bottom-0 bg-emerald-500 flex items-center justify-between w-full h-16 px-3 sm:px-10">
      <button onClick={() => { dispatch(sidebarAction(true)) }} className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none text-white">
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 drop-shadow-xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="17" y1="10" x2="3" y2="10"></line>
          <line x1="21" y1="6" x2="3" y2="6"></line>
          <line x1="21" y1="14" x2="3" y2="14"></line>
          <line x1="17" y1="18" x2="3" y2="18"></line>
        </svg>
      </button>

      <Link to="/" className="text-xl !text-white">
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 drop-shadow-xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </Link>

      <Basket className="pr-5 relative whitespace-nowrap inline-flex items-center justify-center text-white text-lg" />

      <div className="flex items-center">
        {user ? (
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center focus:outline-none">
              <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-emerald-600 font-bold text-xs border-2 border-emerald-300 shadow-sm active:scale-95 transition-transform">
                {user.image ? (
                  <img src={user.image} alt="" className="h-full w-full rounded-full object-cover" />
                ) : (
                  getInitials(user.name)
                )}
              </div>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom="transform opacity-0 translate-y-2 scale-95"
              enterTo="transform opacity-100 translate-y-0 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="transform opacity-100 translate-y-0 scale-100"
              leaveTo="transform opacity-0 translate-y-2 scale-95"
            >
              <Menu.Items className="absolute right-0 bottom-full mb-3 w-52 origin-bottom-right divide-y divide-gray-100 rounded-xl bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.15)] ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Account</p>
                  <p className="text-sm font-bold truncate text-gray-800">{user.name}</p>
                </div>
                <div className="p-1.5">
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/user/dashboard" className={classNames(active ? "bg-emerald-50 text-emerald-600" : "text-gray-700", "flex items-center px-3 py-2 text-sm rounded-lg font-medium")}>
                        <LayoutDashboard className="mr-2.5 w-4 h-4 opacity-70" /> Dashboard
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/user/settings" className={classNames(active ? "bg-emerald-50 text-emerald-600" : "text-gray-700", "flex items-center px-3 py-2 text-sm rounded-lg font-medium")}>
                        <Settings className="mr-2.5 w-4 h-4 opacity-70" /> Settings
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="p-1.5">
                  <Menu.Item>
                    {({ active }) => (
                      <button onClick={handleLogout} className={classNames(active ? "bg-red-50 text-red-600" : "text-gray-700", "flex w-full items-center px-3 py-2 text-sm rounded-lg font-medium")}>
                        <LogOut className="mr-2.5 w-4 h-4 opacity-70" /> Sign Out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <button
            onClick={() => dispatch(isLoginAction(true))}
            className="flex items-center justify-center text-white focus:outline-none active:scale-90 transition-transform"
          >
            <User className="w-6 h-6" />
          </button>
        )}
      </div>
    </footer>
  );
};

export default FooterHeader;