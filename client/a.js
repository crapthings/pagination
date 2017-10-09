import _ from 'lodash'
import moment from 'moment'

import React, { Component } from 'react'
import { render } from 'react-dom'
import { InfiniteLoader, List } from 'react-virtualized'

function isRowLoaded (list) {
  return function ({ index }) {
    return !!list[index]
  }
}

function loadMoreRows ({ startIndex, stopIndex }) {
  if (stopIndex - startIndex > 14) {
    this.Limit.set(this.Limit.get() + 30)
  }
}

export class A extends Component {
  constructor() {
    super()
    this.Limit = new ReactiveVar(30)
    this.state = { list: [], loading: true }
  }

  componentDidMount() {
    Meteor.autorun((c) => {
      this.c = c
      const limit = this.Limit.get()
      this.subHandler = Meteor.subscribe('test', limit)
      if (this.subHandler.ready()) {
        const list = Test.find().fetch()
        this.setState({ list, loading: false, remoteRowCount: 5000 })
      }
    })
  }

  componentWillUnmount() {
    this.c.stop()
    this.subHandler.stop()
  }

  render() {
    const { list, loading, remoteRowCount } = this.state
    return loading ? <div>loading</div> : <div>
      <h3>list</h3>
      <InfiniteLoader
        isRowLoaded={isRowLoaded(list)}
        loadMoreRows={loadMoreRows.bind(this)}
        rowCount={remoteRowCount}
        threshold={30}
      >

        {({ onRowsRendered, registerChild }) => <List
          width={300}
          height={300}
          rowHeight={20}
          rowCount={list.length}
          onRowsRendered={onRowsRendered}
          ref={registerChild}
          rowRenderer={({ key, index, style }) => {
            const item = list[index]
            return <div key={key} style={{...style, overflow: 'hidden', textOverflow: 'ellipsis'}}>
              {index + 1}: {item.type}: {item.title}
            </div>
          }}
        />}

      </InfiniteLoader>
    </div>
  }
}
