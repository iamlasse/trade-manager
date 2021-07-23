// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    // console.log(`options`, options)
    const { app, method, result, params } = context
    const addTrades = async account => {
      const tradeService = await app.service('trades');
      const trades = await tradeService.find({
        query: {
          $limit: 100,
          'accId': account.id,
          isOpen: 1,
          $sort: {
            symbol: -1
          },
          accId: {
            $in: [account.id]
          }
        }
      });



      return {
        ...account,
        trades
      }
    }


    if (method === 'find') {
      context.result.data = await Promise.all(result.data.map(addTrades))
    } else {
      context.result = await addTrades(result)
    }
    return context;
  };
};
