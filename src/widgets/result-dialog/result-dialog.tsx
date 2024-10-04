import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { ResultDialogProps } from './types'

export const ResultDialog: React.FC<ResultDialogProps> = ({ data, onClose }) => {
  if (!data) {
    return <></>
  }

  return (
    <Dialog onClose={onClose} open={!!data}>
      <DialogTitle>Result</DialogTitle>
      <DialogContent>
        <pre>
          <code>
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}