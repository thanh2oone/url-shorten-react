import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const main = createRoot(document.getElementById("root"))
main.render(<App />);