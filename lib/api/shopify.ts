import {adminClient, client} from "@/lib/shopify";

export const clientFetcher = async (query: string, variables?: any) => {
    const {data, errors} = await client.request(query, {
        variables: {
            ...variables,
        }
    });

    if (errors) {
        throw errors;
    }

    return data;
}

export const adminFetcher = async (query: string, variables?: any) => {
    const {data, errors} = await adminClient.request(query, {
        variables: {
            ...variables,
        }
    })

    if (errors) {
        throw errors;
    }

    return data;
}