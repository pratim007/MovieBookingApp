import React from 'react'
import Navbar from '../Components/Navbar'
import BookingPage from '../Components/BookingPage'
import Footer from '../Components/Footer'

const Booking = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <BookingPage />
      <Footer />
    </div>
  )
}

export default Booking