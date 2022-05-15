import React , {useRef , useEffect} from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../assets/tmovie.png'
import NavData from '../../assets/data/nav_data.json'

const Header = () => {

  const {pathname} = useLocation();
  const headerRef = useRef(null);

  const active = NavData.findIndex(e => e.path === pathname) ;

  useEffect (() => {
    const shirnkHeader = () => {
      if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        headerRef.current.classList.add('shirnk');
      }
      else {
        headerRef.current.classList.remove('shirnk');
      }
    }
    window.addEventListener('scroll',shirnkHeader);

    return () => {
      window.addEventListener('scroll',shirnkHeader);
    };
  },[])

  return (
    <div ref ={headerRef} className='header'>
        <div className="header__wrap container">
          <div className="logo">
              <img src={logo} alt="" />
              <Link to='/'>TMovies</Link>
          </div>

          <ul className="nav">
              {
                NavData.map((item,index) => (
                  <li key={index} className={`${index===active ? 'active' : ""}`}>
                      <Link to={item.path}>
                          {item.display}
                      </Link>
                  </li>
                ))
              }
          </ul>
        </div>
    </div>
  )
}

export default Header