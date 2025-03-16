import "../../styles/About.css";

export default function About() {
  const features = [
    { title: "Easy Agreement Creation", description: "Generate rental agreements digitally with legal compliance.", color: "#ffadad" },
    { title: "Secure Payments", description: "Safe and verified payment processing between parties.", color: "#ffd6a5" },
    { title: "Identity Verification", description: "Ensures both tenant and landlord are authenticated.", color: "#fdffb6" },
    { title: "Credit/Debit History Checks", description: "Provides financial insights to prevent fraud.", color: "#caffbf" },
    { title: "Dispute Resolution System", description: "AI-driven chatbot guides users in legal matters.", color: "#9bf6ff" },
    { title: "Smart Contract Summarization", description: "Highlights important clauses for better understanding.", color: "#a0c4ff" },
    { title: "Subscription Services", description: "Premium legal support and property management plans for landlords.", color: "#bdb2ff" },
    { title: "Real Estate & Legal Firm Collaborations", description: "Standardized agreements and revenue generation through partnerships.", color: "#ffc6ff" },
  ];

  return (
    <div className="about-container">
      <h1 className="about-title">🏠 About Our Platform</h1>
      <p className="about-description">
        Our platform simplifies the process of creating legally valid rent agreements, making secure payments, verifying identities, and resolving disputes efficiently. We ensure transparency and security for both landlords and tenants.
      </p>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-box" style={{ backgroundColor: feature.color }}>
            <h2 className="feature-title">{feature.title}</h2>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
