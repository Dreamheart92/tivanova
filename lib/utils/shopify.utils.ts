export const removeEdgesAndNodes = (array: any) => {
    return array.edges.map((edge: any) => edge?.node);
}

export const extractShopifyIdFromGID = (shopifyString: string) => {
    const chunks = shopifyString.split("/");
    return chunks[chunks.length - 1];
}

export const reshapeProduct = (product: any) => {
    return {
        ...product,
        images: removeEdgesAndNodes(product.images),
        variants: removeEdgesAndNodes(product.variants),
    }
}

export const reshapeFeaturedProducts = (products: any) => {
    return products.nodes.map((product: any) => ({
        ...product,
        images: removeEdgesAndNodes(product.images),
    }))
}

export const reshapeCollection = (collection: any) => {
    return {
        id: collection.id,
        description: collection.description,
        title: collection.title,
        image: collection.image,
        backdropImage: collection.metafield.reference,
        products: collection.products.edges.map((product: any) => ({
            ...product.node,
            images: removeEdgesAndNodes(product.node.images),
        })),
    }
}

export const reshapeCart = (cart: any) => {
    const deliveryGroups = removeEdgesAndNodes(cart.deliveryGroups)[0];

    return {
        lines: cart.lines.nodes.map((product: any) => ({
            ...product,
            merchandise: {
                ...product.merchandise,
                product: {
                    ...product.merchandise.product,
                    images: removeEdgesAndNodes(product.merchandise.product.images),
                }
            }
        })),
        totalQuantity: cart.totalQuantity,
        cost: cart.cost,
        id: cart.id,
        deliveryGroups: {
            ...deliveryGroups,
        },
        delivery: {
            ...cart.delivery,
            selectedDeliveryAddress: cart.delivery.addresses.find((address: any) => address.selected)
        },
        buyerIdentity: cart.buyerIdentity,
    }
}

export const hasShopifyUserError = (data: any) => {
    const hasError = data?.length > 0;

    return hasError ? data : false;
}