import React , { useState , useEffect }from 'react' ;
import { useParams } from 'react-router-dom';

import tmdbApi from '../../api/tmdbApi';
import apiConfigs from '../../api/apiConfig';
import CastList from './CastList';
import VideoList from './VideoList';
import MovieList from '../../components/movie-list/MovieList'
import { category , movieType , tvType } from '../../api/tmdbApi';

import './Detail.css'

const Detail = () => {

  const { category, id } = useParams();
  const [item, setItem] = useState(null); // chu y null vs [] la khac nhau trong truong hop nay

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category , id , {params:{}});
      window.scrollTo(0,0);
      setItem(response)
        
    }
    getDetail();
    
  },[category,id])





  
  
  // console.log(item);

  
  return (
    <>
      {
        item && (
          <>
            <div className="banner" style={{
              backgroundImage:`url(${apiConfigs.originalImage(item.poster_path || item.backdrop_path)})`}}>
            </div>
            <div className="movie-content">
              <div className="movie-content__poster">
                  <div className="movie-content__poster-img" style={{
                    backgroundImage:`url(${apiConfigs.originalImage(item.poster_path || item.backdrop_path)})`}}
                  >
                  </div>
              </div>

              <div className="movie-content__poster-info">
                  <div className="title">
                    {item.title || item.name}
                  </div>
                  <div className="genres">
                    {
                      item.genres && item.genres.slice(0,5).map((genre , index) => (
                        <span key={index} className="genres__item"> {genre.name}</span>
                      ))
                    }
                  </div>

                  <p className="overview"> {item.overview}</p>
                  <div className="cast">
                    <div className="section__header">
                      <h2>Casts</h2>
                    </div>

                    <CastList id={item.id} />
                  </div>
              </div>
            </div>

            <div className="container">
              <div className="section mb-3">
                    <VideoList id = {item.id}/>
              </div>
              <div className="section mb-3" style={{padding:"0 20px"}}>
                <h2 style={{marginBottom:"2rem"}}>Similar</h2>

                <MovieList category={category} type="similar" id= {`${item.id}`}/>
                
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default Detail