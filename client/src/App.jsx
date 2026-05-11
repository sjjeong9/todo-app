import { useState, useEffect } from "react";

const API = "/todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input.trim() }),
    });
    const todo = await res.json();
    setTodos((prev) => [...prev, todo]);
    setInput("");
  };

  const toggleTodo = async (id) => {
    const res = await fetch(`${API}/${id}`, { method: "PATCH" });
    const updated = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <h1>📋 Todo</h1>

      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="할 일을 입력하세요"
        />
        <button onClick={addTodo}>추가</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? "done" : ""}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button className="del" onClick={() => deleteTodo(todo.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      <p className="count">
        {todos.filter((t) => !t.done).length}개 남음 / 총 {todos.length}개
      </p>
    </div>
  );
}
