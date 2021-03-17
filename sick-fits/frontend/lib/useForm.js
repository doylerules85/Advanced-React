import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create object for inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    // destructure the value, name, type from target value
    let { value, name, type } = e.target;

    // check if number
    if (type === 'number') {
      value = parseInt(value);
    }

    // check if file
    if (type === 'file') {
      // give up the first element in the files array and assign it to value
      [value] = e.target.files;
    }

    // copy existing state
    setInputs({ ...inputs, [name]: value });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // return the things we want to surface from the custom hook -- important todo!
  return { inputs, handleChange, resetForm, clearForm };
}
