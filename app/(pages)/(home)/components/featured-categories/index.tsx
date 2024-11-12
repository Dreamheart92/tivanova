import {CollectionCard} from "@/lib/definitions";
import ContentBox from "@/components/content-box";
import CategoryCard from "@/components/category-card";

import styles from './index.module.css';

export default function FeaturedCategories({collections}: { collections: CollectionCard[] }) {
    return (
        <ContentBox
        >
            <div className={styles.container}>
                {collections.map((collection) => (
                    <CategoryCard
                        key={collection.id}
                        collection={collection}
                    />
                ))}
            </div>
        </ContentBox>
    )
}