import {fetchArticles} from "@/lib/api/blog.api";
import {Suspense} from "react";
import Image from "next/image";
import {ArticleShortType} from "@/lib/definitions/blog.definitions";
import ContentContainer from "@/components/ui/content-container";
import Link from "next/link";
import {PATHS} from "@/lib/constants/paths";
import {extractShopifyIdFromGID} from "@/lib/utils/shopify.utils";
import {JournalsSkeleton} from "@/components/skeletons";

export default async function Journals() {
    return (
        <Suspense fallback={<JournalsSkeleton/>}>
            <ArticlesWrapper/>
        </Suspense>
    )
}

const ArticleCard = ({article}: { article: ArticleShortType }) => {
    const href = `${PATHS.JOURNAL}/${extractShopifyIdFromGID(article.id)}`;

    return (
        <div className=''>
            <Link href={href}>
                <Image
                    src={article.image.url}
                    alt={article.title}
                    width={500}
                    height={500}
                    className='object-cover aspect-[500/300] md:aspect-[600/400]'
                />
            </Link>

            <div className='md:max-w-[80%] p-2 md:p-0 text-sm md:text-base'>
                <h3 className='pb-1 md:py-2'>{article.title}</h3>
                <p>{article.content}</p>
                <p className='mt-2 underline'><Link href={href} className=''>Read more</Link></p>
            </div>
        </div>
    )
}

const ArticlesWrapper = async () => {
    try {
        const articles = await fetchArticles();

        return (
            <ContentContainer>
                <div className='pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article}/>
                    ))}
                </div>
            </ContentContainer>
        )
    } catch (error) {
        console.error(error);
        return <JournalsSkeleton hasError={true}/>
    }
}