Package.describe({
  "summary": "Proper MongoDB aggregations support for Meteor",
  "version": "0.0.1",
  "git": "https://github.com/meteorhacks/meteor-aggregate.git",
  "name": "lvfang:aggregate"
});

Package.onUse(function(api) {
  configurePackage(api);
});

function configurePackage(api) {
  api.versionsFrom('METEOR@1.0');
  api.use(['ecmascript', 'mongo-livedata'], ['server']);

  // common before
  api.addFiles([
    'index.js',
  ], ['server']);
}
