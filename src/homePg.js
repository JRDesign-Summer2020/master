import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
class MyRouter extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Route path='/' component={MyComponent} />
      </BrowserRouter>
    )
  }
}
class ParentComponent extends React.Component {
  render () {
    return <ChildComponent />
  }
}
class ChildComponent extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  redirectToTarget = () => {
    this.context.router.history.push(`/target`)
  }
  render () {
    return (
      <div>
        {this.renderRedirect()}
        <button onClick={this.redirectToTarget}>Redirect</button>
      </div>
    )
  }
}
