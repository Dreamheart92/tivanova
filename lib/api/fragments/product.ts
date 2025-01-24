export const productFragment = `
       fragment product on Product {
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
                currencyCode
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
    `;

export const featuredProductFragment = `
      fragment featuredProduct on Product {
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
                currencyCode
              }
            }
          }
`