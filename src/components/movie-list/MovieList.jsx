import React , {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import './MovieList.css'
import { SwiperSlide ,Swiper } from 'swiper/react'
import { Link } from 'react-router-dom'
import Button from '../button/Button'
import MovieCard from '../movie-card/MovieCard'

import tmdbApi , {category } from '../../api/tmdbApi'
import apiConfigs from '../../api/apiConfig'

const MovieList = props => {

    const [items ,setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null ;
            const params = {};

            if(props.type !== 'similar') {
                switch (props.category) {
                    case category.movie : 
                        response = await tmdbApi.getMoviesList(props.type , {params});
                        // console.log("a", response);
                        break ;
                    default : 
                        response = await tmdbApi.getTvList(props.type , {params});
                        // console.log("b", response);

                }
            } else {
                response = await tmdbApi.similar(props.category , props.id);
                console.log("c", response.results);


            }
            setItems(response.results);
        }

        getList();
    },[]);

  return (
    <div className='movie-list'>
        <Swiper
            grabCursor={true}
            spaceBetween={20}
            slidesPerView={5}       
        >
            {
                items.map((item , index) => (
                    <SwiperSlide key={index}>
                        <MovieCard category={props.category} item = {item} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div>
  )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired

}

export default MovieList