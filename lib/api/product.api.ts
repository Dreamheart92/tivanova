import {client} from "@/lib/shopify";
import {CollectionMeta, FeaturedProduct} from "@/lib/definitions";

export const fetchLatestProducts = async (): Promise<FeaturedProduct[]> => {
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

export const fetchLatestCollections = async (): Promise<CollectionMeta[]> => {
    const query = `
    query MyQuery {
  collections(first: 3) {
    nodes {
      title
      id
      image {
        url
      }
    }
  }
}`;

    const {data} = await client.request(query);

    return data.collections.nodes;
}