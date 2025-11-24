import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, orderBy, query } from "firebase/firestore";
import { writeFileSync } from "fs";
import { resolve } from "path";

const firebaseConfig = {
  apiKey: "AIzaSyAVcRV9gCLt7pL814GNLMKtp_KEAdJfkYY",
  authDomain: "blog-47657.firebaseapp.com",
  projectId: "blog-47657",
  storageBucket: "blog-47657.firebasestorage.app",
  messagingSenderId: "198889981638",
  appId: "1:198889981638:web:bdb34095fb356f5b29f9c7",
  measurementId: "G-GRDJMTJLB9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const generateSitemap = async () => {
  const baseUrl = "https://devjuniortech.blog";

  const staticPages = [
    { url: "/", changefreq: "daily", priority: "1.0" },
    { url: "/about", changefreq: "monthly", priority: "0.8" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
    <url>
      <loc>${baseUrl}${page.url}</loc>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `
    )
    .join("")}
  ${await generatePostUrls(baseUrl)}
</urlset>`;

  const sitemapPath = resolve(process.cwd(), "public", "sitemap.xml");
  writeFileSync(sitemapPath, sitemap);
  process.exit(0);
};

const generatePostUrls = async (baseUrl) => {
  const postsCollection = collection(db, "posts");
  const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(postsQuery);

  return querySnapshot.docs
    .map((doc) => {
      const post = doc.data();
      const lastmod = post.createdAt?.toDate()?.toISOString() || new Date().toISOString();
      return `
    <url>
      <loc>${baseUrl}/posts/${doc.id}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
  `;
    })
    .join("");
};

generateSitemap().catch((error) => {
  console.error(error);
  process.exit(1);
});