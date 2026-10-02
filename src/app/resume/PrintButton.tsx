"use client";

export default function PrintButton() {
  return (
    <button type="button" className="hero-cta hero-cta-primary" onClick={() => window.print()}>
      <span>Print, or save as PDF</span>
      <span className="hero-cta-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3v8M4.5 7.5 8 11l3.5-3.5M3 13h10" />
        </svg>
      </span>
    </button>
  );
}
