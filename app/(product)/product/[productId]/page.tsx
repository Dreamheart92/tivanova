const ProductWrapper = async ({productId}: { productId: string }) => {
    const product = await fetchProductById(productId);

    if (!product) {
        notFound();
    }

    const productVariants = organizeProductVariants(product.variants.edges);

    return (
        <div className='flex'>
            <ProductGallery images={product.images.edges}/>
            <ProductDetails product={product} variants={productVariants}/>
        </div>
    )
}
