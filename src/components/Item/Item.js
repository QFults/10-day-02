const Item = props => {
  return (
    <div key={props.index}>
      <p
        className={props.item.isDone ? 'done' : ''}
        onClick={() => props.handleIsDone(props.index)}
      >
        {props.item.text}
      </p>
      <button onClick={() => props.handleDeleteItem(props.index)}>x</button>
    </div>
  )
}

export default Item
