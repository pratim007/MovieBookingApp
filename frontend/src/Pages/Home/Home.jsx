import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Banner from '../../Components/Banner/Banner'
import Movies from '../../Components/Movies/Movies'
import Trailers from '../../Components/Trailers/Trailers'
import News from '../../Components/News/News'
import Footer from '../../Components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <Movies/>
      <Trailers/>
      <News/>
      <Footer/>
    </div>
  )
}

export default Home
