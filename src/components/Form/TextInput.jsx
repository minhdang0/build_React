function TextInput({ type = "text", name, register, placeholder, message }) {
  return (
    <div>
      <input type={type} placeholder={placeholder} name={name} {...register} />
      {message && <p>{message}</p>}
    </div>
  );
}

export default TextInput;
