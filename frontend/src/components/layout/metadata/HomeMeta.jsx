import { Helmet } from "react-helmet-async";

const HomeMeta = () => (
  <Helmet>
    <title>ShopZone – Best Deals on Electronics, Fashion & More</title>
    <meta
      name="description"
      content="Shop the latest trends in electronics, fashion, home & garden at ShopZone. Unbeatable prices, fast shipping, and hassle-free returns."
    />
    <meta name="keywords" content="online shop, electronics, fashion, deals, ecommerce" />
    <meta property="og:title" content="ShopZone – Best Deals on Electronics, Fashion & More" />
    <meta
      property="og:description"
      content="Shop the latest trends in electronics, fashion, home & garden at ShopZone."
    />
    <meta property="og:type" content="website" />
    <link rel="canonical" href="/" />
  </Helmet>
);

export default HomeMeta;
