import { DynamicForm, type SubmitHandler, type FieldValues } from '../widgets'


export function App() {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => console.log(data)

  return (
    <>
      <DynamicForm schema={null} onSubmit={handleSubmit} />
    </>
  )
}
