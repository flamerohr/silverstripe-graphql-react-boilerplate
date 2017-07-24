import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { printRequest } from 'apollo-client/transport/networkInterface';
import querystring from 'querystring';

const apolloClientCreator = (uri) => {
  // SilverStripe uses `ID` as the primary key field, normally
  const ids = ['ID', 'id', '_id'];

  const dataIdFromObject = (result) => {
    const type = result.__typename;

    return ids.reduce((prev, key) => {
      const value = result[key];

      if (type && !prev && value !== undefined) {
        return `${type}:${value}`;
      }

      return prev;
    }, null);
  };

  const networkInterface = createNetworkInterface({
    uri,
    opts: {
      credentials: 'same-origin',
    },
  });


  networkInterface.use([
    {
      applyMiddleware(req, next) {
        const entries = printRequest(req.request);

        // eslint-disable-next-line no-param-reassign
        req.options.headers = {
          ...req.options.headers,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        };
        // eslint-disable-next-line no-param-reassign
        req.options.body = querystring.stringify({
          ...entries,
          variables: JSON.stringify(entries.variables),
        });
        next();
      },
    },
  ]);

  return new ApolloClient({
    networkInterface,
    dataIdFromObject,
  });
};

export default apolloClientCreator;
