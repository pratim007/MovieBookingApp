import React from 'react'
import {bannerStyles} from '../assets/dummyStyles'
import video from '../assets/MovieBannerVideo.mp4'
import { Info, Star, Ticket } from 'lucide-react'
const Banner = () => {
  return (
    <div className={bannerStyles.container}>
        <div className={bannerStyles.videoContainer}>
            <video autoPlay loop muted className={bannerStyles.video}>
                <source src={video} type="video/mp4"/>
                {/* fallback text */}
                Your browser does not support the video tag.
            </video>
            <div className={bannerStyles.overlay}></div>
        </div>
        {/* content */}
        <div className={bannerStyles.content}>
          <div className={bannerStyles.contentInner}>
            <h1 className={bannerStyles.title} style={{fontfamily: "'Dancing Script', cursive"}}>
              Welcome to Cineverse

            </h1>
            <p className={bannerStyles.description}>
              Your ultimate destination for movie bookings and entertainment.
            </p>

            <div className={bannerStyles.ratinggenreContainer}>
              <div className={bannerStyles.ratingContainer}>
                <div className={bannerStyles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={bannerStyles.star}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className={bannerStyles.ratingText}>4.5/5</span>
              </div>
              <div className={bannerStyles.genreContainer}>
                <span className={bannerStyles.genreText}>Action • Adventure • Sci-Fi</span>
              </div>
            </div>
            <div className={bannerStyles.buttonContainer}>
              <a href="/movies" className={bannerStyles.bookButton}>
              <Ticket className={bannerStyles.icon} fill="white" />
                Book Now
              </a>
              <a href="/contact" className={bannerStyles.infoButton}>
              <Info className={bannerStyles.icon} /> 
                More Info
              </a>
            </div>
          </div>
        </div>
        <div className={bannerStyles.bottomSection}>
          <div className={bannerStyles.bottomContent}>
            <p className={bannerStyles.bottomText}>Experience the magic of cinema with Cineverse.</p>
          </div>
        </div>
        <style>
          {bannerStyles.customCSS}
        </style>
      </div>
  )
}

export default Banner
