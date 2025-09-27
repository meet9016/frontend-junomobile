import React from 'react'

const CommanInput = ({
    name,
    value,
    onChange,
    placeholder,
    disabled = false,
    maxLength,
    type = "text",
    className,
}) => {
    const defaultClass =
        "w-full rounded-md bg-white px-3 py-3 outline-none focus:ring-2 ring-[#251C4B]/30 placeholder-black"
    return (
        <div>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={maxLength}
                className={className ? className : defaultClass}
            />
        </div>
    )
}

export default CommanInput
