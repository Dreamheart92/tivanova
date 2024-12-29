import {client} from "@/lib/shopify";

export const fetchLatestProducts = async () => {
    const query = `
 query MyQuery {
  products(first: 4, sortKey: CREATED_AT, reverse: true) {
      nodes {
        id
        images(first: 2) {
          edges {
            node {
              url
            }
          }
        }
        title
        vendor
        priceRange {
          minVariantPrice {
            amount
          }
        }
    }
  }
}
`;

    const {data} = await client.request(query);

    return data.products.nodes;
}