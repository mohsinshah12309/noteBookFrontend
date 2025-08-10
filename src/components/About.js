import React from "react";

const About = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">About Notebook App</h1>
      <p className="lead text-center mb-5">
        Your secure, cloud-based solution for organizing notes and ideas
      </p>
      
      <div className="accordion accordion-flush" id="aboutAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="about-headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#about-collapseOne"
              aria-expanded="false"
              aria-controls="about-collapseOne"
            >
              <i className="bi bi-journal-bookmark me-2"></i> Our Mission
            </button>
          </h2>
          <div
            id="about-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="about-headingOne"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">
              <p>Notebook was created with the vision of providing a simple yet powerful tool for organizing your thoughts, ideas, and important information. Our mission is to help you:</p>
              <ul>
                <li>Capture ideas instantly from anywhere</li>
                <li>Organize notes with ease</li>
                <li>Access your information securely across devices</li>
                <li>Boost your productivity with minimal effort</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="about-headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#about-collapseTwo"
              aria-expanded="false"
              aria-controls="about-collapseTwo"
            >
              <i className="bi bi-shield-lock me-2"></i> Security Features
            </button>
          </h2>
          <div
            id="about-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="about-headingTwo"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">
              <p>Your data security is our top priority. Notebook implements:</p>
              <ul>
                <li>End-to-end encryption for all your notes</li>
                <li>Secure authentication with JWT tokens</li>
                <li>Regular security audits and updates</li>
                <li>Automatic backups to prevent data loss</li>
              </ul>
              <p className="mt-3"><strong>Note:</strong> Always remember to log out when using shared devices.</p>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="about-headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#about-collapseThree"
              aria-expanded="false"
              aria-controls="about-collapseThree"
            >
              <i className="bi bi-lightbulb me-2"></i> How to Use
            </button>
          </h2>
          <div
            id="about-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="about-headingThree"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">
              <h5>Getting Started</h5>
              <ol className="mb-3">
                <li>Create an account or log in</li>
                <li>Click "Add Note" to create your first note</li>
                <li>Organize notes with tags and categories</li>
              </ol>
              
              <h5>Advanced Features</h5>
              <ul>
                <li>Edit existing notes with one click</li>
                <li>Search through all your notes instantly</li>
                <li>Use markdown formatting for rich text notes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="about-headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#about-collapseFour"
              aria-expanded="false"
              aria-controls="about-collapseFour"
            >
              <i className="bi bi-question-circle me-2"></i> Frequently Asked Questions
            </button>
          </h2>
          <div
            id="about-collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="about-headingFour"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">
              <h5>Is there a mobile app available?</h5>
              <p>Currently, Notebook is web-only but fully responsive for mobile browsers. A native mobile app is coming soon!</p>
              
              <h5>Can I share notes with others?</h5>
              <p>Not yet, but we're working on secure note sharing features for future updates.</p>
              
              <h5>How much does it cost?</h5>
              <p>Notebook is completely free to use with all current features.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-5" >
        <div className="card-body text-center"style={{backgroundColor:"black", color:"white"}}>
          <h5 className="card-title">Have more questions?</h5>
          <p className="card-text">Contact our support team at support@notebookapp.com</p>
          <p className="text-muted small mt-3">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default About;