/**
 * Custom React hook for managing form state and validation using Yup schema validation.
 * 
 * @template T The expected shape of the form data.
 * @param {T} payload - Initial form data.
 * @param {Yup.Schema<T>} validationSchema - Optional Yup schema for form validation.
 * 
 * @returns {object} An object containing:
 * - handleChange: Function to update form data based on input changes.
 * - data: The current state of the form data.
 * - setData: Function to manually set the form data.
 * - errors: Object containing validation error messages, structured like the form data.
 * - setErrors: Function to manually set the form errors.
 * - validate: Function to validate the form data against the provided Yup schema.
 * - valid: Boolean indicating if the current form data is valid according to the Yup schema.
 * - clearErrors: Function to clear all form errors.
 * 
 * @example
 * const formSchema = Yup.object().shape({
 *   name: Yup.string().required("Name is required"),
 *   age: Yup.number().required("Age is required").positive("Age must be positive"),
 * });
 * const { handleChange, data, errors, validate, valid } = useForm({ name: '', age: 0 }, formSchema);
 * 
 * useEffect(() => {
 *   validate();
 * }, [data]);
 * 
 * return (
 *   <form>
 *     <input name="name" value={data.name} onChange={handleChange} />
 *     {errors.name && <p>{errors.name}</p>}
 *     <input name="age" type="number" value={data.age} onChange={handleChange} />
 *     {errors.age && <p>{errors.age}</p>}
 *     <button type="button" onClick={validate} disabled={!valid}>Submit</button>
 *   </form>
 * );
 */

import { useState } from 'react';
import * as Yup from 'yup'

function useForm<T>(payload: T, validationSchema?: Yup.Schema<T>) {
  const [data, setData] = useState<T>(payload); // State to hold form data
  const [errors, setErrors] = useState<T>(payload); // State to hold form validation errors
  const [valid, setValid] = useState<boolean>(false); // State to track if the form is valid

  // Function to handle changes in form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setData((prev: T) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Function to validate form data against the Yup schema
  const validate = async () => {
    setValid(false);
    try {
      setErrors(payload); // Reset errors before validation
      await validationSchema?.validate(data, { abortEarly: false });
      setValid(true); // Set valid to true if no exceptions were thrown
    } catch (error: any) {
      const errorsMap = new Map();
      
      error.inner.forEach((err: any) => {
        errorsMap.set(err.path, err.message); // Map errors to their respective paths
      })
      
      const newErrors = Object.fromEntries(errorsMap.entries()); // Convert map to object
      setErrors(newErrors); // Update the errors state
    }
  };

  // Function to clear all form errors
  const clearErrors = () => setErrors(payload);

  return {handleChange, data, setData, errors, setErrors, validate, valid, clearErrors};
}

export default useForm;