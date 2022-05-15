import React , {useState , useEffect} from 'react' ;

import tmdbApi from '../../api/tmdbApi';
import apiConfigs from '../../api/apiConfig';
import { useParams } from 'react-router-dom';
import "./Detail.css"

const CastList = props => {

    const {category} = useParams();

    const [casts , setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const response = await tmdbApi.credits(category,props.id) ;
            setCasts(response.cast.slice(0,5));
        }
        getCredits();
    },[category , props.id])

    // console.log(casts);

  return (
    <div className="casts">
        {
            casts.map((item,index) => (
                <div className="casts__item" key={index}>
                    <div className="casts__item-img" style={{
                        backgroundImage:`url(${apiConfigs.w500Image(item.profile_path)})`
                    }}></div>

                    <p className="casts__item-name">{item.name}</p>
                </div>
            ))
        }
    </div>
  )
}

export default CastList