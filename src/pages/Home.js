import React from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from "react-router-dom";
import About from '../component/common/About'
import Testimonial from '../component/common/Testimonial'

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  }

  const slides = [
    { title: "HEALTH", desc: "Achieve physical, mental, emotional, and spiritual well-being" },
    { title: "ABUNDANCE", desc: "Attract success and abundance of time, love and money" },
    { title: "RELATIONSHIPS", desc: "Attract new and strengthen troubled relationships" },
    { title: "PEACE", desc: "Experience lasting joy, peace and vitality" },
    { title: "PERSONAL GROWTH", desc: "Unlock intuition powers, boost confidence and discover your life’s purpose" }
  ]

  return (
    <section className="as_banner_wrapper">
      <div className="container-fluid">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index}>
              <div className="row as_verticle_center">
                {/* Left Column */}
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="as_banner_detail">
                    <h5 className="as_orange">What’s Your Sign ?</h5>
                    <h1>{slide.title}</h1>
                    <p>{slide.desc}</p>
                    <Link to="" className="as_btn">read more</Link>
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="as_banner_img text-center">
                    <img src="img/circle_img.webp" alt="Circle Banner" className="img-responsive" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

const Services = () => {
  return (
    <section className="as_service_wrapper as_padderTop80 as_padderBottom80">
      <div className="container">
        <div className="row">
          {/* Heading */}
          <div className="col-lg-12 text-center">
            <h1 className="as_heading as_heading_center">our services</h1>
            <p className="as_font14 as_padderBottom5">
              Our courses and treatments are being offered Online and Offline
              <br />
              etesde dolore magna aliquapspendisse and the gravida.
            </p>
          </div>

          {/* Service 1 */}
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="as_service_box text-center">
              <span className="as_icon">
                <img src="img/LIFECOACHING.png" alt="Life Coaching" />
              </span>
              <h4 className="as_subheading">LIFE COACHING</h4>
              <p>
                Life coaching is a professional service designed to help
                individuals clarify REIKI , CRYSTAL HEALING and More ...
              </p>
              <a href="Services/lifecoaching.php" className="as_link">
                read more
              </a>
            </div>
          </div>

          {/* Service 2 */}
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="as_service_box text-center">
              <span className="as_icon">
                <img
                  src="assets/images/svg/service2.svg"
                  alt="Ho'oponopono"
                />
              </span>
              <h4 className="as_subheading">HO'OPONOPONO</h4>
              <p>
                The ho’oponopono prayer is a Hawaiian practice of forgiveness
                and reconciliation...
              </p>
              <a href="Services/hooponopono.php" className="as_link">
                read more
              </a>
            </div>
          </div>

          {/* Service 3 */}
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="as_service_box text-center">
              <span className="as_icon">
                <img
                  src="assets/images/svg/service3.svg"
                  alt="Lamafara and Yogmaya"
                />
              </span>
              <h4 className="as_subheading">LAMAFERA AND YOGMAYA</h4>
              <p>Yogmaya is a combination of all deities and guru’s energy ...</p>
              <a
                href="Services/LAMAFERAANDYOGMAYA.php"
                className="as_link"
              >
                read more
              </a>
            </div>
          </div>

          {/* Service 4 */}
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="as_service_box text-center">
              <span className="as_icon">
                <img src="assets/images/svg/service4.svg" alt="Twin Flame" />
              </span>
              <h4 className="as_subheading">TWIN FLAME</h4>
              <p>
                The concept of a “twin flame” is rooted in spiritual and
                metaphysical beliefs. It is often seen as a deep, soul-level ...
              </p>
              <a href="Services/TWINFLAME.php" className="as_link">
                read more
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <About />
      <Services />
      <Testimonial />
      <Footer />
      
    </>
  )
}

export default Home
