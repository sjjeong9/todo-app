const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store (배포용 - DB 불필요)
let todos = [
  { id: 1, text: "GitHub Flow 브랜치 전략 설정", done: false },
  { id: 2, text: "GitHub Actions CI 워크플로우 작성", done: false },
  { id: 3, text: "Railway 배포 연동", done: false },
];
let nextId = 4;

// GET /todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST /todos
app.post("/todos", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "text is required" });
  const todo = { id: nextId++, text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// PATCH /todos/:id
app.patch("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "not found" });
  todo.done = !todo.done;
  res.json(todo);
});

// DELETE /todos/:id
app.delete("/todos/:id", (req, res) => {
  todos = todos.filter((t) => t.id !== Number(req.params.id));
  res.status(204).end();
});

// Health check (Railway / CI용)
app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
