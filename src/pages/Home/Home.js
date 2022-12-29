import './Home.css';

import * as React from 'react';
import ShortenControl from '../../layouts/ShortenControl';
import AllUrl from '../../layouts/AllUrl';
import { BrowserRouter, Route, NavLink } from "react-router-dom";

import SlideRoutes from 'react-slide-routes';

const App = () => (
  <>
    <div id="container" className='container'>
      <nav style={{ width: '200px' }}>
        <NavLink to='/' ClassName="card home">Home</NavLink>
        <NavLink to='/allurl' ClassName="card all-url">AllUrl</NavLink>
      </nav>
      <SlideRoutes>
        <Route path="/" element={<ShortenControl />} />
        <Route path="/allurl" element={<AllUrl />} />
      </SlideRoutes>
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