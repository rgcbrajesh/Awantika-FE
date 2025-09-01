import React from 'react'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import Breadcrumb from '../../component/Breadcrumb';



const MemoriesSection = () => {
  const memories = [
    {
      img: "img/ourmemories/m1.jpg",
      date: "-- --, ----",
      title: "With Super Star",
      link: "blog_left_detail.html",
    },
    {
      img: "img/ourmemories/m2.jpg",
      date: "-- --, ----",
      title: "With Minister",
      link: "blog_left_detail.html",
    },
  ];

  return (
    <section className="as_blog_wrapper as_padderTop80 as_padderBottom80">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              {memories.map((item, index) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 col-12"
                  key={index}
                >
                  <div className="as_blog_box">
                    <div className="as_blog_img">
                      <a href={item.link}>
                        <img
                          src={item.img}
                          alt={item.title}
                          className="img-responsive"
                        />
                      </a>
                      <span className="as_btn">{item.date}</span>
                    </div>
                    <h4 className="as_subheading">
                      <a href={item.link}>{item.title}</a>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const Ouremories = () => {
  return (
    <>
      <Header />
      <Breadcrumb />
      <MemoriesSection />
      <Footer />
    </>
  )
}

export default Ouremories
