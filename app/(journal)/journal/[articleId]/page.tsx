import {fetchArticle} from "@/lib/api/blog.api";
import {notFound} from "next/navigation";
import {Suspense} from "react";
import Image from "next/image";
import moment from "moment/moment";
import {JournalSkeleton} from "@/components/skeletons";

const JournalWrapper = async ({articleId}: { articleId: string }) => {
    const article = await fetchArticle(articleId);

    if (!article) {
        notFound();
    }

    return (
        <div className='max-w-screen-xl mx-auto text-sm md:text-base p-2 md:p-0'>
            <div className='relative mb-4 md:mb-28'>
                <Image src={article.image.url} alt={article.title} width={1280} height={500}
                       className='max-h-[750px] object-cover'/>

                <div className='md:absolute md:-bottom-20'>
                    <div className='bg-stone-100 md:max-w-[70%] md:p-8 pl-0'>
                        <p className='pt-2 md:pt-0 text-stone-500'>{moment(article.publishedAt).format('MMMM DD, YYYY')}</p>
                        <h1>{article.title}</h1>
                    </div>
                </div>

            </div>

            <div className='text-[1.1em] leading-relaxed' dangerouslySetInnerHTML={{__html: article.contentHtml}}/>
        </div>
    )
}

export default async function Journal({params}: { params: Promise<{ articleId: string }> }) {
    const {articleId} = await params;

    return (
        <Suspense fallback={<JournalSkeleton/>}>
            <JournalWrapper articleId={articleId}/>
        </Suspense>
    )
}