import './assets/boxicons-2.0.7/css/boxicons.min.css';
import {BrowserRouter} from 'react-router-dom';

import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Routes from './config/Router';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
