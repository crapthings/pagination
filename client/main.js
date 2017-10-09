import _ from 'lodash'
import moment from 'moment'

import React, { Component } from 'react'
import { render } from 'react-dom'

import { A } from './a'
import { B } from './b'

const views = {
  list: <A />,
  type: <B />,
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
