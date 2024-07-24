import React, { useEffect, useState } from "react";
import { Card, Container, InputGroup, Form, Button } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function getlocalstorage() {
  const savedTodos = JSON.parse(localStorage.getItem("mytodo"));
  return savedTodos || [];
}

export default function Todo() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState(getlocalstorage());
  const [error, setError] = useState("");
  const [editindex, seteditindex] = useState(null);

  useEffect(() => {
    localStorage.setItem("mytodo", JSON.stringify(todo));
  }, [todo]);

  const handleAdd = () => {
    if (input.trim() === "") {
      setError("To-do list can't be empty");
    } else {
      if (editindex !== null) {
        const updatedtodos = todo.map((todo, index) =>
          editindex === index ? input : todo
        );
        setTodo(updatedtodos);
        seteditindex(null);
      } else {
        setTodo([...todo, input]);
      }
      setInput("");
      setError("");
    }
  };

  const handledelete = (index) => {
    setTodo(todo.filter((_, i) => i !== index));
  };

  const handleedit = (index) => {
    setInput(todo[index]);
    seteditindex(index);
  };

  return (
    <div>
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Card style={{ width: "22rem" }}>
          <InputGroup className="p-3">
            <Form.Control
              placeholder="Add To-do"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={handleAdd}>
              {editindex !== null ? "Update" : "Add"}
            </Button>
          </InputGroup>
          {error && <p className="text-danger ps-3">{error}</p>}
        </Card>
        <div
          style={{ overflowY: "scroll", maxHeight: "20rem", width: "22rem" }}
          className="mt-3"
        >
          {todo.map((todoItem, index) => (
            <Card className="mt-3" key={index}>
              <div className="p-2 d-flex justify-content-between align-items-center">
                <span>{todoItem}</span>
                <div>
                  <EditIcon
                    className="text-success mx-2"
                    onClick={() => {
                      handleedit(index);
                    }}
                  />
                  <DeleteIcon
                    className="text-danger mx-2"
                    onClick={() => {
                      handledelete(index);
                    }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
