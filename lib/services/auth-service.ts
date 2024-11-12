import {client} from "@/lib/shopify";

export const createUserAccessToken = async (email: string, password: string) => {
    const mutation = `mutation customerAccessTokenCreate {
    customerAccessTokenCreate(input: {email: "${email}", password: "${password}"}) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        message
      }
    }
  }`

    try {
        const {data} = await client.request(mutation);

        if (data.customerAccessTokenCreate.customerUserErrors.length > 0) {
            throw new Error('409');
        }

        return data.customerAccessTokenCreate.customerAccessToken.accessToken;
    } catch (error) {
        throw error;
    }
}

export const deleteUserAccessToken = async (accessToken: string) => {
    const {data, errors} = await client.request(`mutation {
  customerAccessTokenDelete(customerAccessToken: "${accessToken}") {
    deletedAccessToken
    deletedCustomerAccessTokenId
    userErrors {
      field
      message
    }
  }
}`)
}