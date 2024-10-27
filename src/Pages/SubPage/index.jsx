import React, { useEffect, useState } from "react"

import { useLocation } from 'react-router-dom';
import AddStudents from './AddStudents';
import { auth, db } from "../../DataBase/firebase";
import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { ToastContainer } from 'react-toastify';

const Index = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sid = queryParams.get('sid');

    const [groupListData, setGroupListData] = useState([]);
    const getData = async () => {
        const contentDocRef = query(collection(db, "student_list"),
            where("refId", "==", sid),

        );
        const contentDocSnapshot = await getDocs(contentDocRef);
        let data = contentDocSnapshot?.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));

        setGroupListData(data);
    }

    useEffect(() => {
        getData();
    }, [])

    const dataFetch=()=>{
        getData();
    }
    return (
        <>
        <ToastContainer/>
            <div className="fullheight">
                <div className="container fullheight colourclass">
                    <div className="m-5 mt-0">
                        <div className="pt-5">
                            <AddStudents id={sid} dataFetch={dataFetch}/>
                        </div>
                        <div className="mt-3">
                            <div>
                                <div class="container">
                                    <table class="responsive-table">
                                        <thead class="responsive-table__head">
                                            <tr class="responsive-table__row">
                                                <th class="responsive-table__head__title responsive-table__head__title--name">S/No

                                                </th>
                                                <th class="responsive-table__head__title responsive-table__head__title--status">Student Name</th>
                                                <th class="responsive-table__head__title responsive-table__head__title--types">Email</th>
                                                <th class="responsive-table__head__title responsive-table__head__title--update">Phone Number</th>
                                            </tr>
                                        </thead>
                                        <tbody class="responsive-table__body">
                                            {groupListData.length !== 0 ? (
                                                <>
                                                    {groupListData?.map((item, index) => {
                                                        return (
                                                            <tr class="responsive-table__row">
                                                                <td class="responsive-table__body__text responsive-table__body__text--name">
                                                                    {index + 1}
                                                                </td>
                                                                <td class="responsive-table__body__text responsive-table__body__text--status">{item?.studentName}</td>
                                                                <td class="responsive-table__body__text responsive-table__body__text--types">{item?.studentEmail}</td>
                                                                <td class="responsive-table__body__text responsive-table__body__text--update">{item?.studentPhone}</td>
                                                            </tr>
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Index;