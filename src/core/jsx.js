import React from 'react'

const Element = function () {
  return (
    <div className='greeting'>Hello JSX!</div>
  )
}

const Element2 = function () {
  const element = React.createElement('div', {className: 'greeting', tabIndex: 1}, 'Hello ', React.createElement('div', {className: 'greeting', tabIndex: 1}, 'JSX1 ', 'JSX2 '))
  
  console.log('element: ', element);

  return element
}


export default function () {
  return (
    <>
      <div>jsx------------------------------------</div>
      <Element />
      <Element2 />

      {
        [1, 2, 3]
      }
      {
        true
      }
    </>
  )
}