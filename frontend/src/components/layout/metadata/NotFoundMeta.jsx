import { Helmet } from "react-helmet-async";

const NotFoundMeta = () => (
  <Helmet>
    <title>404 – Page Not Found | ShopZone</title>
    <meta name="description" content="The page you are looking for does not exist." />
    <meta name="robots" content="noindex, nofollow" />
  </Helmet>
);

export default NotFoundMeta;
