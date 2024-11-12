'use client';

// const Product = ({product}: {
//     product: CartProduct,
// }) => {
//     const cart = useCart();
//
//     const attributes = product.attributes.reduce((a, b) => Object.assign(a, {[b.key]: b.value}), {}) as ProductAttribute;
//
//     return (
//         <Box
//             gap='2em'
//             align='center'
//             style={{
//                 width: '100%',
//             }}
//         >
//             <Box>
//                 <Image
//                     src={product.merchandise.product.images.nodes[0].url}
//                     alt='Product image'
//                     width={180}
//                     height={100}
//                 />
//             </Box>
//
//             <Box
//                 style={{
//                     width: '100%',
//                     gap: '0.25em'
//                 }}
//                 column>
//                 <p>{product.merchandise.product.title}</p>
//                 <p>Size {attributes.size}</p>
//                 <p>EUR {product.cost.totalAmount.amount}</p>
//                 <p>Qty: {product.quantity}</p>
//             </Box>
//         </Box>
//     )
// }
//
// export default function OrderDetails() {
//     const {cart} = useCart();
//
//     return (
//         <Box column gap='1em'>
//             {/*{cart.products.map((product) => (*/}
//             {/*    <Product key={product.id} product={product}/>*/}
//             {/*))}*/}
//         </Box>
//     )
// }