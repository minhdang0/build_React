
function TextInput({ type = "text", name, register, message }) {
    return (
        <div>
            <input type={type} name={name} {...register} />
            {message && <p>{message}</p>}
        </div>
    );
}

export default TextInput;