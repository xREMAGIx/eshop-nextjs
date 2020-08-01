import axios from "axios";
import slugtify from "../src/store/slugtify";

const MY_URL = "https://eshop-nextjs.xremagix.vercel.app";
const backendUrl = "https://nextjs-eshop-backend.herokuapp.com";

const createSitemap = (products) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${MY_URL}/</loc>
        </url>
        <url>
            <loc>${MY_URL}/products</loc>
        </url>
        <url>
            <loc>${MY_URL}/categories</loc>
        </url>
        <url>
            <loc>${MY_URL}/brands</loc>
        </url>
        
        ${
          products &&
          products
            .map((product) => {
              return `
                    <url>
                        <loc>${`${MY_URL}/products/${product.id}`}</loc>
                    </url>
                `;
            })
            .join("")
        }
    </urlset>
    `;

const Sitemap = () => {};

Sitemap.getInitialProps = async ({ res }) => {
  var products;
  await axios
    .get(`${backendUrl}/api/products`)
    .then((response) => (products = response.data.data));

  res.setHeader("Content-Type", "text/xml");
  res.write(createSitemap(products));
  res.end();
};

export default Sitemap;
