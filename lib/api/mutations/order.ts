export const orderCreateMutation = `
        mutation OrderCreate($order: OrderCreateOrderInput!, $options: OrderCreateOptionsInput) {
            orderCreate(order: $order, options: $options) {
                userErrors {
                  field
                  message
                }
                order {
                 billingAddress {
      address1
      address2
      city
      country
      countryCodeV2
      firstName
      id
      lastName
      phone
      zip
    }
    billingAddressMatchesShippingAddress
    confirmationNumber
    createdAt
    currencyCode
    currentSubtotalLineItemsQuantity
    currentShippingPriceSet {
      presentmentMoney {
        amount
        currencyCode
      }
      shopMoney {
        amount
        currencyCode
      }
    }
    currentTotalPriceSet {
      presentmentMoney {
        amount
        currencyCode
      }
      shopMoney {
        amount
        currencyCode
      }
    }
    currentSubtotalPriceSet {
      presentmentMoney {
        amount
        currencyCode
      }
      shopMoney {
        amount
        currencyCode
      }
    }
    displayFulfillmentStatus
    displayAddress {
      address1
      address2
      city
      country
      countryCodeV2
      firstName
      lastName
      id
      phone
      zip
    }
    email
    id
    lineItems(first: 250) {
      edges {
        node {
        title
          originalUnitPriceSet {
            presentmentMoney {
              amount
              currencyCode
            }
            shopMoney {
              amount
              currencyCode
            }
          }
          currentQuantity
          id
          image {
            url
          }
          name
          originalTotalSet {
            presentmentMoney {
              amount
              currencyCode
            }
            shopMoney {
              amount
              currencyCode
            }
          }
          vendor
          variant {
            image {
              url
            }
            selectedOptions {
              name
              value
            }
            price
            title
          }
          variantTitle
        }
      }
    }
             }
            }
         }
   `