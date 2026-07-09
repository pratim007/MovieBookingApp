import React from 'react'
import Navbar from '../Components/Navbar'
import ContactPage from '../Components/ContactPage'
import Footer from '../Components/Footer'

const Contact = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <ContactPage />
      <Footer />
    </div>
  )
}

export default Contact
