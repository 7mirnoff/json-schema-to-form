import { DynamicForm, type SubmitHandler, type FieldValues } from '@widgets'
import { useEffect, useState } from 'react'
import { SCHEMA_URL } from '@const'
import { Schema } from '@entities'
import { data } from '../../public/schema.ts'

const FROM_LOCAL_DATA = true

export function App() {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => console.log(data)
  const [schema, setSchema] = useState<Schema | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (FROM_LOCAL_DATA) {
      setSchema(data as Schema)
      return
    }

    setLoading(true)
    fetch(SCHEMA_URL)
      .then(response => response.json())
      .then(data => setSchema(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, []) // TODO

  if (error) {
    return <p>Ошибка</p>
  }

  if (loading) {
    return <p>Загрузка</p>
  }

  if (!schema) {
    return <p>Данный отсутствуют</p>
  }

  return (
    <>
      <DynamicForm schema={schema} onSubmit={handleSubmit} />
    </>
  )
}
