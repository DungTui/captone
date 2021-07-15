import React, { useState, useContext, useEffect } from 'react'
import { Fragment } from 'react';
import { db } from '../config/Config';
import { OrderStaffContext } from '../global/OrderStaffContext';

export const OrderStaff = () => {

    const [information, setInformation] = useState([]);
    const { orderStaff } = useContext(OrderStaffContext);
    // const test = 1;
    // useEffect(() => {
    //     const data = []
    //     orderStaff.map(o => {
    //         var infor = { userId: o.BuyerID, infor: [] }
    //         db.collection('Buyer-info').doc(o.BuyerID).collection('Information').onSnapshot(snapshot => {
    //             let change = snapshot.docChanges();
    //             change.forEach(changes => {
    //                 if (changes.type === "added") {
    //                     infor.infor.push({
    //                         InforID: changes.doc.id
    //                     })
    //                 }
    //             })
    //         })
    //         data.push(infor)

    //     })
    //     if (data) return setInformation(data)

    // }, [orderStaff])


    // useEffect(() => {
    //     // const prevOrstaff = []
    //     // db.collection('Buyer-info').onSnapshot(snapshot => {
    //     //     let change = snapshot.docChanges();
    //     //     change.forEach(changes => {
    //     //         if (changes.type === "added") {
    //     //             prevOrstaff.push({
    //     //                 BuyerID: changes.doc.id
    //     //             })
    //     //         }
    //     //         // setOrderStaff(prevOrstaff)
    //     //     })
    //     // })
    //     // console.log(prevOrstaff);

    //     // prevOrstaff.map(o => (
    //     // for (var i = 0; i < prevOrstaff.length() - 1; i++) {
    //     const data = []
    //     orderStaff.map(o => {
    //         var infor = { userId: o.BuyerID, infor: [] }
    //         db.collection('Buyer-info').doc(o.BuyerID).collection('Information').onSnapshot(snapshot => {
    //             let change = snapshot.docChanges();
    //             change.forEach(changes => {
    //                 if (changes.type === "added") {
    //                     infor.infor.push({
    //                         InforID: changes.doc.id
    //                     })
    //                 }
    //             })
    //         })
    //         data.push(infor)

    //     })
    //     setInformation(data)

    //     // orderStaff.map(o => (
    //     //     db.collection('Buyer-info').doc(o.BuyerID).collection('Information').onSnapshot(snapshot => {
    //     //         let change = snapshot.docChanges();
    //     //         var infor = []
    //     //         change.forEach(changes => {
    //     //             if (changes.type === "added") {
    //     //                 infor.push({
    //     //                     InforID: changes.doc.id
    //     //                 })
    //     //             }
    //     //             setInformation(infor)
    //     //         })
    //     //     })
    //     // ))
    // }, [orderStaff])

    return (
        <div>
            {/* {renderItem(orderStaff)} */}
        </div>
    )
}
