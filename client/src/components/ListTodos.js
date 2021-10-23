import React, { useEffect, useState } from "react";

// Components
import EditTodo from "./EditTodo";

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    //  GET todos
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            console.log(jsonData);
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    // DELETE todos
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(
                `http://localhost:5000/todos/${id}`,
                {
                    method: "DELETE",
                }
            );
        } catch (err) {
            console.error(err.message);
        } finally {
          getTodos();
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo={todo}/>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteTodo(todo.todo_id)}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                    {/*                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>*/}
                </tbody>
            </table>
        </>
    );
};

export default ListTodos;
