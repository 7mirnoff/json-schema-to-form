import { DynamicForm, type FieldValues, ResultDialog } from '@widgets'
import { useEffect, useState } from 'react'
import { SCHEMA_URL } from '@const'
import { Schema } from '@entities'
import { Container } from '@mui/material'
import { schema as data } from '@data'

const FROM_LOCAL_DATA = true

export function App() {
  const [formResult, setFormResult] = useState<FieldValues | undefined>()
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
  }, [])

  function handleSubmit(data: FieldValues) {
    console.log(data)
    setFormResult(data)
  }

  function closeDialog() {
    setFormResult(undefined)
  }

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
    <Container maxWidth="sm">
      <DynamicForm schema={schema} onSubmit={handleSubmit} />
      <ResultDialog data={formResult} onClose={closeDialog} />
    </Container>
  )
}
