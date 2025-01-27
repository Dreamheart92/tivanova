import {clientFetcher} from "@/lib/api/shopify";
import {fetchArticleQuery, fetchArticlesQuery} from "@/lib/api/queries/blog";
import {removeEdgesAndNodes} from "@/lib/utils/shopify.utils";
import {ArticleShortType, ArticleType} from "@/lib/definitions/blog.definitions";

export const fetchArticles = async (): Promise<ArticleShortType[]> => {
    const data = await clientFetcher(fetchArticlesQuery);

    return removeEdgesAndNodes(data.blog.articles);
}

export const fetchArticle = async (articleId: string): Promise<ArticleType> => {
    const data = await clientFetcher(fetchArticleQuery, {
        id: `gid://shopify/Article/${articleId}`,
    })

    return data.article;
}