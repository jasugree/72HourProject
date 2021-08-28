import React, { useState } from 'react'
import { Button } from 'reactstrap'

const StateButton = (props) => {
  const [stateObj, setStateObj] = useState({key: 'test', anotherKey: '🔥'});  

  const handleClick = () => {
    setStateObj({testKey: 926})
    console.log(stateObj)
}
  return ( 
    <div>
      <Button onClick={handleClick}>
        Click me to add properties to state
      </Button>
    </div>
   );
}
 
export default StateButton;