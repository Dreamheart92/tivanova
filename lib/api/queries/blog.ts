export const fetchArticlesQuery = `
    query MyQuery {
  blog(handle: "news") {
    articles(first: 10, reverse: true) {
      edges {
        node {
          content(truncateAt: 100)
          handle
          id
          image {
            url
          }
          title
        }
      }
    }
  }
}
`

export const fetchArticleQuery = `
    query MyQuery ($id: ID!) {
  article(id: $id) {
    authorV2 {
      bio
      email
      firstName
      lastName
      name
    }
    contentHtml
    excerptHtml
    handle
    id
    image {
      url
    }
    publishedAt
    seo {
      description
      title
    }
    tags
    title
  }
}
`