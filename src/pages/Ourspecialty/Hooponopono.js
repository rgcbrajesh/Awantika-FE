import React from 'react'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import Breadcrumb from '../../component/Breadcrumb'


const ServiceDetail = () => {
  return (
    <section className="as_servicedetail_wrapper as_padderBottom80 as_padderTop80">
      <div className="container">
        <div className="row">
          {/* Main content */}
          <div className="col-xxl-9 col-xl-9 col-lg-8 col-md-12">
            <div className="as_service_detail_inner">
              <img
                src="../img/Ho’oponopono.jpg"
                alt="Ho’oponopono"
                className="img-responsive"
              />

              <h4>What is Ho’oponopono Prayer ?</h4>
              <p className="as_font14">
                Ho’oponopono is an ancient Hawaiian practice for forgiveness and
                reconciliation. It’s more than the prayer alone; it’s a process
                of making things right in your relationships — with others,
                ancestors, deities, the earth, yourself.
                <br />
                The family ritual focuses on working through problems together,
                openly expressing feelings, and releasing each other. It’s the
                act and intention of holding a space for reflection, repentance,
                forgiveness, and gratitude.
                <br />
                Special words are exchanged, emotions are revealed, and
                forgiveness flows both ways. A ceremonial feast might follow,
                symbolizing the release.
                <br />
                The philosophy behind this practice is that we’re each
                responsible for what shows up in our reality. We own our
                feelings and our experiences. So even if someone else has
                wronged us, we’re the ones saying “I am sorry. Forgive me…”
                <br />
                The foundation of this practice is unity: an unbreakable bond
                connects you to everyone else, even though we seem so separate.
                <br />
                When errors are corrected externally, errors are corrected
                internally. When you “cleanse” your consciousness, you
                contribute to the cleansing of the “collective consciousness.”
                When you forgive others, you, too, are forgiven because…
              </p>

              <h4>As within, so without.</h4>
              <p className="as_font14">
                When you focus on healing the past, you help heal your life
                right here right now. When you right any wrongs in your
                thinking, you adjust and amend problems in the physical realm.
                <br />
                <b>As above, so below.</b>
                <br />
                The practice of Ho’oponopono helps you understand and heal the
                experiences in your life that you’ve “attracted” or participated
                in, or have been affected by.
                <br />
                While the Ho’oponopono Prayer is by no means a complete training
                in the Hawaiian practice, it can be profoundly healing for all
                you have gone through and are still trying to move through.
                <br />
                I recommend it!
                <br />
                It’s helped me identify underlying currents of resentment and
                self-loathing in my life (from childhood, school, and
                surrounding my brother’s suicide) so I can “give them up.” So I
                can be free, and move forward.
                <br />
                You’re allowed to move forward. Small rituals like this one can
                help.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-12">
            <div className="as_service_sidebar">
              <div className="as_service_widget as_padderBottom40">
                <img src="../img/pic1.jpg" style={{ width: "100%" }} alt="" />
                <br />
                <br />
                <br />
                <h3 className="as_heading">What is Ho’oponopono Prayer ?</h3>
                <p className="as_font14">
                  The ho’oponopono prayer is a Hawaiian practice of forgiveness
                  and reconciliation. The prayer is
                  <center>
                    "I’m sorry,
                    <br />
                    Please forgive me,
                    <br />
                    Thank you,
                    <br />
                    I love you".
                    <br />
                    <br />
                  </center>
                  You can chant this mantra while sitting with your eyes closed
                  as a type of meditation.
                </p>

                <h3 className="as_heading">
                  Ho’oponopono Prayer for Forgiveness, Healing and Making Things
                  Right.
                </h3>
                <p>
                  <b>
                    The Ho’oponopono prayer could be exactly what you’re looking
                    for in your
                    <br />
                    relationships — with others, with the earth, with yourself.
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};




const Hooponopono = () => {
  return (
    <>
      <Header />
      <Breadcrumb />
      <ServiceDetail />

      <Footer />
    </>
  )
}

export default Hooponopono
