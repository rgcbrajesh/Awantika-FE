import { Link } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <section className="as_breadcrum_wrapper">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h1>About us</h1>
            <ul className="breadcrumb">
              <li>
                <Link ot="">Home</Link>
              </li>
              <li>About Us</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
