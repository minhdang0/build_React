import React from 'react'

const InputText = ({ label, type, placeholder, value, onChange, error }) => {
    return (
        <>
            <div>
                <label>{label}</label>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {error && <p>{error}</p>}
            </div>
        </>
    )
}

export default InputText
