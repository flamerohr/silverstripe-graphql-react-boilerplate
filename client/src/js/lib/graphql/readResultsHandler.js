// juggle the graphql data obtained to a more meaningful structure, similar to mapStateToProps
const readResultsHandler = name => ({ data }) => {
  const list = data[`read${name}`];

  return {
    reload: data.refetch,
    [name]: list && list.edges.map(edge => edge.node),
    totalCount: list && list.pageInfo.totalCount,
    loading: data.loading,
    error: data.error,
  };
};

export default readResultsHandler;
