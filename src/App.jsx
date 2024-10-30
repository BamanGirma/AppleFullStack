import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from '../src/Header/Header'
import Alert from '../src/Alert/Alert'
import FirstSection from './FirstSection/FirstSection'
import SecondSection from './SecondSection/SecondSection'
import ThridSection from './ThridSection/ThridSection'
import FourthSection from './FourthSection/FourthSection'
import FifthSection from './FifthSection/FifthSection'
import SixthSection from './SixthSection/SixthSection'
import Footer from './Footer/Footer'
import Cart from './Page/Cart'
import FourOf4 from './Page/FourOf4'
import Ipad from './Page/Ipad'
import Iphone from './Page/Iphone'
import Mac from './Page/Mac'
import Main from './Page/Main'
import Music from './Page/Music'
import ProductPage from './Page/ProductPage'
import Support from './Page/Support'
import Tv from './Page/TV'
import Watch from './Page/Watch'
import Search from './Page/Search'
import Shared from './Shared'
import {Routes,Route} from 'react-router-dom'





function App() {

  
  return (
    <>
        <Routes>
          <Route path='/' element={<Shared/>}>
              <Route path='/' element={<Main/>} />
              <Route path='mac' element={<Mac/>} />
              <Route path='iphone' element={<Iphone/>} />
              <Route path='iphone/:productID' element={<ProductPage/>}/>
              <Route path='ipad' element={ <Ipad/>} />
              <Route path='watch' element={ <Watch/>} />
              <Route path='tv' element={ <Tv/>} />
              <Route path='music' element={ <Music/>} />
              <Route path='support' element={ <Support/>} />
              <Route path='search' element={ <Search/>} />
              <Route path='cart' element={<Cart/>} />
              <Route path='*' element={<FourOf4/>}/>
          </Route>
     </Routes>
    </>
  )
}

export default App