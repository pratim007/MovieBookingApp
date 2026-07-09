import React from 'react'
import Navbar from '../Components/Navbar'
import SeatSelectorPage from '../Components/SeatSelectorPage'
import Footer from '../Components/Footer'

const SeatSelector = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <SeatSelectorPage />
      <Footer />
    </div>
  )
}

export default SeatSelector