export const fetchWishlistQuery = `
          query MyQuery($id: ID!) {
    metaobject(id: $id) {
      id
      field(key: "lines") {
        references(first: 250) {
          edges {
            node {
              ... on Product {
                id
                title
                images(first: 2) {
                  edges {
                    node {
                      url
                    }
                  }
                }
                vendor
                priceRange {
                  minVariantPrice {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
    `