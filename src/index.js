import { createRoot } from 'react-dom/client';
import Home from './pages/Home/Home';

const Main = () => {
  return (
    <>
      <Home />
    </>
  );
}

const main = createRoot(document.getElementById("main"))
main.render(<Main />);