export const normalizeName = (value: string): string => `${value[0].toUpperCase() + value.slice(1)}`;

export const getIdFromShopifyString = (shopifyId: string) => {
    const chunks = shopifyId.split('/');
    return chunks[chunks.length - 1];
}