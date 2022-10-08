import './Input.css'

export default function Input({ placeholder = '', onInputChange }) {
  return (
    <input
      className="input"
      type="text"
      placeholder={placeholder}
      onChange={onInputChange}
    />
  )
}
