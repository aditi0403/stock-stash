import React, { useContext, useEffect, useRef, useState } from 'react';
import itemContext from "../context/items/itemContext";
import Itemitem from './Itemitem';
import AddItem from './AddItem';
import { useNavigate } from 'react-router-dom';

const Items = (props) => {
  const context = useContext(itemContext);
  const { items, getItems, editItem } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getItems();
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [item, setItem] = useState({ id: "", epantryitem: "", ecategory: "", etag: "" });

  const updateItem = (currentItem) => {
    ref.current.click();
    setItem({ id: currentItem._id, epantryitem: currentItem.pantryitem, ecategory: currentItem.category, etag: currentItem.tag });
  }

  const handleClick = (e) => {
    editItem(item.id, item.epantryitem, item.ecategory, item.etag);
    refClose.current.click();
    props.showAlert("Updated", "success");
  }

  const onChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  return (
    <>
      <AddItem showAlert={props.showAlert} />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit item</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Item</label>
                  <input type="text" className="form-control" id="epantryitem" name="epantryitem" value={item.epantryitem} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Category</label>
                  <input type="text" className="form-control" id="ecategory" name="ecategory" value={item.ecategory} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Remark</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={item.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={item.epantryitem.length < 5 || item.ecategory.length < 5} onClick={handleClick} type="button" className="btn btn-secondary">Update item</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <h2>Your Items</h2>
        <div className="container mx-1">
          {items.length === 0 && 'No Items Anymore!'}
        </div>
        {items.map((item) => {
          // Make sure item._id is unique and defined
          return <Itemitem key={item._id} updateItem={updateItem} showAlert={props.showAlert} item={item} />;
        })}
      </div>
    </>
  )
}

export default Items;
