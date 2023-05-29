import gql from 'graphql-tag';

export const getBookmarkItem = () => {
  var query = gql`
    query BookmarkListing($datasource: String!, $language: String!) {
      datasource: item(path: $datasource, language: $language) {
        ... on ArticleDetailPage {
          id
          url {
            url
          }
          title {
            jsonValue
          }
          shortDescription {
            jsonValue
          }
          image {
            jsonValue
          }
          date {
            jsonValue
          }
          authorName {
            jsonValue
          }
          tags {
            targetItems {
              ... on ContentName {
                name
              }
            }
          }
          contentType {
            targetItem {
              ... on ContentName {
                name
              }
            }
          }
        }
      }
    }
  `;
  // console.log('query', query);
  return query;
};

export const getAllRoutes = () => {
  var query = gql`
    query ArticlesList($datasource: String!, $language: String!) {
      datasource: item(path: $datasource, language: $language) {
        children {
          results {
            id
            name
          }
        }
      }
    }
  `;
  return query;
};

export const getEmailTemplatesGraphqlQuery = () => {
  var query = gql`
    query EmailTemplate($datasource: String!, $language: String!) {
      datasource: item(path: $datasource, language: $language) {
        children {
          results {
            id
            name
            fields {
              value
            }
          }
        }
      }
    }
  `;
  return query;
};
