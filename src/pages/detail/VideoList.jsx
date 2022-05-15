import React , {useState , useEffect, useRef} from 'react' ;

import tmdbApi from '../../api/tmdbApi';
import { useParams } from 'react-router-dom';
import "./Detail.css"

const VideoList = props => {

    const {category} = useParams();

    const [videos , setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const response = await tmdbApi.getVideos(category,props.id);
            setVideos(response.results.slice(0,3));
        }
        getVideos();
    },[category , props.id])

    // console.log(videos);
  return (
    <>
        {
            videos.map((item,index) => (
                <Video key={index} item = {item} />
            ))
        }
    </>
  )
}

const Video = props => {

    const item = props.item ;

    const iframeRef = useRef(null);

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 8/16 + 'px';
        // console.log(iframeRef.current.offsetWidth,height);
        iframeRef.current.setAttribute('height',height);
    },[])


    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.title || item.name}</h2>
            </div>

            <iframe 
                src= {`https://www.youtube.com/embed/${item.key}`} 
                ref = {iframeRef}
                width= "100%"
                title='video'
                >

            </iframe>
        </div>
    )
}

export default VideoList