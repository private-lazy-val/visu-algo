import React, {useState} from "react";

type FormValues = {
    [key: string]: string;
}
export function useForm(initialValues: FormValues) {
    const [values, setValues] = useState<FormValues>(initialValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}