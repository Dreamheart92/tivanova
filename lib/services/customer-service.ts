'use server';

import {client} from "@/lib/shopify";
import {getSession} from "@/lib/session";

type UserData = {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    password?: string;
}

export const updateProfileService = async (userData: UserData) => {
    const session = await getSession();

    if (session) {
        try {
            const {data} = await client.request(`
    mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
  customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
    customer {
      phone
      firstName
      lastName
      email
    }
    userErrors {
      field
      message
    }
  }
}`, {
                variables: {
                    customerAccessToken: session.user.token,
                    customer: {
                        ...userData,
                    }
                }
            })
            return {
                success: true,
                data: data.customerUpdate.customer,
            }
        } catch (error) {
            console.log(error);
// TODO : Handle error
            return {
                success: false,
                data: null,
            }
        }
    }

    return {
        success: false,
        data: null,
    }
}