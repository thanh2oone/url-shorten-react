import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
  return (
    <>
      <App />
    </>
  );
}

const main = createRoot(document.getElementById("main"))
main.render(<Main />);