import type { NextRequest } from 'next/server';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { getAllRoutes } from '../../components/Queries';
import { sitecoreApiHost } from 'temp/config';
import { sitecore } from 'scjssconfig.json';

export const getPathList = async (request: NextRequest) => {
    //Graphql code for fetching Routes Data
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

    let homeItemId = `{9B2F2C61-B700-51DD-8F47-7600FC865200}`;

    var query = getAllRoutes();
    const variables = {
        datasource: homeItemId,
        language: 'en',
    };
    let result = await client1?.query({ query, variables });
    let resp = result?.data?.datasource?.children?.results?.filter((item: any) => {
        if (request.nextUrl.pathname.startsWith(`/${item?.name}`) && !request.nextUrl.pathname.startsWith(`/login`) && !request.nextUrl.pathname.startsWith(`/register`) && !request.nextUrl.pathname.startsWith(`/forgotPassword`)) {
            return true;
        }
        return false;
    });
    if (resp.length > 0)
        return true;
    else return false;

};