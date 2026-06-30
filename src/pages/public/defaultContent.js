const brand = "Confaero";
const product = "EventSphere Dashboard";
const website = "https://confaero.com";
const supportEmail = "support@confaero.com";
const developerEmail = "reazul.dev@gmail.com";

export const PUBLIC_CONTENT_DEFAULTS = {
  ABOUT_US: {
    title: "About Us",
    description: `Learn more about ${brand} and the ${product} platform.`,
    html: `
      <h2>About ${brand}</h2>
      <p>${brand} is an event management platform built to help organizers run conferences, symposiums, and professional gatherings with confidence. From registration and agenda planning to reviewer workflows, exhibitor management, and attendee communications, ${brand} brings every part of your event into one connected system.</p>
      <h3>${product}</h3>
      <p>${product} is the admin and organizer control panel for ${brand}. Organizers manage their assigned events—registrations, agenda, reviewers, sponsors, resources, and announcements. Platform administrators oversee all events, global user management, and cross-event analytics from a single interface.</p>
      <h3>Our mission</h3>
      <p>We believe event teams should spend less time juggling tools and more time delivering meaningful experiences. ${brand} is designed to be reliable, secure, and easy to use for both first-time organizers and large-scale conference operators.</p>
      <h3>Contact</h3>
      <p>Visit <a href="${website}" target="_blank" rel="noopener noreferrer">${website}</a>, email <a href="mailto:${supportEmail}">${supportEmail}</a>, or contact the developer at <a href="mailto:${developerEmail}">${developerEmail}</a>.</p>
    `,
  },
  PRIVACY_POLICY: {
    title: "Privacy Policy",
    description: `How ${brand} collects, uses, and protects your information.`,
    html: `
      <p><strong>Last updated:</strong> June 30, 2026</p>
      <p>This Privacy Policy explains how ${brand} ("we", "us", or "our") collects, uses, and safeguards information when you use ${product} and related ${brand} services.</p>
      <h3>Information we collect</h3>
      <ul>
        <li><strong>Account information:</strong> name, email address, role, and login credentials.</li>
        <li><strong>Event data:</strong> registrations, submissions, messages, files, and other content you manage through the platform.</li>
        <li><strong>Usage data:</strong> log data, device information, and interactions with the dashboard for security and performance.</li>
      </ul>
      <h3>How we use information</h3>
      <ul>
        <li>To provide, operate, and improve ${brand} services.</li>
        <li>To authenticate users and enforce role-based access.</li>
        <li>To communicate service updates, security notices, and support responses.</li>
        <li>To comply with legal obligations and protect against fraud or abuse.</li>
      </ul>
      <h3>Data sharing</h3>
      <p>We do not sell your personal information. We may share data with trusted service providers who help us host, secure, and deliver the platform, subject to confidentiality obligations.</p>
      <h3>Data retention</h3>
      <p>We retain information for as long as your account is active or as needed to provide services, comply with law, resolve disputes, and enforce agreements.</p>
      <h3>Your rights</h3>
      <p>Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal data. Contact <a href="mailto:${supportEmail}">${supportEmail}</a> to submit a request.</p>
      <h3>Security</h3>
      <p>We use industry-standard safeguards, including encrypted connections and access controls, to protect your information.</p>
      <h3>Contact</h3>
      <p>Questions about this policy? Email <a href="mailto:${supportEmail}">${supportEmail}</a> or <a href="mailto:${developerEmail}">${developerEmail}</a>.</p>
    `,
  },
  TERMS_CONDITION: {
    title: "Terms of Service",
    description: `Terms and conditions for using ${brand} and ${product}.`,
    html: `
      <p><strong>Last updated:</strong> June 30, 2026</p>
      <p>These Terms of Service ("Terms") govern your access to and use of ${product} and the ${brand} platform.</p>
      <h3>Acceptance of terms</h3>
      <p>By creating an account or using our services, you agree to these Terms and our Privacy Policy.</p>
      <h3>Eligibility and accounts</h3>
      <p>You must provide accurate account information and keep your credentials secure. You are responsible for activity under your account.</p>
      <h3>Platform use</h3>
      <ul>
        <li>Use the platform only for lawful event management purposes.</li>
        <li>Do not attempt to access data or areas you are not authorized to use.</li>
        <li>Do not upload malicious code, spam, or content that infringes third-party rights.</li>
      </ul>
      <h3>Organizer and admin responsibilities</h3>
      <p>Organizers and administrators are responsible for the accuracy of event content, attendee communications, and compliance with applicable laws for their events.</p>
      <h3>Intellectual property</h3>
      <p>${brand} and ${product} names, branding, and software are owned by ${brand}. You retain ownership of content you submit, and grant us a limited license to host and display it as needed to operate the service.</p>
      <h3>Service availability</h3>
      <p>We strive for reliable uptime but do not guarantee uninterrupted access. We may modify, suspend, or discontinue features with reasonable notice when possible.</p>
      <h3>Limitation of liability</h3>
      <p>To the fullest extent permitted by law, ${brand} is not liable for indirect, incidental, or consequential damages arising from use of the platform.</p>
      <h3>Termination</h3>
      <p>We may suspend or terminate access for violations of these Terms. You may stop using the service at any time.</p>
      <h3>Contact</h3>
      <p>For questions about these Terms, contact <a href="mailto:${supportEmail}">${supportEmail}</a> or <a href="mailto:${developerEmail}">${developerEmail}</a>.</p>
    `,
  },
  DELETE_ACCOUNT: {
    title: "Delete Account",
    description: `How to delete your ${brand} account from the mobile app.`,
    html: `
      <p>Open the Confaero app, go to <strong>Settings</strong>, and tap <strong>Delete Account</strong>. Enter your password to confirm removal.</p>
      <p>Need help? Contact <a href="mailto:${supportEmail}">${supportEmail}</a> or <a href="mailto:${developerEmail}">${developerEmail}</a>.</p>
    `,
  },
};
