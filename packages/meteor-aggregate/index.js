const wrapAsync = Meteor.wrapAsync;

Mongo.Collection.prototype.aggregate = function (pipelines, options) {
  const coll = this.rawCollection();
  return wrapAsync(coll.aggregate.bind(coll))(pipelines, options);
}

Mongo.Collection.prototype.distinct = function (pipelines, options) {
  const coll = this.rawCollection();
  return wrapAsync(coll.distinct.bind(coll))(pipelines, options);
}

Mongo.Collection.prototype.out = function (collection, pipelines = [], options) {
  return this.aggregate([...pipelines, { $out: collection }], options);
}
