import React from 'react';
import {Link} from "react-router-dom";

function SmallCard(props){
    let value
    let valuecolor
    if(props.balance < 0){
        value = "-$" + props.balance.toString().replace('-', '')
        valuecolor = 'danger'
    }else{
        value = "$" + props.balance
        valuecolor = 'light'
    }
    return(
        <React.Fragment>
            <div className="col-md-3 text-decoration-none d-inline-block">
            <Link to={`/account/${props.id}`} className="text-decoration-none">
                <div className={`bg-${props.color} p-2 rounded my-2 mx-1 shadow-sm d-flex justify-content-between d-md-block`}>
                    <h4 className="m-0 mb-md-3 fw-bold overflow-protection text-light">{props.name.toUpperCase()}</h4>
                    <h5 className={`m-0 text-end fw-bold text-${valuecolor}`}>{value}</h5>
                    
                </div>
            </Link>
            </div>
        </React.Fragment>
    )
}

SmallCard.defaultProps = {
    id: 0,
    userId: 0,
    name: '...',
    color: 'primary',
    balance: '0'
}

export default SmallCard;