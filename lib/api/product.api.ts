import {client} from "@/lib/shopify";
import {CollectionMeta, FeaturedProduct, FilterType, Product} from "@/lib/definitions";

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

export const fetchCatalogueProducts = async (search: {
    brand?: string,
    color?: string,
    size?: string,
    category?: string
}): Promise<{
    products: FeaturedProduct[],
    filters: FilterType[]
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