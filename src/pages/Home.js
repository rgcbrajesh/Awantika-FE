import React, { useState, useEffect } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from "react-router-dom";
import About from '../component/common/About'
import Testimonial from '../component/common/Testimonial'
import axios from 'axios'

const Banner = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const defaultSlides = [
    { title: "HEALTH", desc: "Achieve physical, mental, emotional, and spiritual well-being", image: "img/circle_img.webp" },
    { title: "ABUNDANCE", desc: "Attract success and abundance of time, love and money", image: "img/circle_img.webp" },
    { title: "RELATIONSHIPS", desc: "Attract new and strengthen troubled relationships", image: "img/circle_img.webp" },
    { title: "PEACE", desc: "Experience lasting joy, peace and vitality", image: "img/circle_img.webp" },
    { title: "PERSONAL GROWTH", desc: "Unlock intuition powers, boost confidence and discover your life's purpose", image: "img/circle_img.webp" }
  ]

  // Fetch banner images from API
  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const response = await axios.get('http://localhost:4010/api/content/types/dashboard_image?isActive=true&limit=50');
        if (response.data.success) {
          const heroImages = response.data.data.filter(img =>
            img.metadata?.section === 'hero' || img.metadata?.section === 'banner'
          );
          setBannerImages(heroImages);
        }
      } catch (error) {
        console.error('Error fetching banner images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerImages();
  }, []);

  // Combine default slides with dynamic images
  const slides = defaultSlides.map((slide, index) => {
    const dynamicImage = bannerImages[index];
    return {
      ...slide,
      image: dynamicImage?.imageUrl || slide.image,
      alt: dynamicImage?.imageAlt || slide.title
    };
  });

  if (loading) {
    return (
      <section className="as_banner_wrapper">
        <div className="container-fluid">
          <div className="row as_verticle_center">
            <div className="col-12 text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
                    <h5 className="as_orange">What's Your Sign ?</h5>
                    <h1>{slide.title}</h1>
                    <p>{slide.desc}</p>
                    <Link to="" className="as_btn">read more</Link>
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="as_banner_img text-center">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="img-responsive"
                      onError={(e) => {
                        e.target.src = "img/circle_img.webp"; // Fallback image
                      }}
                    />
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
  const [serviceImages, setServiceImages] = useState([]);

  const defaultServices = [
    {
      title: "LIFE COACHING",
      description: "Life coaching is a professional service designed to help individuals clarify REIKI , CRYSTAL HEALING and More ...",
      image: "img/LIFECOACHING.png",
      link: "Services/lifecoaching.php"
    },
    {
      title: "HO'OPONOPONO",
      description: "The ho'oponopono prayer is a Hawaiian practice of forgiveness and reconciliation...",
      image: "assets/images/svg/service2.svg",
      link: "Services/hooponopono.php"
    },
    {
      title: "LAMAFERA AND YOGMAYA",
      description: "Yogmaya is a combination of all deities and guru's energy ...",
      image: "assets/images/svg/service3.svg",
      link: "Services/LAMAFERAANDYOGMAYA.php"
    },
    {
      title: "TWIN FLAME",
      description: "The concept of a \"twin flame\" is rooted in spiritual and metaphysical beliefs. It is often seen as a deep, soul-level ...",
      image: "assets/images/svg/service4.svg",
      link: "Services/TWINFLAME.php"
    }
  ];

  // Fetch service images from API
  useEffect(() => {
    const fetchServiceImages = async () => {
      try {
        const response = await axios.get('http://localhost:4010/api/content/types/dashboard_image?isActive=true&limit=50');
        if (response.data.success) {
          const servicesImages = response.data.data.filter(img =>
            img.metadata?.section === 'services'
          );
          setServiceImages(servicesImages);
        }
      } catch (error) {
        console.error('Error fetching service images:', error);
      }
    };

    fetchServiceImages();
  }, []);

  // Combine default services with dynamic images
  const services = defaultServices.map((service, index) => {
    const dynamicImage = serviceImages[index];
    return {
      ...service,
      image: dynamicImage?.imageUrl || service.image,
      alt: dynamicImage?.imageAlt || service.title
    };
  });

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

          {/* Dynamic Services */}
          {services.map((service, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="as_service_box text-center">
                <span className="as_icon">
                  <img
                    src={service.image}
                    alt={service.alt}
                    onError={(e) => {
                      e.target.src = defaultServices[index].image; // Fallback to default image
                    }}
                  />
                </span>
                <h4 className="as_subheading">{service.title}</h4>
                <p>{service.description}</p>
                <a href={service.link} className="as_link">
                  read more
                </a>
              </div>
            </div>
          ))}
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
