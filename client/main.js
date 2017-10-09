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
  console.log(startIndex, stopIndex)
}

class A extends Component {
  constructor() {
    super()
    this.state = { list: [], loading: true }
  }

  componentDidMount() {
    Meteor.autorun(() => {
      const ready = Meteor.subscribe('test').ready()
      if (ready) {
        const test = Test.findOne('init')
        const count = Test.findOne('count').count
        if (test) {
          const list = _.get(test, 'data', [])
          this.setState({ list, loading: false, remoteRowCount: count })
        }
      }
    })
  }

  render() {
    const { list, loading, remoteRowCount } = this.state
    return loading ? <div>loading</div> : <div>
      <h3>list</h3>
      <InfiniteLoader
        isRowLoaded={isRowLoaded(list)}
        loadMoreRows={loadMoreRows}
        rowCount={remoteRowCount}
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

const views = {
  list: <A />,
  // type: <B />,
  // date: <C />,
}

class Layout extends Component {
  constructor() {
    super()
    this.state = { view: 'list', }
  }

  componentDidUpdate() {
    console.log('layout did update')
  }

  render() {
    const { view } = this.state
    return <div>
      <nav>
        <button onClick={(() => this.setState({ view: 'list' }))}>list</button>
        <button onClick={(() => this.setState({ view: 'type' }))}>by type</button>
        <button onClick={(() => this.setState({ view: 'date' }))}>by date</button>
      </nav>
      {views[view]}
    </div>
  }
}

Meteor.startup(function () {
  const app = document.getElementById('app')
  render(<Layout />, app)
})
