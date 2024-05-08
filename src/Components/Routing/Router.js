import React from 'react'
import{BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from '../Home/Home.js'
import '../../Styles/QuickSearch.css'
import '../../Styles/WallPaper.css'

import Filter from '../Filter/Filter.js'
import '../../Styles/Filter.css'
import '../../Styles/HeaderFil.css'

import Details from '../Details/Details.js';
import '../../Styles/Details.css';

import Header from '../Header/Header.js'

export default function Router() {
  return (
    <div>
        <BrowserRouter>
        <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/Home' element={<Home/>}/>
                <Route path='/Filter' element={<Filter/>}/>
                <Route path='/Details' element={<Details/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}
