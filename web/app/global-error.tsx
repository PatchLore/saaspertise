"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "1rem",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "#18181b",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.875rem",
              color: "#71717a",
            }}
          >
            We encountered an error. Please try again or return to the homepage.
          </p>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
            <button
              onClick={reset}
              style={{
                padding: "0.5rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                borderRadius: "9999px",
                backgroundColor: "#4f46e5",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                padding: "0.5rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                borderRadius: "9999px",
                border: "1px solid #d4d4d8",
                color: "#18181b",
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
