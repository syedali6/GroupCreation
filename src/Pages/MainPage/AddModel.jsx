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

const addModel = ({dataFetch}) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getData = async (e) => {
        e.preventDefault();
        // const contentDocRef = collection(db, "groups");
        // const docRef = await addDoc(contentDocRef, data);
        const data = {
            ...formData,
        }
        try {
            const response = await axios.post(
                "http://localhost:5001/groupcreation-95ea3/us-central1/getData",
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
                Add Group           
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => getData(e)}>
                        <div>
                            <Form.Label htmlFor="groupname">Group Name</Form.Label>
                            <Form.Control
                                type="text"
                                id="groupname"
                                name="groupname"
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
export default addModel;