import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Movies from '../Components/Movies'
import Trailers from '../Components/Trailers'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Banner />
      <Movies />
      <Trailers />
      <Footer />
    </div>
  )
}

export default Home
