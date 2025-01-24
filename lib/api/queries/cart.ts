export const fetchCartQuery = `
query MyQuery($cartId: ID!) {
  cart(id: $cartId){
  delivery {
      addresses {
        id
        selected
        oneTimeUse
        address {
          ... on CartDeliveryAddress {
            countryCode
            firstName
            lastName
            address1
            address2
            zip
            phone
            city
          }
        }
      }
    }
       deliveryGroups(first: 10) {
      edges {
        node {
            id
          selectedDeliveryOption {
            code
            deliveryMethodType
            description
            title
            handle
            estimatedCost {
              amount
              currencyCode
            }
          }
          deliveryOptions {
            code
            deliveryMethodType
            description
            estimatedCost {
              amount
              currencyCode
            }
            handle
            title
          }
        }
      }
    }
    lines(first: 250, reverse: true) {
      nodes {
        id
        quantity
        attributes {
          key
          value
        }
        merchandise {
          ... on ProductVariant {
            id
             selectedOptions {
                name
                value
              }
            product {
              images(first: 1) {
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
              title
              vendor
              id
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          amountPerQuantity {
            amount
            currencyCode
          }
        }
      }
    }
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
       subtotalAmount {
        amount
        currencyCode
      }
    }
     checkoutUrl
     id
     buyerIdentity {
        email
     }
  }
}`
