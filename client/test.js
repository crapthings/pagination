

// class B extends Component {
//   constructor() {
//     super()
//     this.state = { list: [], loading: true }
//   }

//   componentDidMount() {
//     // if (! this.refs.dom) return
//     Meteor.autorun(() => {
//       const test = Test.findOne('init')
//       const data = _.get(test, 'data', [])
//       Meteor.setTimeout(() => {
//         const list = _.chain(data)
//           .groupBy('type')
//           .toPairs()
//           .flattenDeep()
//           .value()
//         this.setState({ list, loading: false })
//       }, 0)
//     })
//   }

//   render() {
//     const { list, loading } = this.state
//     return loading ? <div>loading</div> : <div ref='dom'>
//       <h3>type</h3>
//       <List
//         width={300}
//         height={300}
//         rowCount={list.length}
//         rowHeight={20}
//         rowRenderer={({ key, index, style }) => {
//           const item = list[index]
//           return <div key={key} style={{...style, overflow: 'hidden', textOverflow: 'ellipsis'}}>
//             {_.isString(item) ? item : `${item.title}`}
//           </div>
//         }}
//       />
//     </div>
//   }
// }

// class C extends Component {
//   constructor() {
//     super()
//     this.state = { list: [], loading: true }
//   }

//   componentDidMount() {
//     // if (! this.refs.dom) return
//     Meteor.autorun(() => {
//       const test = Test.findOne('init')
//       const data = _.get(test, 'data', [])
//       const list = _.chain(data)
//         .groupBy(({createdAt}) => moment(createdAt).format('YYYY-MM-DD'))
//         .toPairs()
//         .flattenDeep()
//         .value()
//       this.setState({ list, loading: false })
//     })
//   }

//   render() {
//     const { list, loading } = this.state
//     return loading ? <div>loading</div> : <div ref='dom'>
//       <h3>date</h3>
//       <List
//         width={300}
//         height={300}
//         rowCount={list.length}
//         rowHeight={20}
//         rowRenderer={({ key, index, style }) => {
//           const item = list[index]
//           return <div key={key} style={{...style, overflow: 'hidden', textOverflow: 'ellipsis'}}>
//             {_.isString(item) ? item : `${item.title}`}
//           </div>
//         }}
//       />
//     </div>
//   }
// }
