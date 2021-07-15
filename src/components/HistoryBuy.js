import React, { useContext } from 'react'
import { HistoryBuyContext } from '../global/HistoryBuyContext'

export const HistoryBuy = () => {

    const { historyBuy } = useContext(HistoryBuyContext);
    console.log(historyBuy);

    return (
        <div>
            {historyBuy.map(buy => (
                <div key={buy.BuyerID} className="historybuy">
                    <div>
                        {buy.BuyerID}
                    </div>
                    <div>
                        {buy.BuyerName}
                    </div>
                    <div>
                        {buy.BuyerEmail}
                    </div>
                    <div>
                        {buy.BuyerCell}
                    </div>
                    <div>
                        {buy.BuyerPayment}
                    </div>
                    <div>
                        {buy.BuyerQuantity}
                    </div>
                    <div>
                        ---------------------
                    </div>
                </div>
            ))}
        </div>
    )
}
