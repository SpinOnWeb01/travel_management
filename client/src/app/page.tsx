import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSec from './pages/HeroSec';
import Index from './pages/Index';





export default function () {
  return (

    <>


  <div className='main_background_image'>
      <Header />

      <HeroSec />
      </div>

 
    <Index />
  

  <Footer />


    


    </>
  );
}
