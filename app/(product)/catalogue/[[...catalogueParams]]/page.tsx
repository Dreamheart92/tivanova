import {fetchCatalogueProducts} from "@/lib/api/product.api";
import ContentContainer from "@/components/ui/content-container";
import AnnouncementBanner from "@/app/(product)/catalogue/[[...catalogueParams]]/components/announcement-banner";
import ProductList from "@/app/(product)/catalogue/[[...catalogueParams]]/components/product-list";
import FiltersPanel from "@/app/(product)/catalogue/[[...catalogueParams]]/components/filters-panel";
import {Suspense} from "react";
import {CatalogueSkeleton} from "@/components/skeletons";

const pageSettings = {
    announcementBanner: {
        content: 'New collection just dropped',
    },
    filtersPanel: {
        toggleFiltersLabel: 'FILTERS',
        clearQueryButtonLabel: 'Clear filters'
    }
}

type SearchParamsType = {
    brand?: string,
    color?: string,
    size?: string,
    category?: string
}

type CatalogueProps = {
    params: Promise<{ category: string }>,
    searchParams: Promise<SearchParamsType>,
}

const CatalogueWrapper = async ({search}: { search: SearchParamsType }) => {
    try {
        const {products, filters} = await fetchCatalogueProducts(search);

        return (
            <ContentContainer>
                <FiltersPanel
                    clearQueryButtonLabel={pageSettings.filtersPanel.clearQueryButtonLabel}
                    toggleFiltersLabel={pageSettings.filtersPanel.toggleFiltersLabel}
                    filters={filters}
                />
                <ProductList products={products}/>
            </ContentContainer>
        )
    } catch (error) {
        return <CatalogueSkeleton errorMessage='Failed to load products. Please try again.'/>
    }
}

export default async function Catalogue({params, searchParams}: CatalogueProps) {
    const search = await searchParams;

    return (
        <div>
            <AnnouncementBanner content={pageSettings.announcementBanner.content}/>
            <Suspense fallback={<CatalogueSkeleton/>}>
                <CatalogueWrapper search={search}/>
            </Suspense>
        </div>
    )
}