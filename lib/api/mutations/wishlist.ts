export const createWishlistMutation = `
    mutation CreateMetaobject($metaobject: MetaobjectCreateInput!) {
        metaobjectCreate(metaobject: $metaobject) {
          metaobject {
            handle
            id
            fields {
              key
              value
            }
          }
          userErrors {
            field
            message
            code
          }
        }
      }
   `

export const updateRemoteWishlistMutation = `
      mutation UpdateMetaobject($id: ID!, $metaobject: MetaobjectUpdateInput!) {
          metaobjectUpdate(id: $id, metaobject: $metaobject) {
            metaobject {
              id
              handle
              fields {
                key
                value
              }
            }
            userErrors {
              field
              message
              code
            }
          }
    }
    `