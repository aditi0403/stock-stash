import React, { useContext, useState }  from 'react'
import itemContext from "../context/items/itemContext";

const AddItem = (props) => {
    const context = useContext(itemContext);
  const {addItem} =  context;
  const [item, setItem] = useState({pantryitem:"", category:"", tag:""})

  const handleClick = (e) => {
    e.preventDefault();
    addItem(item.pantryitem, item.category, item.tag);
    setItem({pantryitem:"", category:"", tag:""})
    props.showAlert("Added", "success")
  }
  const onChange = (e) => {
    setItem({...item, [e.target.name]: e.target.value})
  }
  return (
    <div className="container my-5">
        <h2>Add a Item</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Item</label>
          <input type="text" className="form-control" id="pantryitem" name="pantryitem" aria-describedby="emailHelp" value={item.pantryitem} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Category</label>
          <input type="text" className="form-control" id="category" name="category" value={item.category} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Remark</label>
          <input type="text" className="form-control" id="tag" name="tag" value={item.tag} onChange={onChange} />
        </div>
        
        <button disabled={item.pantryitem.length<5 || item.category.length<5} type="submit" className="btn btn-secondary" onClick={handleClick}>Add Item</button>
      </form>
      </div>
  )
}

export default AddItem
