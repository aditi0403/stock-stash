import ItemContext from "./itemContext";
import { useState } from "react";

const ItemState = (props) => {
  const host = "http://localhost:5000"
    const itemsInitial= []

      const [items, setItems] = useState(itemsInitial)

      // Get all items
      const getItems = async () => {
        // API call
        const response = await fetch(`${host}/api/items/fetchallitems`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });
        const json = await response.json();
        setItems(json)
      }


      // add a item
      const addItem = async (pantryitem, category, tag) => {
        try {
          // API call
        const response = await fetch(`${host}/api/items/additem`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({pantryitem, category, tag})
        });

        const item = await response.json();
        setItems(items.concat(item))
        } catch (error) {
          console.error('Error adding item:', error);
        }
      }

      // delete a item
      const deleteItem = async (id) => {
        //api call
        const response = await fetch(`${host}/api/items/deleteitem/${id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        });
        const json = await response.json();
        console.log(json)
        const newItems = items.filter((item) => {return item._id!==id})
        setItems(newItems)
      }

      // edit a item 
      const editItem = async (id, pantryitem, category, tag) => {
        // API call
        const response = await fetch(`${host}/api/items/updateitem/${id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({pantryitem, category, tag})
        });
        const json = await response.json();
        console.log(json)

        let newItems = JSON.parse(JSON.stringify(items))
        //logic to edit in client 
        for (let index=0; index< newItems.length; index++){
          const element = newItems[index]
          if(element._id === id){
            newItems[index].pantryitem = pantryitem;
            newItems[index].category = category;
            newItems[index].tag = tag;
            break;
          }
        }
        setItems(newItems);
      }

    return (
        <ItemContext.Provider value={{items, addItem, deleteItem, editItem, getItems}}>
            {props.children}
        </ItemContext.Provider>
    )
}

export default ItemState;