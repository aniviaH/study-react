import { useId } from 'react'

export function ExampleUseId() {
  const id = useId()

  console.log('id', id)
  return (
    <>
      <p>---------------------------------------------</p>
      <h3>内置hook useId</h3>

      <label htmlFor={id}>Do you like React?</label>
      <input id={id} type="checkbox" />

      <NameField></NameField>
    </>
  )
}

function NameField() {
  const id = useId()

  return (
    <div>
      <label htmlFor={id + '-firstName'}>First Name</label>
      <div>
        <input type="text" id={id + '-firstName'} />
      </div>

      <label htmlFor={id + '-lastName'}>Last Name</label>
      <div>
        <input type="text" id={id + '-lastName'} />
      </div>
    </div>
  )
}
