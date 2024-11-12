import ContentBox from "@/components/content-box";
import Box from "@/components/box";
import Link from "next/link";

import styles from './page.module.css';
import {getWishlistSession} from "@/lib/session";
import CatalogueGrid from "@/components/catalogue-grid";
import {fetchWishlistProducts} from "@/lib/services/wishlist-service";
import WishlistCard from "@/components/wishlist-card";

export default async function Wishlist() {
    const wishlist = await getWishlistSession();

    const products = await fetchWishlistProducts(wishlist);

    if (wishlist.length > 0) {
        return (
            <ContentBox>
                <Box column>
                    <h3 style={{padding: '0.5em 0 1.5em 0'}}>My wishlist</h3>
                    <CatalogueGrid>
                        {products.map((product) => (
                            <WishlistCard key={product.id} product={product}/>
                        ))}
                    </CatalogueGrid>
                </Box>
            </ContentBox>
        )
    }

    return (
        <ContentBox>
            <Box
                column
                align='center'
                gap='1em'
                style={{
                    width: '100%',
                    paddingTop: '2em',
                }}
            >
                <h3>Your wishlist is currently empty.</h3>
                <p>Explore our collection and save the pieces that inspire your style.</p>
                <Link
                    href='/c'
                    className={styles['cta-btn']}
                >
                    Shop all
                </Link>
            </Box>
        </ContentBox>
    )
}