export function FormSelect({
  id,
  label,
  name,
  value,
  onChange,
  options,
  error,
  disabled,
  required,
  hint,
}) {
  const inputId = id ?? (name ? String(name) : undefined) ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
          {label}
          {required ? <span className="text-red-500"> *</span> : null}
        </label>
      ) : null}
      <select
        id={inputId}
        name={name ?? inputId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={[
          'block w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition-colors',
          'focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30',
          error ? 'border-red-300' : 'border-slate-200',
          disabled ? 'cursor-not-allowed opacity-60' : '',
        ].join(' ')}
      >
        {options.map((opt) => (
          <option key={opt.value === '' ? '__empty' : opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && !error ? (
        <p id={`${inputId}-hint`} className="text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${inputId}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
