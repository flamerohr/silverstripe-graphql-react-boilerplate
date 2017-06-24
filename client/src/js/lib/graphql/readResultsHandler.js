// juggle the graphql data obtained to a more meaningful structure, similar to mapStateToProps
const readResultsHandler = name => ({ data }) => {
  const list = data[`read${name}`];
  const { refetch: reload, error, loading } = data;

  return {
    reload,
    [name]: list && list.edges.map(edge => edge.node),
    totalCount: list && list.pageInfo.totalCount,
    loading,
    error,
  };
};

export default readResultsHandler;
