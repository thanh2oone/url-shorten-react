import './Home.css';
import Shorten from '../layouts/js/ClassComponent/Shorten';
import AllUrl from '../layouts/js/ClassComponent/AllUrl';
import Login from '../layouts/js/ClassComponent/Login';
import SignUp from '../layouts/ClassComponent/js/SignUp';

import * as React from 'react';
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import SlideRoutes from 'react-slide-routes';
import { IoLogInOutline } from 'react-icons/io5';
import { TbHandClick } from 'react-icons/tb'
import { BiCodeCurly } from 'react-icons/bi';
import { RiHomeLine } from 'react-icons/ri';

const navLink = [
  { name: 'TURL' },
  { name: 'Home', to: '/', classIcon: <RiHomeLine className='nav-icon' /> },
  { name: 'All URLs', to: '/allurls', classIcon: <BiCodeCurly className='nav-icon' /> },
  { name: 'Sign Up', to: '/signup', classIcon: <TbHandClick className='nav-icon' /> },
  { name: 'Login', to: '/login', classIcon: <IoLogInOutline className='nav-icon' /> }
]

const App = () => (
  <>
    <div id='body-content'>
      <div id='side-vertical'>
        {navLink.map((item) => {
          switch (item.name) {
            case 'TURL':
              return <div id='nav-brand' style={{ textDecoration: 'none', color: 'black' }}>{item.name}</div>
            default:
              return (
                <>
                  <div id='nav-link'>
                    {item.classIcon}
                    <NavLink className='nav-text' to={item.to} style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.5)' }}>{item.name}</NavLink>
                  </div>
                </>
              )
          }
        })}
      </div>

      <div id='slide'>
        <SlideRoutes>
          <Route path="/" element={<Shorten />} />
          <Route path="/allurls" element={<AllUrl />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </SlideRoutes>
      </div>
    </div>
  </>
);

class Home extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ >
    );
  }
}

export default Home;