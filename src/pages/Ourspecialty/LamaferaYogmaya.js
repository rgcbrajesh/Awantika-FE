import React from 'react'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import Breadcrumb from '../../component/Breadcrumb'



const ServiceDetail = () => {
  return (
    <section className="as_servicedetail_wrapper as_padderBottom80 as_padderTop80">
      <div className="container">
        <div className="row">
          {/* Left column */}
          <div className="col-xxl-9 col-xl-9 col-lg-8 col-md-12">
            <div className="as_service_detail_inner">
              <img
                src="../img/Yogmaya.jpg"
                alt="Yogmaya Healing"
                className="img-responsive"
              />
              {/* Uncomment and use these if you want headings or descriptions here */}
              {/* <h1 className="as_heading">Yogmaya Healing</h1> */}
              {/* <p className="as_font14">Your description here</p> */}
            </div>
          </div>

          {/* Right column (sidebar) */}
          <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-12">
            <div className="as_service_sidebar">
              <div className="as_service_widget as_padderBottom40">
                <br />
                <br />
                <h3 className="as_heading">Yogmaya Healing</h3>
                <p className="as_font14">
                  Yogmaya is a combination of all deities and guru’s energy or
                  can say 84 crores of brain cells or universal (9 planets and 5
                  elements energy). According to mythology yogmaya called
                  “Devi”. It’s a very simple meditation process to heal past
                  karmas or get freedom from karmas, sorrows and diseases. It is
                  high frequency gaining process to gain success in spiritualism
                  and astral science powers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LamaferaYogmaya = () => {
  return (
    <>
      <Header />
      <Breadcrumb />
      <ServiceDetail />
      <Footer />
    </>
  )
}

export default LamaferaYogmaya
