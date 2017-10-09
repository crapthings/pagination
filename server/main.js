import _ from 'lodash'
import moment from 'moment'
import faker from 'faker'

const data = _.times(2000, n => ({
  title: faker.lorem.sentence(),
  createdAt: faker.date.past(),
  type: _.sample(['哈尔滨', '沈阳', '北京', '加拿大', '新西兰', '日本', '美国']),
}))

Meteor.publish('test', function () {
  this.added('test', 'count', { count: data.length })
  this.added('test', 'init', { data: _.take(data, 20) })
  this.ready()
})
