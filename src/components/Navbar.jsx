import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import withReactContent from 'sweetalert2-react-content';
import Swal from '../utils/Swal';
import { Link } from 'react-router-dom';

const ReusableNav = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [cookie, , removeCookie] = useCookies(['token', 'role', 'id']);
  const checkToken = cookie.token;
  const checkRole = cookie.role;

  const clearData = () => {
    removeCookie('token', { path: '/' });
    removeCookie('role', { path: '/' });
    removeCookie('id', { path: '/' });
    localStorage.removeItem('responAvai');
    localStorage.removeItem('role');
    localStorage.removeItem('idMentor');
    localStorage.removeItem('credentials');
    localStorage.removeItem('responsPayment');
    localStorage.removeItem('status');
    localStorage.removeItem('idTransaction');
    localStorage.removeItem('idClass');
    localStorage.removeItem('availCheck');
    localStorage.removeItem('availData');
    localStorage.removeItem('ratingStatus');
    localStorage.removeItem('token');
    localStorage.removeItem('create_event_response');
  };

  const handleLogout = () => {
    navigate('/login');
    MySwal.fire({
      title: 'See Ya',
      text: 'You have been Logged out',
      showCancelButton: false,
    });
    clearData();
  };

  return (
    <>
      <div className="navbar mx-auto p-8">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-5 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="text-white font-bold font-poppins">Home</a>
              </li>
              <li>
                <a className="text-white font-bold font-poppins">About Us</a>
              </li>
              <li>
                <a className="text-white font-bold font-poppins">Service</a>
              </li>
              <li>
                <a className="text-white font-bold font-poppins">Testimonial</a>
              </li>
              {checkToken && (
                <li>
                  <a
                    className="text-white font-bold font-poppins"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl text-black font-poppins font-bold"
          >
            MusicLab
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex"></div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 lg:flex hidden">
            <li>
              <Link to="/#myElement" className="text-black font-bold font-poppins">
                About Us
              </Link>
            </li>
            <li>
              <Link to={{ pathname: '/', hash: '#service' }} className="text-black font-bold font-poppins">
                Service
              </Link>
            </li>
            <li>
              <a className="text-black font-bold font-poppins">Testimonial</a>
            </li>
            {checkToken && checkRole === 'Mentor' && (
              <li>
                <a href="/chat" className="text-black font-bold font-poppins">
                  Chat
                </a>
              </li>
            )}
            {checkToken && (
              <li>
                <a
                  className="text-black font-bold font-poppins"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
          {checkToken && checkRole === 'Student' ? (
            <Link to="/ProfilStudent" className="btn bg-white text-black font-poppins font-bold hover:bg-black hover:text-white">
              Profile
            </Link>
          ) : checkToken && checkRole === 'Mentor' ? (
            <Link to="/profileTeacher" className="btn bg-white text-black font-poppins font-bold hover:bg-black hover:text-white">
              Profile
            </Link>
          ) : (
            <Link to="/login" className="btn bg-white text-black font-poppins font-bold hover:bg-black hover:text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

const NavMain = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [cookie, , removeCookie] = useCookies(['token', 'role']);
  const checkToken = cookie.token;
  const checkRole = cookie.role;

  const handleLogout = () => {
    removeCookie('token', { path: '/' });
    removeCookie('role', { path: '/' });
    navigate('/login');
    MySwal.fire({
      title: 'See Ya',
      text: 'You have been Logged out',
      showCancelButton: false,
    });
  };

  return (
    <>
      <div className="navbar mx-auto p-8">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-5 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="text-white font-bold font-poppins">Home</a>
              </li>
              <li>
                <a className="text-white font-bold font-poppins">About Us</a>
              </li>
              <li>
                <a className="text-white font-bold font-poppins">Service</a>
              </li>
              <li>
                <a className="text-white font-bold font-poppins">Testimonial</a>
              </li>
              {checkToken && (
                <li>
                  <a
                    className="text-white font-bold font-poppins"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl text-white font-poppins font-bold"
          >
            MusicLab
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex"></div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 lg:flex hidden">
            <li>
              <a className="text-white font-bold font-poppins">Home</a>
            </li>
            <li>
              <a className="text-white font-bold font-poppins">About Us</a>
            </li>
            <li>
              <a className="text-white font-bold font-poppins">Service</a>
            </li>
            <li>
              <a className="text-white font-bold font-poppins">Testimonial</a>
            </li>
            {checkToken && (
              <li>
                <a
                  className="text-white font-bold font-poppins"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
          {checkToken && checkRole === 'Student' ? (
            <Link to="/ProfilStudent" className="btn bg-white text-black font-poppins font-bold hover:bg-black hover:text-white">
              Profile
            </Link>
          ) : checkToken && checkRole === 'Mentor' ? (
            <Link to="/profileTeacher" className="btn bg-white text-black font-poppins font-bold hover:bg-black hover:text-white">
              Profile
            </Link>
          ) : (
            <Link to="/login" className="btn bg-white text-black font-poppins font-bold hover:bg-black hover:text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export { ReusableNav, NavMain };
