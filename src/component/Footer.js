import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <section className="as_footer_wrapper as_padderTop80">
        <div className="container">
          {/* Newsletter */}
          <div className="as_newsletter_wrapper as_padderBottom60">
            <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                <h1 className="as_heading">Our Newsletter</h1>
                <p>Get Your Daily Update</p>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
                <div className="as_newsletter_box">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your Email Here..."
                  />
                  <button className="as_btn">Subscribe Now</button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Main */}
          <div className="as_footer_inner as_padderTop50 as_padderBottom80">
            <div className="row">
              {/* Logo */}
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="as_footer_widget">
                  <div className="as_footer_logo">
                    <Link to="/">
                      <img src="img/logo.png" alt="Logo" style={{ height: "100%" }} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="as_footer_widget">
                  <h3 className="as_footer_heading">Aawantikaa Singh</h3>
                  <p>
                    Welcome to the transformative journey of holistic coaching,
                    where mind, body, and spirit converge to create lasting
                    change and holistic well-being. I am Aawantikaa, your
                    dedicated holistic coach, here to guide you on a path of
                    self-discovery, empowerment, and holistic transformation.
                  </p>

                  <div className="as_share_box">
                    <p>Follow Us</p>
                    <ul>
                      <li>
                        <Link to="#">
                          <img src="assets/images/svg/facebook.svg" alt="Facebook" />
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <img src="assets/images/svg/twitter.svg" alt="Twitter" />
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <img src="assets/images/svg/google.svg" alt="Google" />
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <img src="assets/images/svg/youtube.svg" alt="YouTube" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="as_footer_widget">
                  <h3 className="as_footer_heading">Our Services</h3>
                  <ul>
                    <li>
                      <Link to="/service/horoscopes">Horoscopes</Link>
                    </li>
                    <li>
                      <Link to="/service/gemstones">Gemstones</Link>
                    </li>
                    <li>
                      <Link to="/service/numerology">Numerology</Link>
                    </li>
                    <li>
                      <Link to="/service/tarot-cards">Tarot Cards</Link>
                    </li>
                    <li>
                      <Link to="/service/birth-journal">Birth Journal</Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact */}
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <div className="as_footer_widget">
                  <h3 className="as_footer_heading">Contact Us</h3>
                  <ul className="as_contact_list">
                    <li>
                      <img src="assets/images/svg/map.svg" alt="Map" />
                      <p>India</p>
                    </li>
                    <li>
                      <img src="assets/images/svg/address.svg" alt="Email" />
                      <p>
                        <Link to="mailto:support@aawantikaa.com">support@aawantikaa.com</Link>
                        <br />
                        <Link to="mailto:info@aawantikaa.com">info@aawantikaa.com</Link>
                      </p>
                    </li>
                    <li>
                      <img src="assets/images/svg/call.svg" alt="Phone" />
                      <p>
                        <Link to="tel:+919670817179">+91 96708 17179</Link>
                        <br />
                        <Link to="tel:+919670817179">+91 96708 17179</Link>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <section className="as_copyright_wrapper text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p>Copyright &copy; 2022 AAWANTIKAA. All Right Reserved.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
