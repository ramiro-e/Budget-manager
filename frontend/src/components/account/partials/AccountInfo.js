import React from 'react';
import {Link} from "react-router-dom";

function AccountInfo({accountInfo}){
    let value
    let valuecolor
    if(accountInfo.total_amount < 0){
        value = "-$" + accountInfo.total_amount.toString().replace('-', '')
        valuecolor = 'danger'
    }else{
        value = "$" + accountInfo.total_amount
        valuecolor = 'light'
    }
    return(
        <React.Fragment>
            <div className="text-decoration-none flex-fill">
                <div className={`bgcolor-${accountInfo.Account.color} p-2 rounded my-2 shadow-sm d-flex justify-content-between`}>
                    <h4 className="m-0 fw-bold overflow-protection text-light">{accountInfo.Account.name.toUpperCase()}</h4>
                    <h5 className={`m-0 fw-bold text-${valuecolor}`}>{value}</h5>
                </div>
            </div>
        </React.Fragment>
    )
}

AccountInfo.defaultProps = {accountInfo:{
    Account: { color:'', name:''},
    total_amount: 0

}

}
export default AccountInfo;