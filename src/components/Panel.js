import React, { Component } from 'react'

class Main extends Component {
  render () {
    return (
      <div className='container center'>
        <h1>Deanery example</h1>
        <br/><br/><br/><br/><br/>
        <h3>Contact the deanery</h3>
        <div className='row'>
          <div className='col col-5 jumbotron'>
            <h4>Ms. Kate Example</h4>
            <h4>Department of I.T., Physics and other cool science stuff</h4>
            <h4><a href='mailto:missKate@example.com'>Email the deanery</a></h4>
          </div>
          <div className='col col-2'/>
          <div className='col col-5 jumbotron'>
            <h4>Mr. Billy Herrington</h4>
            <h4>Department of Wrestling</h4>
            <h4><a href='mailto:billy@example.com'>Email the deanery</a></h4>
          </div>
        </div>
      </div>
    )
  }
}

export default Main
