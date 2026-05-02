import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState("");

  const fetchTodos = () => {
    axios.get("https://ample-motivation-production-a5c2.up.railway.app/get")
      .then(res => setTodos(res.data));
  };

  const toggleTodo = (id) => {
    axios.put(`https://ample-motivation-production-a5c2.up.railway.app/toggle/${id}`)
      .then(() => fetchTodos());
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = () => {
    if (!text || !date) return;

    axios.post("https://ample-motivation-production-a5c2.up.railway.app/add", { text, date })
      .then(() => {
        setText("");
        setDate("");
        fetchTodos();
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`https://ample-motivation-production-a5c2.up.railway.app/delete/${id}`)
      .then(() => fetchTodos());
  };

  // grouping
  const groupedTodos = todos.reduce((acc, todo) => {
    if (!acc[todo.date]) {
      acc[todo.date] = [];
    }
    acc[todo.date].push(todo);
    return acc;
  }, {});

  // format tanggal
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #dfeff6, #eaf6fb)",
  flexDirection: "column",
}}>

      <div style={{
      background: "rgba(173, 216, 230, 0.25)",  
      backdropFilter: "blur(10px)",           
      WebkitBackdropFilter: "blur(10px)",    
      border: "1px solid rgba(111, 56, 56, 0.3)",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
      width: "320px",
      textAlign: "center"
      }}>

        <h1 style={{ color: "#4a6b7a" }}>To Do List</h1>

        {/* INPUT */}
        <div style={{ marginBottom: "20px" }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Isi todo"
            style={{
            padding: "8px",
            width: "60%",
            borderRadius: "6px",
            border: "1px solid #cfe8f3",
            outline: "none"
          }}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
            padding: "8px",
            marginLeft: "5px",
            borderRadius: "6px",
            border: "1px solid #cfe8f3"
          }}
          />

          <button
            onClick={addTodo}
            style={{
            padding: "8px",
            marginLeft: "5px",
            background: "#136692",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
          >
            Add
          </button>
        </div>

        {/* LIST */}
        {Object.keys(groupedTodos)
          .sort((a, b) => new Date(a) - new Date(b))
          .map(date => (
            <div key={date} style={{ marginBottom: "20px", textAlign: "left" }}>

              {/* DATE */}
              <h4 style={{
              color: "#6c8fa3",
                marginBottom: "10px"
              }}>
                Date: {formatDate(date)}
              </h4>

              {/* TODO */}
              {groupedTodos[date].map(todo => (
                <div
                  key={todo._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "rgba(255,255,255,0.5)",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    transition: "0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#cfe8f3"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#eee"}
                >

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                  
                                      
                    {/* CHECKBOX */}
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo._id)}
                      style={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer"
                      }}
                    />

                    {/* TEXT */}
                    <span style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "#8aa9b8" : "#2f5d73"
                    }}>
                      {todo.text}
                    </span>

                  </div>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    style={{
                      background: "#136692",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>

                </div>
              ))}

            </div>
          ))}
      </div>
      <p style={{
        marginTop: "20px",
        fontSize: "12px",
        color: "#375d73",
        textAlign: "center"
      }}>
        Created by Ade Zaskia Azzahra
      </p>
    </div>
  );
}

export default App;