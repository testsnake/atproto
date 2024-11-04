import { SyntheticEvent, useCallback, useState } from 'react'
import { useRandomString } from '../hooks/use-random-string'
import { checkAndFormatEmailOtpCode } from '../lib/email-otp'
import { Override } from '../lib/util'
import { Fieldset } from './fieldset'
import FormCardAsync, { FormCardAsyncProps } from './form-card-async'
import { LockIcon } from './icons/lock-icon'
import { TokenIcon } from './icons/token-icon'
import { InputText } from './input-text'

export type ResetPasswordConfirmFormProps = Override<
  FormCardAsyncProps,
  {
    onSubmit: (code: string, password: string) => void | PromiseLike<void>

    codeAria?: string
    codeLabel?: string
    codePlaceholder?: string
    codePattern?: string
    codeFormat?: string
    codeParseValue?: (value: string) => string | false

    passwordAria?: string
    passwordLabel?: string
    passwordPlaceholder?: string
  }
>

export function ResetPasswordConfirmForm({
  onSubmit,

  codeLabel = 'Reset code',
  codeAria = 'You will receive an email with a "reset code". enter that code here then enter your new password.',
  codeFormat = 'XXXXX-XXXXX',
  codePlaceholder = `Looks like ${codeFormat}`,
  codePattern = '^[A-Z2-7]{5}-[A-Z2-7]{5}$',
  codeParseValue = checkAndFormatEmailOtpCode,

  passwordAria = 'Enter your new password',
  passwordLabel = 'New password',
  passwordPlaceholder = 'Enter a password',

  ...props
}: ResetPasswordConfirmFormProps) {
  const codeAriaId = useRandomString({ prefix: 'reset-pwd-email-' })

  const [loading, setLoading] = useState(false)

  const doSubmit = useCallback(
    async (
      event: SyntheticEvent<
        HTMLFormElement & {
          code: HTMLInputElement
          password: HTMLInputElement
        },
        SubmitEvent
      >,
    ) => {
      event.preventDefault()

      const code = codeParseValue(event.currentTarget.code.value)
      const password = event.currentTarget.password.value

      if (code && password) await onSubmit(code, password)
    },
    [codeParseValue, onSubmit],
  )

  return (
    <FormCardAsync {...props} onLoading={setLoading} onSubmit={doSubmit}>
      <p id={codeAriaId} className="text-sm">
        {codeAria}
      </p>

      <Fieldset title={codeLabel} disabled={loading}>
        <InputText
          icon={<TokenIcon className="w-5" />}
          name="code"
          type="text"
          placeholder={codePlaceholder}
          aria-labelledby={codeAriaId}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          dir="auto"
          enterKeyHint="next"
          required
          pattern={codePattern}
          title={codeFormat}
          autoFocus={true}
          onChange={(event) => {
            // current position
            const pos = event.currentTarget.selectionStart ?? undefined

            // format value before pos
            const normalize = (value: string) =>
              value.toUpperCase().replaceAll(/[^A-Z2-7]/g, '')

            let beforePos = normalize(event.currentTarget.value.slice(0, pos))
            if (beforePos.length >= 5) {
              beforePos = `${beforePos.slice(0, 5)}-${beforePos.slice(5)}`
            }

            const afterPos =
              pos == null ? '' : normalize(event.currentTarget.value.slice(pos))

            let chars = `${beforePos}${afterPos}`
            if (!chars.includes('-') && chars.length > 5) {
              chars = `${chars.slice(0, 5)}-${chars.slice(5)}`
            }

            event.currentTarget.value = chars.slice(0, 11)
            event.currentTarget.selectionStart =
              event.currentTarget.selectionEnd = beforePos.length
          }}
        />
      </Fieldset>

      <Fieldset title={passwordLabel} disabled={loading}>
        <InputText
          icon={<LockIcon className="w-5" />}
          name="password"
          type="password"
          placeholder={passwordPlaceholder}
          aria-labelledby={passwordAria}
          title={passwordLabel}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="new-password"
          dir="auto"
          enterKeyHint="done"
          spellCheck="false"
          required
        />
      </Fieldset>
    </FormCardAsync>
  )
}
