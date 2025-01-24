export const createCustomerMutation = `mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          firstName
          lastName
          email
          phone
          id
        }
        customerUserErrors {
          field
          message
          code
        }
      }
    }`

export const createCustomerAccessTokenMutation = `
mutation customerAccessTokenCreate($email: String!, $password: String!) {
    customerAccessTokenCreate(input: {email: $email, password: $password}) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }`

export const deleteCustomerAccessTokenMutation = `
mutation deleteCustomerAccessToken($accessToken: String!) {
  customerAccessTokenDelete(customerAccessToken: $accessToken) {
    deletedAccessToken
    deletedCustomerAccessTokenId
    userErrors {
      field
      message
      code
    }
  }
}`