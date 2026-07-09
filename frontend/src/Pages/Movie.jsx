import React from 'react'
import Navbar from '../Components/Navbar'
import MoviePage from '../Components/MoviePage'
import Footer from '../Components/Footer'

const Movie = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <MoviePage />
      <Footer />
    </div>
  )
}

export default Movie
