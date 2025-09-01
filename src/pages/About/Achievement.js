import React from 'react'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import Breadcrumb from '../../component/Breadcrumb'

const AchievementSection = () => {
  const blogs = [
    {
      img: "img/c1.jpg",
      date: "April 04, 2022",
      title: "Reiki Level 1",
      link: "blog_left_detail.html",
    },
    {
      img: "img/c2.jpg",
      date: "June 18, 2022",
      title: "Reiki Level 2",
      link: "blog_left_detail.html",
    },
    {
      img: "img/c3.jpg",
      date: "May 28, 2022",
      title: "Basics Tarot Master Program",
      link: "blog_left_detail.html",
    },
    {
      img: "img/c4.png",
      date: "-- --, ----",
      title: "Basics Tarot Master Program",
      link: "blog_left_detail.html",
    },
    {
      img: "img/c5.png",
      date: "May 19, 2023",
      title: "Basics Tarot Master Program",
      link: "blog_left_detail.html",
    },
  ];

  return (
    <section className="as_blog_wrapper as_padderTop80 as_padderBottom80">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              {blogs.map((blog, index) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 col-12"
                  key={index}
                >
                  <div className="as_blog_box">
                    <div className="as_blog_img">
                      <a href={blog.link}>
                        <img
                          src={blog.img}
                          alt={blog.title}
                          className="img-responsive"
                        />
                      </a>
                      <span className="as_btn">{blog.date}</span>
                    </div>
                    <h4 className="as_subheading">
                      <a href={blog.link}>{blog.title}</a>
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



const Achievement = () => {
  return (
    <>
      <Header />
      <Breadcrumb />
      <AchievementSection />

      <Footer />
    </>
  )
}

export default Achievement
