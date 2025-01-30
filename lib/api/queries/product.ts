import {featuredProductFragment, productFragment} from "@/lib/api/fragments/product";
import {QUERY} from "@/lib/constants/query";

export const fetchProductByIdQuery = `
                query FetchProductById($productId: ID!) @inContext(country: ${QUERY.COUNTRY_ISO_REPLACEMENT_KEY}) {
                     product(id: $productId) {
                           ...product
                     }
                    }
                       ${productFragment}
`

export const fetchLatestProductsQuery = `
 query MyQuery @inContext(country: ${QUERY.COUNTRY_ISO_REPLACEMENT_KEY}){
  products(first: 8, sortKey: CREATED_AT, reverse: true) {
   nodes {
    ...featuredProduct
   }
  }
}
${featuredProductFragment}
`

export const fetchLatestCollectionsQuery = `
    query MyQuery {
  collections(first: ${QUERY.FIRST_LIMIT_KEY}) {
    nodes {
      title
      id
      description
          metafield(key: "backdropimage", namespace: "custom") {
      reference {
        ... on MediaImage {
          id
          previewImage {
            url
          }
        }
      }
    }
      image {
        url
      }
    }
  }
  }
`

export const fetchFeaturedProductsQuery = `
 query MyQuery @inContext(country: ${QUERY.COUNTRY_ISO_REPLACEMENT_KEY}) {
  products(first: 8, query: "tag:featured") {
    nodes {
        ...featuredProduct
    }
  }
}
${featuredProductFragment}
`

export const catalogueProductsQuery =
    `query ($productFilters: [ProductFilter!]) @inContext(country: ${QUERY.COUNTRY_ISO_REPLACEMENT_KEY}) {
      search(first: 20, productFilters: $productFilters, query: "", types: PRODUCT) {
        nodes {
          ...featuredProduct
        }
      }
    }
       ${featuredProductFragment}
    `;

export const filtersQuery = `query ($productFilters: [ProductFilter!]) {
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

export const fetchCollectionQuery = `
query MyQuery($collectionId: ID!) @inContext(country: ${QUERY.COUNTRY_ISO_REPLACEMENT_KEY}) {
  collection(id: $collectionId) {
    id
    description
    metafield(key: "backdropimage", namespace: "custom") {
      reference {
        ... on MediaImage {
          id
          previewImage {
            url
          }
        }
      }
    }
    title
    image {
      url
    }
    products(first: 20) {
      edges {
        node {
           ...featuredProduct
        }
      }
    }
  }
}
${featuredProductFragment}
`

export const searchQuery = `
 query MyQuery ($query: String!) {
  search(query: $query, types: PRODUCT, first: ${QUERY.FIRST_LIMIT_KEY}) {
    totalCount
    edges {
      node {
        ... on Product {
          ...featuredProduct
        }
      }
    }
  }
}
${featuredProductFragment}
`