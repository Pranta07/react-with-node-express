import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    const nameRef = useRef();
    const emailRef = useRef();
    const genderRef = useRef();

    const handleAddUser = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const gender = genderRef.current.value;
        const newUser = { name: name, email: email, gender: gender };
        // console.log(newUser);

        fetch("http://localhost:5000/users", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then((res) => res.json())
            .then((user) => setUsers([...users, user]));
    };

    return (
        <div className="App">
            <h1>Hello React!</h1>
            <h2>Users loaded: {users.length}</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" placeholder="name" ref={nameRef} />
                <br />
                <input type="email" placeholder="email" ref={emailRef} />
                <br />
                <input type="text" placeholder="gender" ref={genderRef} />
                <br />
                <input type="submit" value="Add" />
            </form>
            <div>
                {users.map((user) => (
                    <p key={user.id}>
                        {user.id}. Name: {user.name} Gender: {user.gender}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default App;
