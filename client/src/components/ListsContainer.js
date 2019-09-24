import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";
import NewListForm from "./NewListForm";
import EditListForm from "./EditListForm";

function ListsContainer() {
  const [lists, setLists] = useState([]);
  const [editingListId, setEditingListId] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/lists.json")
      .then(response => {
        console.log(response);
        setLists(response.data);
      })
      .catch(error => console.log(error));
  }, []);
  const addNewList = (title, excerpt) => {
    axios
      .post("/v1/lists", { list: { title, excerpt } })
      .then(response => {
        console.log(response);
        const updatedLists = [...lists, response.data];
        setLists(updatedLists);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const editList = (id, title, excerpt) => {
    axios
      .put("/v1/lists/" + id, {
        list: {
          title,
          excerpt
        }
      })
      .then(response => {
        console.log(response);
        const updatedLists = lists;
        updatedLists[id - 1] = { id, title, excerpt };
        setLists(updatedLists);
        setEditingListId(null);
      })
      .catch(error => console.log(error));
  };
  const removeList = id => {
    axios
      .delete("/v1/lists/" + id)
      .then(response => {
        const updatedLists = lists.filter(list => list.id !== id);
        setLists(updatedLists);
      })
      .catch(error => console.log(error));
  };
  const editingList = id => {
    setEditingListId(id);
  };
  return (
    <div className="lists-container">
      <NewListForm onNewList={addNewList} />

      {lists.map(list => {
        if (editingListId === list.id) {
          return <EditListForm list={list} key={list.id} editList={editList} />;
        } else {
          return (
            <List
              list={list}
              key={list.id}
              onRemoveList={removeList}
              editingList={editingList}
            />
          );
        }
      })}
    </div>
  );
}

export default ListsContainer;
