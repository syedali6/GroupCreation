import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { auth, db } from "../../DataBase/firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import axios from 'axios';
import { toast } from 'react-toastify';

const AddStudents = ({ id,dataFetch }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getData = async (e) => {
        e.preventDefault();

        // const contentDocRef = collection(db, "student_list");
        // const docRef = await addDoc(contentDocRef, data);
        const data = {
            ...formData,
            refId: id,
        }
        try {
            const response = await axios.post(
                "http://localhost:5001/groupcreation-95ea3/us-central1/getStudentData",
                data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const Data = response.data;

            toast.success(Data.message);
        } catch (error) {
            console.error("Error posting data:", error);
        }
        handleClose();
        dataFetch();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <>
            <Button className='btn-styled' variant="primary" onClick={handleShow}>
                Add Members 
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Members</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => getData(e)}>
                        <div>
                            <Form.Label htmlFor="studentName">Name</Form.Label>
                            <Form.Control
                                type="text"
                                id="studentName"
                                name="studentName"
                                aria-describedby="passwordHelpBlock"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <Form.Label htmlFor="studentEmail">Email</Form.Label>
                            <Form.Control
                                type="email"
                                id="studentEmail"
                                name="studentEmail"
                                aria-describedby="passwordHelpBlock"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <Form.Label htmlFor="studentPhone">Phone Number</Form.Label>
                            <Form.Control
                                type="number"
                                id="studentPhone"
                                name="studentPhone"
                                aria-describedby="passwordHelpBlock"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>

                        <div className='text-end'>
                            <Button className='btn-styled mt-2' type='submit' variant="primary">
                                Add
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}
export default AddStudents;