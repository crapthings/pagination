import _ from 'lodash'
import moment from 'moment'
import faker from 'faker'

Meteor.publish('issues', function (limit = 100) {
  this.unblock()
  return Issues.find({}, { sort: { createdAt: -1 }, limit })
})

Meteor.publish('issues.by.group', function () {
  this.unblock()
  const self = this
  const groups = Groups.find({}, { sort: { name: 1 }, fields: { name: 1, type: 1 } }).fetch()
  // const groupsKeyById = _.keyBy(groups, '_id')

  const _groups = generator(groups)
  let _issues = []
  let count
  let idx = 1

  this.autorun(c => {
    this.c = c
    count = 0
    console.log(this.data('limit'))
    prepareData()
  })

  this.ready()

  this.onStop(() => {
    this.c.stop()
  })

  function prepareData() {
    const group = _groups.next().value
    if (_.isUndefined(group)) return
    const issues = Issues.find({ groupId: group._id }, { fields: { title: 1 } }).fetch()
    if (_.isEmpty(issues)) return prepareData()
    _issues = _.concat(_issues, group, issues)
    if (_issues.length < 100) {
      prepareData()
    } else {
      console.log(_issues.length)
      _.remove(_issues, issue => {
        if (count < 100) {
          self.added('issues', issue._id, { ...issue, idx })
          count ++
          idx ++
          return true
        }
      })
      console.log(_issues.length)
    }
  }

  function* generator(array) {
    yield* array
  }
})
