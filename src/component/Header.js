import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <section className="as_header_wrapper">
      <div className="as_logo" style={{ padding: 0, margin: 0 }}>
        <Link to="/" style={{ padding: 0, margin: 0 }}>
          <img src="/img/logo.png" alt="Logo" style={{ height: "150px" }} />
        </Link>
      </div>

      <div className="as_header_detail">
        <div className="as_info_detail">
          <ul>
            <li>
              <div className="as_infobox">
                <span className="as_infoicon">
                  <img src="/assets/images/svg/headphone.svg" alt="" />
                </span>
                <span className="as_orange">Talk to Us -</span> +91 96708 17179
              </div>
            </li>
            <li>
              <div className="as_infobox">
                <span className="as_infoicon">
                  <img src="/assets/images/svg/mail1.svg" alt="" />
                </span>
                <span className="as_orange">Connect with Us -</span>
                support@aawantikaa.com
              </div>
            </li>
        
          </ul>
          <Link to="/login">
            <p className="mt-4 float-left">login</p>
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="as_menu_wrapper">
          <span className="as_toggle bg_overlay">
            <img src="/assets/images/svg/menu.svg" alt="" />
          </span>

          <div className="as_menu">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link>About</Link>
                <ul className="as_submenu">
                  <li>
                    <Link to="/about">Know Us</Link>
                  </li>
                  <li>
                    <Link to="/achievement">Achievement</Link>
                  </li>
                  <li>
                    <Link to="/ouremories">Our Memories</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link>Services</Link>
                <ul className="as_submenu">
                  <li>
                    <Link to="/lifeCoaching">Life Coaching</Link>
                  </li>
                  <li>
                    <Link to="/hooponopono">Ho'oponopono</Link>
                  </li>
                  <li>
                    <Link to="/lamaferaYogmaya">
                      Lamafera and Yogmaya
                    </Link>
                  </li>
                  <li>
                    <Link to="/twinFlame">Twin Flame</Link>
                  </li>
                </ul>
              </li>
              {/* <li>
                <span>Blog</span>
                <ul className="as_submenu">
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <span>Blog Single</span>
                    <ul className="as_submenu">
                      <li>
                        <Link to="/blog/left">Left Sidebar</Link>
                      </li>
                      <li>
                        <Link to="/blog/right">Right Sidebar</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li> */}
              <li>
                <Link to="/appointment">Appointment</Link>
              </li>
              <li>
                <Link to="/feedback">Feedback</Link>
              </li>
              {/* <li>
                <span>Shop</span>
                <ul className="as_submenu">
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
                  <li>
                    <Link to="/shop/single">Shop Single</Link>
                  </li>
                  <li>
                    <Link to="/cart">Cart</Link>
                  </li>
                  <li>
                    <Link to="/checkout">Checkout</Link>
                  </li>
                </ul>
              </li> */}
              {/* <li>
                <span>Pages</span>
                <ul className="as_submenu">
                  <li>
                    <Link to="/astrologer">Astrologer</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/404">404</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>
                </ul>
              </li> */}
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Search Box */}
          {/* <div className="as_search_wrapper">
            <img src="/assets/images/search.png" alt="" className="as_search" />
          </div> */}
        </div>
      </div>
    </section>
  );
}
