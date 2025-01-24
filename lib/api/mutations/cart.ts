export const createCartMutation = `
      mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id,
      checkoutUrl,
    }
    userErrors {
      field
      message
    }
    warnings {
      message
    }
  }
}`

export const addToCartMutation = `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 1) {
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
                    selectedOptions {
                         name
                         value
                              }
                  }
                }
              }
            }
          }
        }
      }
    }
  `

export const cartDeliveryAddressesAddQuery = `
  mutation cartDeliveryAddressesAdd($addresses: [CartSelectableAddressInput!]!, $cartId: ID!) {
  cartDeliveryAddressesAdd(addresses: $addresses, cartId: $cartId) {
    userErrors {
      field
      message
    }
  }
}
`

export const cartDeliveryAddressesUpdateMutation = `
mutation cartDeliveryAddressesUpdate($addresses: [CartSelectableAddressUpdateInput!]!, $cartId: ID!) {
  cartDeliveryAddressesUpdate(addresses: $addresses, cartId: $cartId) {
    userErrors {
      field
      message
    }
  }
}`

export const cartSelectedDeliveryOptionsUpdateMutation = `
  mutation cartSelectedDeliveryOptionsUpdate($cartId: ID!, $selectedDeliveryOptions: [CartSelectedDeliveryOptionInput!]!) {
  cartSelectedDeliveryOptionsUpdate(cartId: $cartId, selectedDeliveryOptions: $selectedDeliveryOptions) {
    userErrors {
      field
      message
    }
  }
}
`

export const cartLinesRemoveMutation = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    userErrors {
      field
      message
    }
  }
}
`

export const cartBuyerIdentityMutation = `
        mutation cartBuyerIdentityUpdate($buyerIdentity: CartBuyerIdentityInput!, $cartId: ID!) {
            cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
            userErrors {
              field
              message
            }
          }
        }
    `