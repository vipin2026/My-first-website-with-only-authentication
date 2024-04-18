import React from 'react'
import './home.css'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';
// import Topbar from '../../components/Topbar/Topbar'

export default function Home(){




    const handleCTAClick = () => {
        toast.success('You clicked the CTA!');
        alert('hello you  got the right click')
      };

    return(
        <>
      <div className="homepage">
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero">
          <h1>Welcome to VS Organisation</h1>
          <p>Your go-to destination for all things amazing!</p>
          <button onClick={handleCTAClick}>Learn More</button>
        </section>
        <section className="features">
          <h2>Our Features</h2>
          <ul>
            <li>Bikes</li>
            <li>Cars</li>
            <li>Trucks</li>
          </ul>
        </section>
        <section className="testimonials">
          <h2>Testimonials</h2>
          <div className="testimonial">
            <p>if you want to buys luxury thing then you are on the correct website</p>
            <p>-Vipin Singh</p>
          </div>
          <div className="testimonial">
            <p>"you can buy highly modified stuff here"</p>
            <p>- Vipin Singh</p>
          </div>
        </section>
      </main>
      <footer>
        <p>Contact us at <a href="mailto:info@example.com">vipin.connect@gmail.com</a></p>
      </footer>
    </div>
  
        </>
    )
}