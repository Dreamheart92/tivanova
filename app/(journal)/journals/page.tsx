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
        <div className='max-w-[500px]'>
            <Link href={href}>
                <Image src={article.image.url} alt={article.title} width={500} height={300}
                       className='min-h-[350px] object-cover'/>
                <h3 className='py-2'>{article.title}</h3>
                <p>{article.content}</p>
            </Link>
            <p className='mt-2 underline'><Link href={href} className=''>Read more</Link></p>
        </div>
    )
}

const ArticlesWrapper = async () => {
    try {
        const articles = await fetchArticles();

        return (
            <ContentContainer>
                <div className='pt-12 grid grid-cols-3'>
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