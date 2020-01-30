import React from "react";
import Container from "@material-ui/core/Container";
import Modal from "./components/Modal";

const fields = [
    {value: "Name", type: 'name'},
    {value: "Surname", type: 'surname'},
    {value: "test@test.ru", type: 'email'},
    {value: "phone", type: 'phone'},
    {value: "", type: ""},
]

function App() {
    return (
        <Container>
            <Modal fields={fields}/>
        </Container>
    );
}

export default App;
