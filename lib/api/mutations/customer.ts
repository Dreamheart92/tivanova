export const storeCartAndWishlistIdsToCustomerMutation = `mutation updateCustomerMetafields($input: CustomerInput!) {
      customerUpdate(input: $input) {
        customer {
          id
          metafields(first: 3) {
            edges {
              node {
                id
                namespace
                key
                value
              }
            }
          }
        }
        userErrors {
          message
          field
        }
      }
    }`

export const updateCustomerMutation = `
    mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
  customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
    customer {
      phone
      firstName
      lastName
      email
    }
    customerAccessToken {
        accessToken
    }
    userErrors {
      field
      message
    }
  }
}`