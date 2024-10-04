import { FieldValues } from 'react-hook-form'

export interface ResultDialogProps {
  data?: FieldValues
  onClose: () => void
}