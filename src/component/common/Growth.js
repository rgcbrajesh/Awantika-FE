const WhyChooseUs = () => {
  return (
    <section className="as_whychoose_wrapper as_padderTop80 as_padderBottom50">
      <div className="container">
        <div className="row as_verticle_center">
          <div className="col-lg-3 col-md-12">
            <h1 className="as_heading">Why Choose Us</h1>
            <p className="as_font14 as_margin0">
              Consectetur adipiscing elit, sed do eiusmod tempor incididuesdeentiut.
            </p>
          </div>

          <div className="col-lg-9 col-md-12">
            <div className="row">
              {[
                { value: 100, label: "Clients Overall World" },
                { value: 88, label: "Satisfied Clients" },
                { value: 64, label: "Clients Take HEALING" },
                { value: 200, label: "Reader Trained By Me" },
                { value: 4, label: "Year experience" },
                { value: 10, label: "Country" },
              ].map((item, index) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="as_whychoose_box text-center">
                    <span className="as_number">
                      <span>
                        <span>{item.value}</span>+
                      </span>
                      <img
                        src="assets/images/svg/shape.svg"
                        alt="shape"
                      />
                    </span>
                    <h4>{item.label}</h4>
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

export default WhyChooseUs;
