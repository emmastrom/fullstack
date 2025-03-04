import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  console.log(value)

  const reset = () => {
    setValue('')
  }

  const onChange = (event) => {
    if (event === null) {
        reset
    } else {
        setValue(event.target.value)
    }
  }

  return {
    type,
    value,
    onChange
  }
}