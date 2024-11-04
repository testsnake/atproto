import { FormEventHandler, ReactNode, useEffect } from 'react'
import { useAsyncAction } from '../hooks/use-async-action'
import { Override } from '../lib/util'
import { Button } from './button'
import { FormCard, FormCardProps } from './form-card'

export type FormCardAsyncProps = Override<
  Omit<FormCardProps, 'cancel' | 'actions' | 'error'>,
  {
    onSubmit: FormEventHandler<HTMLFormElement>
    submitLabel?: ReactNode
    submitAria?: string

    onCancel?: () => void
    cancelLabel?: ReactNode
    cancelAria?: string

    onLoading?: (loading: boolean) => void
    errorSlot?: (error: Error) => ReactNode
  }
>

export default function FormCardAsync({
  onSubmit,
  submitAria = 'Submit',
  submitLabel = submitAria,

  onCancel = undefined,
  cancelAria = 'Cancel',
  cancelLabel = cancelAria,

  errorSlot = defaultErrorSlot,
  onLoading,
  children,

  ...props
}: FormCardAsyncProps) {
  const { loading, error, run } = useAsyncAction(onSubmit)

  useEffect(() => {
    onLoading?.(loading)
  }, [loading, onLoading])

  return (
    <FormCard
      {...props}
      onSubmit={run}
      error={error ? errorSlot(error) : undefined}
      cancel={
        onCancel && (
          <Button aria-label={cancelAria} onClick={onCancel}>
            {cancelLabel}
          </Button>
        )
      }
      actions={
        <Button
          color="brand"
          type="submit"
          aria-label={submitAria}
          loading={loading}
        >
          {submitLabel}
        </Button>
      }
    >
      {children}
    </FormCard>
  )
}

function defaultErrorSlot(_error: Error): ReactNode {
  return 'An unknown error occurred'
}
