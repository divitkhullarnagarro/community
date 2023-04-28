import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, DocumentNode } from 'apollo-boost';
import { sitecoreApiHost } from 'temp/config';
import { sitecore } from 'scjssconfig.json';

export const modifyHtml = (convertedContent: string) => {
  let modified = '';
  let flag = false;
  let hashtag = '';
  for (var i = 0; i < convertedContent?.length; i++) {
    if (flag) {
      if (
        convertedContent.charAt(i) == ' ' ||
        convertedContent.substring(i, i + 6) == '&nbsp;' ||
        convertedContent.substring(i, i + 4) == '</p>' ||
        convertedContent.substring(i, i + 4) == '<br>' ||
        convertedContent.substring(i, i + 1) == '<'
      ) {
        modified =
          modified +
          `<a href='${hashtag}' class="wysiwyg-mention" data-mention data-value="${hashtag}">` +
          hashtag +
          '<a>';
        flag = false;
        hashtag = '';
      } else {
        hashtag = hashtag + convertedContent.charAt(i);
        continue;
      }
    }
    if (convertedContent.charAt(i) != '#') modified = modified + convertedContent.charAt(i);
    else {
      hashtag = '#';
      flag = true;
    }
  }
  return modified;
};

export const getValueFromCookie = (key: string) => {
  if (typeof document !== 'undefined') {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';').reduce((acc: any, cookie: string) => {
      const [name, value] = cookie.split('=').map((c) => c.trim());
      acc[name] = value;
      return acc;
    }, {});

    return cookies[key] || null;
  }
  return null;
};

export const openDoc = (base64: string) => {
  var base64pdf = base64;

  if (window !== undefined) {
    var pdfWindow = window.open('', '_blank');
    pdfWindow?.document.write(`<iframe width='100%' height='100%' src=${base64pdf}></iframe>`);
  }
};

export const calculateTimeDifference = (postDate: any) => {
  postDate = new Date(postDate);
  const currentTime = new Date().getTime();
  const timeDiffMs = currentTime - postDate.getTime();
  const timeDiffHours = Math.floor(timeDiffMs / (1000 * 60 * 60));
  const timeDiffMinutes = Math.floor(timeDiffMs / (1000 * 60));
  const timeDiffDays = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));
  if (timeDiffHours >= 24) {
    return `${timeDiffDays} ${timeDiffDays > 1 ? 'days' : 'day'} ago`;
  } else if (timeDiffMinutes >= 60) {
    return `${timeDiffHours} ${timeDiffDays > 1 ? 'hours' : 'hour'} ago`;
  } else {
    return `${timeDiffMinutes} ${timeDiffDays > 1 ? 'minutes' : 'minute'} ago`;
  }
};

export const graphqlQueryWrapper = async <T>(query: DocumentNode, dataSource: string) => {
  const ServerLink = `${sitecoreApiHost}/sitecore/api/graph/edge?sc_apikey=${sitecore.apiKey}`;
  const store = 'default';
  const httpLink = new HttpLink({
    uri: ServerLink,
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        store: store,
      },
    });
    return forward(operation);
  });

  const client1 = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const variables = {
    datasource: dataSource,
    language: 'en',
  };

  let result = await client1?.query<T>({ query, variables });
  return result;
};
