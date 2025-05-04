import React from "react";
import { Helmet } from "react-helmet";
import profile from "../assets/images/profile.jpg";

const SEO = ({
  title = "Fredrick Nyang'au - Portfolio",
  description = "Professional portfolio showcasing my work and skills",
  image = profile,
  url = "https://fredricknyangau.vercel.app/",
  type = "website",
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Your Name",
          url: url,
          description: description,
          image: image,
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
