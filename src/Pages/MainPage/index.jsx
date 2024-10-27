import React, { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table';
import AddModel from "./AddModel"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { auth, db } from "../../DataBase/firebase";
import {
    collection, getDocs,
} from "firebase/firestore";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { ToastContainer } from 'react-toastify';

const Index = () => {
    const [groupData, setGroupData] = useState([]);

    const getData = async () => {
        const contentDocRef = collection(db, "groups");
        const contentDocSnapshot = await getDocs(contentDocRef);
        let data = contentDocSnapshot?.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));

        setGroupData(data);
    }

    useEffect(() => {
        getData();
    }, [])
    
    const dataFetch=()=>{
        getData();
    }
    return (
        <>
            <ToastContainer />
            <div className="fullheight">
                <div className="container fullheight colourclass">
                    <div className="m-5 mt-0">
                        <div className="pt-5">
                            <AddModel dataFetch={dataFetch}/>
                        </div>
                        <Row className="mt-3">
                            {groupData.length !== 0 ? (
                                <>
                                    {groupData?.map((item, index) => {
                                        return (
                                            <>
                                                <Col md={3} className="mb-2">
                                                    <Card className="card_style">
                                                        <Card.Body className="body_styles">
                                                            <div className="d-flex justify-content-between">

                                                                <Card.Title className="alignments">  <FaUserGroup size={25} /> {" "}
                                                                    {item.groupname}</Card.Title>
                                                                <Link to={`/groupDetail?sid=${item.id}`} title="Add Student"><IoMdAddCircleOutline size={25} />
                                                                </Link>

                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </>
                                        )
                                    })}
                                </>
                            ) : (
                                <>
                                    <div className="text-center p-3">
                                        No Data Found
                                    </div>
                                </>
                            )}
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index;