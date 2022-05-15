import React , {useState, useEffect, useCallback} from 'react' 

import './MovieGrid.css'
import Button, {OutlineButton} from '../button/Button'
import Input from '../input/Input'

import MovieCard from '../movie-card/MovieCard'
import { useParams , useNavigate} from 'react-router-dom'
import tmdbApi , { category, movieType } from '../../api/tmdbApi'

const MovieGrid = props => {

    const [items , setItems] = useState([]);
    const [page , setPage] = useState(1);
    const [totalPage , setTotalPage] = useState(0);

    const {keyword} = useParams();

    // console.log(keyword);


    useEffect(() => {
        const getList = async () => {

            let response = null ;
            if(keyword ===undefined ) {
                const params = {} ;

                switch(props.category) {
                    case category.movie :
                        response = await tmdbApi.getMoviesList(movieType.upcoming , {params});
                        break
                    default:
                        response = await tmdbApi.getTvList(movieType.popular , {params});
                       
                }
            }
            else {
                const params = {
                    query: keyword
                }

                response = await tmdbApi.search(props.category , {params});
            }

            // console.log("log1" ,response);
            setItems(response.results);
            setTotalPage(response.total_pages)
            
        }
        getList();
    },[props.category , keyword])


    const loadMore = async () => {
        let response = null ;
        if(keyword ===undefined ) {
            const params = {
                page : page + 1
            } ;

            switch(props.category) {
                case category.movie :
                    response = await tmdbApi.getMoviesList(movieType.upcoming , {params});
                    break
                default:
                    response = await tmdbApi.getTvList(movieType.popular , {params});
                   
            }
        }
        else {
            const params = {
                page: page + 1 ,
                query: keyword
            }

            response = await tmdbApi.search(props.category , {params});
        }

        // console.log("log2" ,response);
        setItems([...items ,...response.results]);
        setPage(page + 1)   
    
    }


  return (
    <>

        <div className="section mb-3">
            <MovieSearch  category = {props.category} keyword = {keyword}/>
        </div>

        <div className="movie-grid">
        {
            items.map((item , index) => (
                <MovieCard 
                    category={props.category}  
                    item = {item} 
                    key = {index} 
                />
            ))
        }
        </div>

        {
        page < totalPage ? (
            <div className="movie-grid__loadmore">
                <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
            </div>
        ) : null 
        }
    </>

  ) 
}

const MovieSearch = props => {

    const history = useNavigate();

    const [keyword , setKeyword] = useState(props.keyword ? props.keyword : "");

    
    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history(`/${category[props.category]}/search/${keyword}`);
            }
        },
        [keyword, props.category, history]
    );


    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
            document.addEventListener('keyup',enterEvent); 
            return () => {
            document.removeEventListener('keyup',enterEvent); 
            }    
    }, [keyword,goToSearch])

    return (
        <div className="movie-search">
            <Input 
                type = "text"
                placeholder = 'Enter keyword'
                value = {keyword}
                onChange = {(e) => setKeyword(e.target.value)}
            
            />

            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGrid