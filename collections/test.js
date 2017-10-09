Test = new Mongo.Collection('test', {
  transform(doc) {
    doc.abc = 1
    return doc
  }
})
