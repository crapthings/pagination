import _ from 'lodash'
import moment from 'moment'

import React, { Component } from 'react'
import { render } from 'react-dom'
import { InfiniteLoader, List } from 'react-virtualized'

const Hold = new Mongo.Collection()

function isRowLoaded (list) {
  return function ({ index }) {
    return !!list[index]
  }
}

function loadMoreRows ({ startIndex, stopIndex }) {
  if (stopIndex - startIndex > 50) {
    // console.log(startIndex, stopIndex, stopIndex - startIndex,this.subHandler.data('limit') + 100)
    // this.subHandler.setData('limit', this.subHandler.data('limit') + 100)
    this.Limit.set(this.Limit.get() + 100)
  }
}

export class B extends Component {
  constructor() {
    super()
    this.Limit = new ReactiveVar(100)
    this.state = { list: [], loading: true }
    this.records = {}
  }

  componentDidMount() {
    Meteor.autorun((c) => {
      const limit = this.Limit.get()
      this.c = c
      this.subHandler = Meteor.subscribe('issues.by.group.alt')
      // this.subHandler = Meteor.subscribe('issues.by.group')
      this.subHandler.setData('limit', limit)
      if (this.subHandler.ready()) {
        // alt
        const issues = Issues.find().fetch()[0]['data']
        // const issues = Issues.find({}, { sort: { idx: 1 } }).fetch()
        console.log('rerun')
        _.each(issues, issue => {
          if (this.records[issue._id]) return
          Hold.insert(issue)
          this.records[issue._id] = true
        })
        const list = Hold.find({}, { sort: { idx: 1 } }).fetch()
        this.setState({ list, loading: false, remoteRowCount: 5000 })
      }
    })
  }

  componentWillUnmount() {
    this.c.stop()
    this.subHandler.stop()
    Hold.remove({})
  }

  render() {
    const { list, loading, remoteRowCount } = this.state
    return loading ? <div>loading</div> : <div>
      <h3>by type</h3>
      <InfiniteLoader
        isRowLoaded={isRowLoaded(list)}
        loadMoreRows={loadMoreRows.bind(this)}
        rowCount={remoteRowCount}
        threshold={100}
      >

        {({ onRowsRendered, registerChild }) => <List
          width={512}
          height={300}
          rowHeight={20}
          rowCount={list.length}
          onRowsRendered={onRowsRendered}
          ref={registerChild}
          rowRenderer={({ key, index, style }) => {
            const item = list[index]
            return <div key={key} style={{...style, overflow: 'hidden', textOverflow: 'ellipsis'}}>
              {index + 1} {item.type}: {item.title || item.name}
            </div>
          }}
        />}

      </InfiniteLoader>
    </div>
  }
}
