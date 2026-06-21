function WhyUs() {
  return (
    <section className="row w-100 py-0 bg-light" id="features">
      <div className="col-lg-6 col-img"></div>

      <div className="col-lg-6 py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <h6
                style={{
                  color: "#0d6efd",
                  fontWeight: 600,
                  letterSpacing: "1px",
                }}
              >
                WHY CHOOSE US
              </h6>

              <h2 className="fw-bold">
                Making It Easy To Support Your Community
              </h2>

              <p className="text-muted">
                Benevolent Hearts connects donors, volunteers and supporters
                with meaningful opportunities to help others. Our goal is to
                make giving back simple, accessible and impactful.
              </p>

              {/* Trusted & Transparent */}
              <div className="feature d-flex mt-5">
                <div className="iconbox me-3">
                  <i className="bx bx-check-shield"></i>
                </div>

                <div>
                  <h5>Trusted & Transparent</h5>

                  <p>
                    We work with trusted partners and ensure donations,
                    fundraising efforts and community support reach the people
                    who need them most.
                  </p>
                </div>
              </div>

              {/* Simple & Convenient */}
              <div className="feature d-flex mt-4">
                <div className="iconbox me-3">
                  <i className="bx bxs-like"></i>
                </div>

                <div>
                  <h5>Simple & Convenient</h5>

                  <p>
                    Whether you're donating items, shopping for a cause or
                    volunteering your time, our platform makes getting involved
                    quick and straightforward.
                  </p>
                </div>
              </div>

              {/* Community Focused */}
              <div className="feature d-flex mt-4">
                <div className="iconbox me-3">
                  <i className="bx bx-group"></i>
                </div>

                <div>
                  <h5>Community Focused</h5>

                  <p>
                    We believe lasting change happens through community action.
                    Every contribution helps strengthen support networks and
                    improve lives.
                  </p>
                </div>
              </div>

              {/* Sustainable Impact */}
              <div className="feature d-flex mt-4">
                <div className="iconbox me-3">
                  <i className="bx bxs-leaf"></i>
                </div>

                <div>
                  <h5>Sustainable Impact</h5>

                  <p>
                    By reusing unwanted items and supporting local initiatives,
                    we help reduce waste while creating positive social impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
