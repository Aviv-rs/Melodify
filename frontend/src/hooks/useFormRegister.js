import { useEffect, useState } from 'react'
import { useEffectUpdate } from './useEffectUpdate'

export const useFormRegister = (initialFields, cb, isAsync = false) => {
  const [fields, setFields] = useState(initialFields)

  let asyncFields

  const getAsyncFields = async () => {
    asyncFields = await initialFields
    setFields(asyncFields)
  }

  useEffect(() => {
    if (isAsync) getAsyncFields()
  }, [])

  const handleChange = ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value || '' : target.value
    if (target.type === 'file') value = URL.createObjectURL(target.files[0])
    setFields(prevFields => ({ ...prevFields, [field]: value }))
  }

  const resetFields = () => {
    const emptyFields = {}
    for (let field in fields) {
      emptyFields[field] = ''
    }
    setFields(emptyFields)
  }

  useEffectUpdate(() => {
    if (cb) cb(fields)
  }, [fields])

  // onChange={handleChange} type="text" id="model" name="model" value={model}
  const register = (field, type = 'text') => {
    return {
      onChange: handleChange,
      type,
      id: field,
      name: field,
      value: type === 'file' ? '' : fields[field] || '',
    }
  }

  return [register, fields, resetFields]
}
