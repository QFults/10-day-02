const Form = props => {
  return (
    <form>
      <p>
        <label htmlFor='item'>item</label>
        <input
          type='text'
          name='item'
          value={props.item}
          onChange={props.handleInputChange}
        />
      </p>
      <button onClick={props.handleAddItem}>Add Item</button>
    </form>
  )
}

export default Form
