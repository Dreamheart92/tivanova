import {Collection, CollectionCard, FeaturedProduct, Filter, Product} from "@/lib/definitions";
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

export const fetchFeaturedProducts = async (): Promise<FeaturedProduct[]> => {
    const query = `
 query MyQuery {
  products(first: 4, query: "tag:featured") {
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
}`

    const {data} = await client.request(query);

    return data.products.nodes;
}

export const fetchProductById = async (productId: string): Promise<Product> => {
    const query = `
   query MyQuery {
  product(id: "gid://shopify/Product/${productId}") {
    id
    title
    descriptionHtml
    images(first: 4) {
        edges {
          node {
            url
          }
        }
      }
    priceRange {
      minVariantPrice {
        amount
      }
    }
    tags
    vendor
    variants(first: 6) {
      edges {
        node {
          id
          price {
          amount
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
}`

    const {data} = await client.request(query);

    return data.product;
}

export const fetchCatalogueProducts = async (search: {
    brand?: string,
    color?: string,
    size?: string,
    category?: string
}): Promise<{
    products: FeaturedProduct[],
    filters: Filter[]
}> => {
    const searchQuery = Object.values((search)).reduce((a: string[], b: string) => {
        b.split('|').forEach((query: string) => {
            a.push(JSON.parse(query));
        })

        return a;
    }, [])

    const filtersQuery = `query ($productFilters: [ProductFilter!]) {
  search(first: 250, productFilters: $productFilters, query: "") {
    productFilters {
      label
      type
      values {
        id
        input
        label
        count
      }
    }
  }
}`;

    const productsQuery =
        `query ($productFilters: [ProductFilter!]) {
      search(first: 20, productFilters: $productFilters, query: "", types: PRODUCT) {
        nodes {
          ... on Product {
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
    }`;

    const {data} = await client.request(productsQuery, {
        variables: {
            productFilters: searchQuery,
        }
    });

    const {data: filtersData} = await client.request(filtersQuery, {
        variables: {
            productFilters: searchQuery,
        }
    });

    return {
        products: data.search.nodes,
        filters: filtersData.search.productFilters,
    }
}

export const fetchLatestCollections = async (): Promise<CollectionCard[]> => {
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

export const fetchCollection = async (collectionId: string): Promise<Collection> => {
    const query = `
    query MyQuery {
  collection(id: "gid://shopify/Collection/${collectionId}") {
    title
    id
    description
    image {
        url
      }
    products(first: 20) {
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
}`;

    const {data} = await client.request(query);

    return data.collection;
}

export const fetchCollectionImage = async (title: string) => {
    const query = `
   query MyQuery {
  articles(first: 10, query: "${title.toLowerCase()}") {
    nodes {
      image {
        url
      }
      title
    }
  }
}`;

    const {data} = await client.request(query);
    return data.articles.nodes[0].image.url;
}

export const fetchRelatedProducts = async (tags: string[], productId: string) => {
    const {data} = await client.request(` query SearchProducts($tags: String!) {
      search(query: $tags, first: 5, types: PRODUCT) {
        nodes {
          ... on Product {
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
            tags
            priceRange {
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }`, {
        variables: {
            tags: tags.map((tag) => `tag:${tag}`).join(' OR '),
        }
    })

    return data.search.nodes.filter((product: FeaturedProduct) => product.id !== productId);
}