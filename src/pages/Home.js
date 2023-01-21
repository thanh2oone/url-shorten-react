import './Home.css';
import ShortenControl from '../layouts/js/ShortenControl';
import AllUrl from '../layouts/js/AllUrl';
import Login from '../layouts/js/Login';
import SignUp from '../layouts/js/SignUp';

import * as React from 'react';
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import SlideRoutes from 'react-slide-routes';
import { IoLogInOutline } from 'react-icons/io5';
import { TbHandClick } from 'react-icons/tb'
import { BiCodeCurly } from 'react-icons/bi';
import { RiHomeLine } from 'react-icons/ri';

const navLink = [
  { name: 'TURL', to: '/' },
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
              return <NavLink to={item.to} id='nav-brand' style={{ textDecoration: 'none', color: 'black' }}>{item.name}</NavLink>
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
          <Route path="/" element={<ShortenControl />} />
          <Route path="/allurls" element={<AllUrl />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </SlideRoutes>
      </div>
    </div>
  </>
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false
    }
    this.showUrl = this.showUrl.bind(this)
  }

  showUrl(e) {
    e.preventDefault();
    this.setState((state) => ({
      showComponent: !state.showComponent
    })
    )
  }

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