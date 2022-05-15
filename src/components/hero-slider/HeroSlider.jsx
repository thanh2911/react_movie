import React , {useState , useEffect , useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './HeroSlider.css'
import 'swiper/css'

import Button , {OutlineButton} from '../button/Button';
import Modal , {ModalContent} from '../modal/Modal';
import SwiperCore , {Autoplay} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbApi , {category,movieType} from '../../api/tmdbApi';
import apiConfig  from '../../api/apiConfig';

const HeroSlider = () => {
  SwiperCore.use([Autoplay]);
  
  const [movieItems,setMovieItem] = useState([]);

  // lay api movie tu tmdApi
  useEffect(() => {
    const getMovies = async () => {
      const params = {page : 1}
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {params});
        setMovieItem(response.results.slice(0,4));

        // console.log( "alol" ,response.results.slice(0,4));

      }
      catch {
        console.log('err');
      }
    }

    getMovies();
  },[])
  
  return (
    <div className='hero-slider'>
      <Swiper
        modules= {[Autoplay]}
        grabCursor = { true }
        spaceBetween={0}
        slidesPerView={1}
        // autoplay = {{delay:3000}}

        >
          {
            movieItems.map((item , index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                    <HeroSliderItem 
                      item={item} 
                      className={`${isActive ? 'active' : ''}`} 
                    />  
                )}               
              </SwiperSlide>
            ))
          }
    </Swiper>

    {
      movieItems.map((item , index) => (
        <TrailerModal key={index} id={item.id} />
      ))
    }
    </div>
  )
}

// Item movie slider
const HeroSliderItem = props => {
  let history = useNavigate();

  const item = props.item ;

  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

  // hanh dong bat tat modal cho btn trailer
  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_slider`);

    console.log(modal);

    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
        const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
        modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
    } else {
        modal.querySelector('.modal__content').innerHTML = 'No trailer';
    }

    modal.classList.toggle('active');
}

  return (
    <div
      className={`hero-slider__item ${props.className}`}
      style = {{backgroundImage: `url(${background})`}}
      >
        <div className="hero-slider__item-content">
          <div className="hero-slider__item-content--info">
            <h2 className="title">{item.title}</h2>
            <div className="overview">{item.overview}</div>
            <div className="btns">
                <Button onClick={() => history.push('/movie/' + item.id)}>
                  Wacth now
                </Button>

                <OutlineButton onClick={ setModalActive } className='btn'>
                  Wacth trailer
                </OutlineButton>
           </div>
           </div>
          <div className="hero-slider__item-content--poster">
              <img src={apiConfig.w500Image(item.poster_path)} alt="" />
          </div>

        </div>
    </div>

  )
}


// giao dien modal trailer
const TrailerModal = () => {
 
  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute('src', '');

  return (
      <Modal active={false} id="modal_slider">
          <ModalContent onClose={onClose}>
              <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
          </ModalContent>
      </Modal>
  )
}

export default HeroSlider