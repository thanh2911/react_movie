import React from 'react'
import './MovieCard.css'

import { Link } from 'react-router-dom'
import Button from '../button/Button'

import tmdbApi , {category } from '../../api/tmdbApi'
import apiConfigs from '../../api/apiConfig'

const MovieCard = props => {
    
    const item = props.item ;
    const link = '/' + category[props.category] + '/' + item.id ;

    const bg = apiConfigs.w500Image( item.poster_path || item.backdrop_path ) ; 



  return (
    <Link to={link}>
        <div className="movie-card" style={{backgroundImage:`url(${bg})`}}>
            <Button>
                <i className='bx bx-play'></i>
            </Button>
        </div>
        <h3>{item.name || item.title }</h3>
    </Link>
  )
}

export default MovieCard