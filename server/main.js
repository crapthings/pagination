import _ from 'lodash'
import moment from 'moment'
import faker from 'faker'

Test.remove({})

const data = _.times(2000, n => ({
  title: faker.lorem.sentence(),
  createdAt: faker.date.past(),
  type: _.sample(['哈尔滨', '沈阳', '北京', '加拿大', '新西兰', '日本', '美国']),
}))

Test.batchInsert(data)

Meteor.publish('test', function (limit = 30) {
  this.unblock()
  return Test.find({}, { limit })
})

var a = null

Meteor.publish('test1', function (limit = 100) {
  this.unblock()
  let alreadySent = []
  const data = _.chain(Test.find().fetch())
    .groupBy('type')
    .toPairs()
    .flattenDeep()
    .map((d, n) => {
      if (_.isString(d)) {
        const _d = { _id: Random.id(), title: d, idx: n }
        return _d
      } else {
        d.idx = n
        return d
      }
    })
    .value()

  console.log('rerun')

  // this.autorun(c => {
  //   console.log('data length', data.length)
  //   const limit = (this.data('limit')) - 1
    // const test = _.slice(data, limit - 99, limit)
    const test = _.take(data, limit)
    console.log(limit)
    _.each(test, t => {
      if (! _.includes(alreadySent, t._id)) {
        this.added('test', t._id, { ...t })
        alreadySent.push(t._id)
      }
    })
  // })

  // this.onStop(() => {
  //   console.log(123123123, 'stop')
  // })

  this.ready()
})
