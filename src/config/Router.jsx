import React from 'react';

import {Routes,Route} from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/detail/Detail';
import Catalog from '../pages/Catalog';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:category/:id' element={<Detail />} />
      <Route path='/:category' element={<Catalog />} />
      <Route path='/:category/search/:keyword' element={<Catalog />} />
    </Routes>
  )
}

export default Router