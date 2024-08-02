import React, { useContext }  from 'react'
import itemContext from "../context/items/itemContext";

const Itemitem = (props) => {
  const context = useContext(itemContext);
  const {deleteItem} = context;
  const {item, updateItem} = props;

  return (
    <div className="col-md-3">
      <div className="card my-3" >
        <div className="card-body">
            <h5 className="card-title">{item.pantryitem}</h5>
            <p className="card-text">{item.category}</p>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteItem(item._id);  props.showAlert("Deleted", "success")}}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateItem(item); }}></i>
        </div>
      </div>
    </div>
  )
}

export default Itemitem
