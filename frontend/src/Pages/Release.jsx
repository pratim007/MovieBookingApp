import React from 'react'
import Navbar from '../Components/Navbar'
import ReleasesPage from '../Components/ReleasesPage'
import Footer from '../Components/Footer'

const Release = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <ReleasesPage />
      <Footer />
    </div>
  )
}

export default Release
