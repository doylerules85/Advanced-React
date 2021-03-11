import useForm from '../lib/useForm';
import Form from './styles/Form';

function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'test',
    price: 2323,
    description: 'new description.',
  });
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(inputs);
      }}
    >
      <fieldset>
        <label htmlFor="image">
          Image
          <input id="image" name="image" type="file" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            placeholder="name"
            type="text"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          price
          <input
            id="price"
            name="price"
            placeholder="price"
            type="number"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="description"
            type="textarea"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ add</button>
        {/* <button type="button" onClick={resetForm}>
          Reset
        </button> */}
      </fieldset>
    </Form>
  );
}

export default CreateProduct;
