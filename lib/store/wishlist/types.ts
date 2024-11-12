export type WishlistContextType = {
    wishlist: string[];
    addItemToWishlist: (productId: string) => void;
    removeItemFromWishlist: (productId: string) => void;
    updateWishlist: (wishlist: string[]) => void;
    clearWishlist: () => void;
}