const Testimonial = () => {
  return (
    <section className="as_customer_wrapper as_padderBottom80 as_padderTop80">
      <div className="container">
        <div className="row">
          {/* Heading */}
          <div className="col-lg-12 text-center">
            <h1 className="as_heading as_heading_center">What Our Customers Say</h1>
            <p className="as_font14 as_margin0 as_padderBottom50">
              MOST VALUABLE FEEDBACK Of Our CLIENT
            </p>
          </div>

          {/* Feedback Slider */}
          <div className="row as_customer_slider">
            <div className="col-lg-6 col-md-6">
              <div className="as_customer_box text-center">
                <span className="as_customer_img">
                  <img src="img/boys.png" alt="Anmol Kaur" style={{ height: "100px" }} />
                  <span>
                    <img src="assets/images/svg/quote1.svg" alt="quote" />
                  </span>
                </span>
                <p className="as_margin0">
                  Awantika dii, I just want to say thankyou so much for your love and support. I am currently having healing from Awantika dii. I met her in 2023 for a reading and I came back to her in 2024 for healing. I just love her energy and aura. She is really supportive and blunt with her reading and words. I just want to say healing was the right decision for me and I am glad that I am taking healing from the right person.
                </p>
                <h3>Anmol Kaur</h3>
                {/* <p className="as_margin0">Astrologer</p> */}
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="as_customer_box text-center">
                <span className="as_customer_img">
                  <img src="img/boys.png" alt="Anmol Kaur" style={{ height: "100px" }} />
                  <span>
                    <img src="assets/images/svg/quote1.svg" alt="quote" />
                  </span>
                </span>
                <p className="as_margin0">
                  Awantika dii, I just want to say thankyou so much for your love and support. I am currently having healing from Awantika dii. I met her in 2023 for a reading and I came back to her in 2024 for healing. I just love her energy and aura. She is really supportive and blunt with her reading and words. I just want to say healing was the right decision for me and I am glad that I am taking healing from the right person.
                </p>
                <h3>Anmol Kaur</h3>
                {/* <p className="as_margin0">Astrologer</p> */}
              </div>
            </div>
          </div>


          
        </div>

        {/* Button */}
        <div className="text-center mt-4">
          <a href="feedback.php" className="as_btn">
            Read All Feedback
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
