module.exports.queryString = req =>
  (query =
    req.query.query &&
    req.query.query !== null &&
    typeof req.query.query !== 'undefined' &&
    req.query.query.length > 0 &&
    typeof JSON.parse(req.query.query) === 'object'
      ? JSON.parse(req.query.query)
      : {});
