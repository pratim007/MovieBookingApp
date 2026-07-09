import React, { useState, useEffect } from 'react'
import {moviesStyles} from '../assets/dummyStyles'
import { Link } from 'react-router-dom'
import { Ticket, Tickets } from 'lucide-react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';


const getUploadUrl = (maybe) => {
  if (!maybe) return null;
  if (typeof maybe !== "string") return null;
  if (maybe.startsWith("http://") || maybe.startsWith("https://")) return maybe;
  return `${API_BASE}/uploads/${String(maybe).replace(/^uploads\//, "")}`;
};

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        const fetchMovies = async () => {
            try {
                const res = await axios.get(`${API_BASE}/api/movies`);
                if (mounted) {
                    setMovies(res.data.items || []);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Failed to load featured movies:", err);
                if (mounted) {
                    setError(err.message || "Failed to load featured movies");
                    setLoading(false);
                }
            }
        };
        fetchMovies();
        return () => { mounted = false; };
    }, []);

    if (loading) {
        return <div className="text-center py-12 text-gray-400">Loading Featured Movies...</div>;
    }

    if (error) {
        return <div className="text-center py-12 text-red-500">Error: {error}</div>;
    }

    if (movies.length === 0) {
        return <div className="text-center py-12 text-gray-500">No featured movies available.</div>;
    }

    const visibleMovies = movies.slice(0, 6).map((movie) => {
        const id = movie._id || movie.id || "";
        const title = movie.movieName || movie.title || "Untitled";
        const img = movie.thumbnail || movie.img || getUploadUrl(movie.poster) || "https://via.placeholder.com/400x600?text=No+Poster";
        const category = (Array.isArray(movie.categories) && movie.categories[0]) || movie.category || "General";
        return { ...movie, id, title, img, category };
    });
  return (
    <section className={moviesStyles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Pacifico&display=swap');
      `}</style>
        <h2 style={{
            fontFamily: "'Dancing Script', cursive",
        }} 
        className={moviesStyles.title}>
            Featured Movies
        </h2>
        <div className={moviesStyles.grid}>
            {visibleMovies.map((movie) => (
                <article key={movie.id} className={moviesStyles.movieArticle}>
                    <Link to={`/movie/${movie.id}`} className={moviesStyles.movieLink}>
                        <img src={movie.img} alt={movie.title} loading="lazy" className={moviesStyles.movieImage} />

                    </Link>

                    <div className={moviesStyles.movieInfo}>
                        <div className={moviesStyles.titleContainer}>
                            <Tickets className={moviesStyles.ticketIcon} />
                            <span id={`movie-title-${movie.id}`} className={moviesStyles.movieTitle}>
                                {movie.title}</span>
                            </div>
                            <div className={moviesStyles.categoryContainer}>
                                <span className={moviesStyles.categoryText}>{movie.category}</span>
                            </div>
                    </div>
                </article>
            ))}
        </div>
    </section>
  )
}

export default Movies
