export type ArticleType = {
    authorV2: {
        bio: string | null;
        email: string;
        firstName: string;
        lastName: string;
        name: string;
    }
    contentHtml: string;
    handle: string;
    id: string;
    image: {
        url: string;
    }
    publishedAt: string;
    seo: {
        description: string | null;
        title: string | null;
    }
    tags: string[];
    title: string;
}

export type ArticleShortType = {
    content: string;
    handle: string;
    id: string;
    image: {
        url: string;
    }
    title: string;
}