import React, { Component } from 'react'

const subjectList = [{id: 0, name: 'WDI'}, {id: 1, name: 'ASD'}]

class Subjects extends Component {
  render () {
    return (
      <div className='row'>
        <div className='col col-6 center'>
          <h2>Subject list</h2>
          <ul className='list-group'>
            {subjectList.map(subject => <li className='list-group-item list-group-item-info'>
              <h5>{subject.id}</h5>
              <h4>{subject.name}</h4>
            </li>)}
          </ul>
        </div>
      </div>
    )
  }
}

export default Subjects
