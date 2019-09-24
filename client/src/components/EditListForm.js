import React, { useState } from "react";
function EditListForm(props) {
  const [form, setValues] = useState({
    id: props.list.id,
    title: props.list.title,
    excerpt: props.list.excerpt
  });
  const handleChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  function handleSubmit(e) {
    e.preventDefault();
    const { id, title, excerpt } = form;
    props.editList(id, title, excerpt);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Title..."
        value={form.title}
        onChange={handleChange}
      />
      <input
        name="excerpt"
        type="text"
        placeholder="Excerpt..."
        value={form.excerpt}
        onChange={handleChange}
      />
      <button>Update List</button>
    </form>
  );
}
export default EditListForm;
