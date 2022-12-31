import { createRoot } from 'react-dom/client';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
  return (
    <>
      <Home />
    </>
  );
}

const main = createRoot(document.getElementById("main"))
main.render(<Main />);