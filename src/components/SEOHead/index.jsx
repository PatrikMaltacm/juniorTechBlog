import PropTypes from "prop-types";

function SEOHead({ title, description, image, url }) {
  const defaultDescription = "O seu blog de tecnologia para desenvolvedores júnior.";
  const defaultTitle = "DraftDev";
  const siteName = "DraftDev";
  const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const fullDescription = description || defaultDescription;
  const fullUrl = url ? `https://devjuniortech.blog${url}` : "https://devjuniortech.blog";
  const imageUrl = image || "https://devjuniortech.blog/logo.png"; // Assumindo que você tenha um logo

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:image" content={imageUrl} />

      <link rel="canonical" href={fullUrl} />
    </>
  );
}

SEOHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};

export default SEOHead;
