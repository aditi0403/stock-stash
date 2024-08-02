import React from 'react'
import Items from './Items';

const Home = (props) => {
  return (
    <div>
      <Items showAlert={props.showAlert}/>
    </div>
  )
}

export default Home
