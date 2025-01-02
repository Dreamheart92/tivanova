import {fetchCatalogueProducts} from "@/lib/api/product.api";
import ContentContainer from "@/components/ui/content-container";
import AnnouncementBanner from "@/app/(product)/catalogue/[[...catalogueParams]]/components/announcement-banner";
import ProductList from "@/app/(product)/catalogue/[[...catalogueParams]]/components/product-list";
import FiltersPanel from "@/app/(product)/catalogue/[[...catalogueParams]]/components/filters-panel";

const pageSettings = {
    announcementBanner: {
        content: 'New collection just dropper',
    },
    filtersPanel: {
        toggleFiltersLabel: 'FILTERS',
        clearQueryButtonLabel: 'Clear filters'
    }
}

type CatalogueProps = {
    params: Promise<{ category: string }>,
    searchParams: Promise<{ brand?: string, color?: string, size?: string, category?: string }>,
}

export default async function Catalogue({params, searchParams}: CatalogueProps) {
    const search = await searchParams;
    const {products, filters} = await fetchCatalogueProducts(search);

    return (
        <div>
            <AnnouncementBanner content={pageSettings.announcementBanner.content}/>

            <ContentContainer>
                <FiltersPanel
                    clearQueryButtonLabel={pageSettings.filtersPanel.clearQueryButtonLabel}
                    toggleFiltersLabel={pageSettings.filtersPanel.toggleFiltersLabel}
                    filters={filters}
                />
                <ProductList products={products}/>
            </ContentContainer>
        </div>
    )
}