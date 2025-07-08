import React from 'react';

export default function Terms() {
  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '4rem auto',
        padding: '2rem',
        fontFamily: 'sans-serif',
        lineHeight: '1.7',
        color: '#1f2937',
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Terms & Conditions
      </h1>

      <p>
        Welcome to Neat Affiliates. These Terms and Conditions govern your participation in the program. By registering
        as an affiliate, you agree to abide by these terms.
      </p>

      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '2rem' }}>1. Eligibility</h2>
      <p>
        You must be of legal age and operate in a jurisdiction that allows affiliate marketing to participate in the
        program.
      </p>

      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '2rem' }}>2. Commissions</h2>
      <p>
        Commissions are calculated monthly and depend on your performance. We reserve the right to review any irregular
        activity.
      </p>

      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '2rem' }}>3. Termination</h2>
      <p>
        We reserve the right to terminate accounts that violate our guidelines or legal regulations.
      </p>

      <p style={{ marginTop: '2rem' }}>
        Questions? Contact us at{' '}
        <a href="mailto:support@neataffiliates.com" style={{ color: '#2563eb' }}>
          support@neataffiliates.com
        </a>
        .
      </p>
    </div>
  );
}
