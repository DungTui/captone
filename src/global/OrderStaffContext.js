import React, { createContext } from 'react'
import { db } from '../config/Config'

export const OrderStaffContext = createContext();

export class OrderStaffContextProvider extends React.Component {
    state = {
        orderStaff: []
    }

    componentDidMount() {
        const prevOrstaff = this.state.orderStaff;
        db.collection('Buyer-info').onSnapshot(snapshot => {
            let change = snapshot.docChanges();
            change.forEach(changes => {
                if (changes.type === "added") {
                    prevOrstaff.push({
                        BuyerID: changes.doc.id, 
                        information: changes.doc.data()
                    })
                    console.log("object", changes.doc.get().then)
                }
                this.setState({
                    orderStaff: prevOrstaff
                })
            })
        })
        // db.collection('Buyer-info').onSnapshot(snapshot => {
        //     let changes = snapshot.docChanges();
        //     changes.forEach(change => {
        //         if (change.type === "added") {
        //             prevOrstaff.push({
        //                 BuyerID: change.doc.id,
        //                 // BuyerCell: change.doc.data().BuyerCell,
        //                 // BuyerEmail: change.doc.data().BuyerEmail,
        //                 // BuyerName: change.doc.data().BuyerName,
        //                 // BuyerPayment: change.doc.data().BuyerPayment,
        //                 // BuyerQuantity: change.doc.data().BuyerQuantity
        //             })
        //         }
        //         this.setState({
        //             orderStaff: prevOrstaff
        //         })
        //     })
        // })
    }

    render() {
        return (
            <OrderStaffContext.Provider value={{ orderStaff: [...this.state.orderStaff] }}>
                {this.props.children}
            </OrderStaffContext.Provider>
        )
    }
}