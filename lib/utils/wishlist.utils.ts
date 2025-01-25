import {WishlistActionType} from "@/lib/context/wishlist";
import {FeaturedProductType} from "@/lib/definitions/product";
import {removeEdgesAndNodes} from "@/lib/utils/shopify";

export const modifyWishlistProductIds = (type: 'add' | 'remove', wishlistProducts: FeaturedProductType[], productId: string) => {
    const productIds = wishlistProducts.map((product) => product.id);

    if (type === 'add') {
        return [...productIds, productId]
    }

    if (type === 'remove') {
        return productIds.filter((wishlistProductId) => wishlistProductId !== productId);
    }

    throw new Error(`Invalid type: ${type}. Allowed values are 'add' or 'remove'`);
}

export const generateToastDescription = (productTitle: string, type: WishlistActionType) =>
    `${productTitle} ${type !== 'add' ? 'was removed from your wishlist' : 'was added to your wishlist'}`;

export const reshapeWishlist = (data: any) => {
    const productsReferences = data.metaobject.field.references;

    const products = productsReferences ? removeEdgesAndNodes(productsReferences).map((product: any) => ({
        ...product,
        images: removeEdgesAndNodes(product.images),
    })) : [];

    return {
        id: data.metaobject.id,
        lines: products,
    }
}