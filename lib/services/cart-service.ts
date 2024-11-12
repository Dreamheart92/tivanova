'use server';

import {adminClient, client} from "@/lib/shopify";
import {CartProductAttribute} from "@/lib/store/cart/types";
import {getSession} from "@/lib/session";

export const createCartService = async (accessToken: string, customerId: string) => {
    try {
        const {data} = await client.request(`
      mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
    }
    userErrors {
      field
      message
    }
    warnings {
      message
    }
  }
}`,
            {
                variables: {
                    input: {
                        buyerIdentity: {
                            customerAccessToken: accessToken,
                        }
                    }
                }
            })

        if (data?.cartCreate?.cart?.userErrors?.length > 0) {
            throw new Error('Something went wrong');
        }

        await adminClient.request(`mutation updateCustomerMetafields($input: CustomerInput!) {
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
    }`, {
            "variables": {
                "input": {
                    "id": `${customerId}`,
                    "metafields": [
                        {
                            "namespace": "custom",
                            "key": "cartId",
                            "type": "single_line_text_field",
                            "value": `${data.cartCreate.cart.id}`
                        },
                    ],
                }
            },
        })

        return data.cartCreate.cart.id;
    } catch (error) {
        throw error;
    }
}

export const addItemToCartService = async (variantId: string, attributes: CartProductAttribute[]) => {
    const cookie = await getSession();

    if (cookie && typeof cookie?.user !== 'undefined') {
        const cartId = cookie.user.cartId;

        const {data, errors} = await client.request(`
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 1) {
            edges {
              node {
                id
                quantity
                attributes {
                  key
                  value
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `, {
            variables: {
                cartId,
                lines: [
                    {
                        quantity: 1,
                        merchandiseId: variantId,
                        attributes: attributes,
                    }
                ]
            }
        })

        if (errors) {
            throw new Error('Something went wrong');
        }

        return data.cartLinesAdd.cart.lines.edges[0].node.id;
    }
}

export const removeItemFromCartService = async (lineId: string) => {
    const cookie = await getSession();

    if (cookie && typeof cookie?.user !== 'undefined') {
        const cartId = cookie.user.cartId;

        await client.request(`mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`, {
            variables: {
                cartId,
                lineIds: [
                    lineId,
                ]
            }
        })
    }
}

export const updateItemQuantityInCartService = async (lineId: string, quantity: number) => {
    const cookie = await getSession();

    if (cookie && typeof cookie?.user !== 'undefined') {
        const cartId = cookie.user.cartId;

        await client.request(`mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `, {
            variables: {
                cartId,
                lines: [
                    {
                        id: lineId,
                        quantity,
                    },
                ]
            },
        })
    }
}

export const fetchCart = async (cartId: string) => {
    const {data} = await client.request(`query MyQuery {
  cart(id: "${cartId}") {
    buyerIdentity {
      customer {
        id
        lastName
        firstName
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
            product {
              images(first: 1) {
                nodes {
                  url
                }
              }
              priceRange {
                minVariantPrice {
                  amount
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
          }
          amountPerQuantity {
            amount
          }
        }
      }
    }
    totalQuantity
    cost {
      totalAmount {
        amount
      }
    }
  }
}`)

    return data.cart;

    //TODO : Handle errors
}