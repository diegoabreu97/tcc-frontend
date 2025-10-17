import React from 'react'

const FormComponent = (props) => {
  return (
   
        <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.fieldName}>
            <div className="flex items-center border rounded-md py-2 px-3 text-gray-700 leading-tight focus-within:ring-2 focus-within:ring-blue-500">
            {props.icon}
            <input
                id={props.fieldName}
                type={props.type}
                name={props.fieldName}
                placeholder={props.placeholder}
                onChange={(e) => props.setForm({ ...props.form, [e.target.name]: e.target.value })}
                value={props.form[props.fieldName]}
                className="appearance-none border-none w-full bg-transparent text-gray-700 leading-tight focus:outline-none"
            />
            
            </div>
        </label>
        { props.errorMessages && props.fieldName in props.errorMessages &&
            <small className="text-red-600 mt-1 block text-sm">
                {props.errorMessages[props.fieldName]}
            </small>
            }
        </div>

   
  )
}

export default FormComponent