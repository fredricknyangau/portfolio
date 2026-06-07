import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  url?: string;
}

export default function SEO({
  title = "Junior Backend Engineer | FastAPI, PostgreSQL, Python | Nairobi",
  description = "Junior Backend Engineer building production-ready FastAPI and PostgreSQL systems. Specializing in API development for Fintech and Agritech in Nairobi, Kenya.",
  type = "website",
  url = "https://fredricknyangau.vercel.app/",
}: SEOProps) {
  const imageUrl = "https://fredricknyangau.vercel.app/images/og-cover.png";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Fredrick Nyang'au",
    jobTitle: "Junior Backend Engineer",
    url: "https://fredricknyangau.vercel.app/",
    sameAs: [
      "https://github.com/fredricknyangau",
      "https://linkedin.com/in/fredricknyangau"
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "Kenya"
    },
    knowsAbout: [
      "FastAPI",
      "PostgreSQL",
      "Python",
      "Docker",
      "Backend API Development"
    ]
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD Structured Data */}
      {type === "website" && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
