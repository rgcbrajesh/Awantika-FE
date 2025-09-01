import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="as_about_wrapper as_padderTop80 as_padderBottom80">
      <div className="container">
        <div className="row">
          {/* Left Side - Slider */}
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <Slider {...settings} className="as_about_slider">
              <div>
                <div className="as_aboutimg text-right">
                  <img
                    src="img/pic1.jpg"
                    alt=""
                    className="img-responsive"
                    style={{ height: "505px", width: "463px" }}
                  />
                </div>
              </div>
              <div>
                <div className="as_aboutimg text-right">
                  <img
                    src="img/pic2.jpg"
                    alt=""
                    className="img-responsive"
                    style={{ height: "505px", width: "463px" }}
                  />
                </div>
              </div>
              <div>
                <div className="as_aboutimg text-right">
                  <img
                    src="img/pic3.jpg"
                    alt=""
                    className="img-responsive"
                    style={{ height: "505px", width: "463px" }}
                  />
                </div>
              </div>
            </Slider>
          </div>

          {/* Right Side - Content */}
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <h1 className="as_heading">know about me</h1>
            <p>
              Welcome to the transformative journey of holistic coaching, where
              mind, body, and spirit converge to create lasting change and
              holistic well-being. I am Aawantikaa, your dedicated holistic
              coach, here to guide you on a path of self-discovery, empowerment,
              and holistic transformation.
            </p>
            <p>
              In a world that often emphasizes fragmented approaches to personal
              development, holistic coaching stands out as a beacon of
              comprehensive and integrated support. As your holistic coach, I
              recognize that you are not merely a collection of isolated parts
              but a unique and interconnected being. We will embark on a journey
              that considers every facet of your life — your thoughts, emotions,
              physical health, relationships, and aspirations.
            </p>
            <a href="about.php" className="as_btn">
              read more
            </a>

            <div className="as_contact_expert">
              <span className="as_icon">
                {/* Your SVG icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <defs>
                    <style>{".cls-1{fill:#fff;fill-rule:evenodd}"}</style>
                  </defs>
                  <path
                    d="M19.797,10.487 C19.668,10.616 19.493,10.689 19.310,10.689 C18.929,10.689 18.620,10.380 18.620,9.999 C18.615,5.241 14.759,1.385 10.000,1.379 C9.619,1.379 9.310,1.070 9.310,0.689 C9.310,0.308 9.619,-0.000 10.000,-0.000 C15.520,0.006 19.993,4.478 19.999,9.999 C19.999,10.183 19.927,10.358 19.797,10.487 ZM15.172,9.999 C15.169,7.144 12.855,4.830 10.000,4.827 C9.619,4.827 9.310,4.518 9.310,4.138 C9.310,3.757 9.619,3.448 10.000,3.448 C13.617,3.452 16.547,6.383 16.551,9.999 C16.551,10.380 16.243,10.689 15.862,10.689 C15.481,10.689 15.172,10.380 15.172,9.999 ZM12.864,14.155 C13.076,14.182 13.288,14.109 13.438,13.957 L14.982,12.413 C15.209,12.186 15.563,12.146 15.835,12.317 L19.655,14.775 C19.955,14.965 20.063,15.350 19.905,15.668 L18.045,19.616 C17.918,19.873 17.645,20.024 17.360,19.995 C15.394,19.789 10.563,18.932 5.815,14.183 C1.067,9.435 0.210,4.604 0.003,2.638 C-0.026,2.352 0.125,2.079 0.382,1.952 L4.331,0.093 C4.649,-0.067 5.036,0.043 5.224,0.344 L7.684,4.164 C7.854,4.436 7.814,4.790 7.586,5.017 L6.042,6.560 C5.890,6.711 5.818,6.924 5.845,7.135 C5.942,7.900 6.373,9.809 8.282,11.718 C10.191,13.627 12.099,14.057 12.864,14.155 Z"
                    className="cls-1"
                  />
                </svg>
              </span>
              <div>
                <h5 className="as_white">Contact with us</h5>
                <h1 className="as_orange">+91 96708 17179</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
