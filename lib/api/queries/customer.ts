export const fetchCustomerDataQuery = `
     query fetchCustomerData($accessToken: String!) {
  customer(customerAccessToken: $accessToken) {
    email
    firstName
    lastName
    phone
    id
    metafields(identifiers: [
    {key: "cartId", namespace: "custom"},
    {key: "wishlistId", namespace: "custom"},
    ]) {
      key
      value
    }
  }
}`

export const fetchCustomerOrdersQuery = `
query FetchCustomerOrders($accessToken: String!) {
  customer(customerAccessToken: $accessToken) {
    orders(first: 250, reverse: true) {
      edges {
        node {
          id
          processedAt
          billingAddress {
            address1
            address2
            city
            countryCodeV2
            firstName
            id
            lastName
            name
            phone
            zip
          }
          currencyCode
          email
          financialStatus
          fulfillmentStatus
          name
          orderNumber
          phone
          shippingAddress {
            address1
            address2
            city
            countryCodeV2
            firstName
            lastName
            name
            phone
            zip
          }
          subtotalPrice {
            amount
            currencyCode
          }
          totalPrice {
            amount
            currencyCode
          }
          totalShippingPrice {
            amount
            currencyCode
          }
          lineItems(first: 250) {
            edges {
              node {
                quantity
                title
                originalTotalPrice {
                  amount
                  currencyCode
                }
                variant {
                  id
                  image {
                    url
                  }
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  sku
                  title
                  unitPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`
