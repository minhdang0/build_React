import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function Form({
  children,
  schema,
  defaultValues = {},
  formProps = {},
  onSubmit,
}) {
  const config = {
    defaultValues,
    ...formProps,
  };
  if (schema) {
    config.resolver = yupResolver(schema);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(config);

  const inputs = React.Children.toArray(children).map((child) => {
    if (!child?.props?.name) return child;

    return React.cloneElement(child, {
      register: register(child.props.name),
      message: errors[child.props.name]?.message,
    });
  });

  return <form onSubmit={handleSubmit(onSubmit)}>{inputs}</form>;
}

export default Form;
