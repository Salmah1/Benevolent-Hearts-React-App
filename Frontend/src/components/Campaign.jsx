function Campaign() {
  return (
    // Community impact section displayed on the home page
    <section id="campaigns" className="py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-8 mx-auto text-center">
            <h6
              style={{
                color: "#0d6efd",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              COMMUNITY IMPACT
            </h6>

            <h1 className="fw-bold">Making A Difference Together</h1>

            <p className="text-muted">
              Through donations, volunteering and community support, we help
              create positive change and provide assistance to those who need it
              most.
            </p>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="campaign">
              <img src="/img/hero-4.jpg" alt="Donation collection" />

              <div className="overlay">
                <div>
                  <h4 className="text-white">Fundraising Events</h4>

                  <p className="text-white mb-0">
                    We organise fundraising initiatives throughout the year to
                    support local projects and charitable causes. Every event
                    helps raise awareness and generate resources for those in
                    need.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="campaign">
              <img src="/img/hero-5.jpg" alt="Community support" />

              <div className="overlay">
                <div>
                  <h4 className="text-white">Volunteer Programme</h4>

                  <p className="text-white mb-0">
                    Our volunteers are at the heart of everything we do. From
                    supporting events to helping local communities, they
                    dedicate their time and skills to making a meaningful
                    difference.
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

export default Campaign;
