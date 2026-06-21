function Services() {
  return (
    <section id="services" className="py-5">
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
              SERVICES
            </h6>

            <h2 className="fw-bold">How You Can Get Involved</h2>

            <p className="text-muted">
              There are many ways to support our mission, from donating items
              and shopping for a cause to volunteering and helping local
              communities.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {/* Donation Collection */}
          <div className="col-lg-6">
            <div className="service card-effect h-100">
              <img src="/img/hero-2.jpg" alt="Donation collection" />

              <div className="iconbox">
                <i className="bx bxs-donate-heart"></i>
              </div>

              <h5 className="mt-4 mb-2">Donation Collection</h5>

              <p>
                Schedule a collection and we'll pick up reusable clothing,
                furniture and household items directly from your address,
                helping them reach people who need them most.
              </p>
            </div>
          </div>

          {/* Shop Products */}
          <div className="col-lg-6">
            <div className="service card-effect h-100">
              <img src="/img/hero-3.jpg" alt="Charity products" />

              <div className="iconbox">
                <i className="bx bxs-package"></i>
              </div>

              <h5 className="mt-4 mb-2">Shop Products</h5>

              <p>
                Browse products created and supplied to support our charitable
                work. Every purchase helps fund community projects and support
                services.
              </p>
            </div>
          </div>

          {/* Volunteer Opportunities */}
          <div className="col-lg-6">
            <div className="service card-effect h-100">
              <img src="/img/hero-7.jpg" alt="Volunteer opportunities" />

              <div className="iconbox">
                <i className="bx bxs-group"></i>
              </div>

              <h5 className="mt-4 mb-2">Volunteer Opportunities</h5>

              <p>
                Join our volunteers and make a difference in your community by
                supporting events, collections, campaigns and outreach
                activities.
              </p>
            </div>
          </div>

          {/* Community Campaigns */}
          <div className="col-lg-6">
            <div className="service card-effect h-100">
              <img src="/img/hero-8.jpg" alt="Volunteer opportunities" />

              <div className="iconbox">
                <i className="bx bx-world"></i>
              </div>

              <h5 className="mt-4 mb-2">Community Campaigns</h5>

              <p>
                Support awareness campaigns and fundraising initiatives that
                help improve lives, tackle hardship and strengthen local
                communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
