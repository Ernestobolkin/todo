import { useState, useEffect } from "react";

export function Todo() {
  let todoText = [];
  const [todo, setTodo] = useState("");
  const [check, setCheck] = useState("");
  const [isCheck, setIsCheck] = useState(true);
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    todos.forEach((todo) => {
      todoText.push(todo.text);
    });
    if (!todoText.includes(todo)) {
      if (todo !== "") {
        setTodos([...todos, { id: todos.length + 1, text: todo.trim() }]);
      }
    }
    setTodo("");
  };

  const deleteTodo = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  };

  const checked = (e, id) => {
    if (e.target.localName === "li") {
      if (isCheck) {
        setCheck("line-through");
        setIsCheck(false);
      } else {
        setCheck("");
        setIsCheck(true);
      }
    }
  };

  const renderList = () => {
    return todos.map((todo) => (
      <li
        style={{ textDecoration: check }}
        onClick={(e) => checked(e, todo.id)}
        key={todo.id}
      >
        {todo.text}
        <button
          onClick={() => {
            deleteTodo(todo.id);
          }}
        >
          X
        </button>
      </li>
    ));
  };

  return (
    <div>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <input
          type="text"
          placeholder="Create a new todo"
          value={todo}
          onChange={(e) => handleInputChange(e)}
        />
        <button type="submit">Add</button>
      </form>
      <ul className="todo-list">{renderList()}</ul>
    </div>
  );
}
