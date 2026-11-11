import { useEffect } from 'react';

const SITE_URL = 'https://pm-shri-girls-school-khujner.onrender.com';
const DEFAULT_TITLE = 'PM SHRI Govt. Girls HSS, Khujner | मध्य प्रदेश';
const DEFAULT_DESCRIPTION = 'Official Portal of PM SHRI Government Girls Higher Secondary School, Khujner (M.P.). Digital E-Library, Faculty, Announcements & Admissions.';
const DEFAULT_IMAGE = `${SITE_URL}/images/school-building.jpg`;

export default function SEO({
  title,
  description,
  keywords,
  image,
  canonicalPath = ''
}) {
  useEffect(() => {
    // 1. Dynamic Document Title
    const fullTitle = title 
      ? (title.includes('PM SHRI') ? title : `${title} | PM SHRI Khujner`)
      : DEFAULT_TITLE;
    document.title = fullTitle;

    // 2. Meta Description
    const metaDescContent = description || DEFAULT_DESCRIPTION;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', metaDescContent);

    // 3. Meta Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // 4. Canonical URL
    const canonicalUrl = `${SITE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 5. Open Graph Meta Tags
    const ogImageContent = image 
      ? (image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`)
      : DEFAULT_IMAGE;

    const ogTags = [
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: metaDescContent },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: ogImageContent }
    ];

    ogTags.forEach(({ property, content }) => {
      let ogEl = document.querySelector(`meta[property="${property}"]`);
      if (!ogEl) {
        ogEl = document.createElement('meta');
        ogEl.setAttribute('property', property);
        document.head.appendChild(ogEl);
      }
      ogEl.setAttribute('content', content);
    });

    let twitterImg = document.querySelector('meta[name="twitter:image"]');
    if (twitterImg) {
      twitterImg.setAttribute('content', ogImageContent);
    }
  }, [title, description, keywords, image, canonicalPath]);

  return null;
}
