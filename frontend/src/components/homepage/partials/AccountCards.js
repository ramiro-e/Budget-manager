import React from 'react';
import SmallCard from '../partials/SmallCard';

function AccountCards({accountsCards}){
    
    return (
        <React.Fragment>
            <div className="cards-container">
                {accountsCards.map((props,index)=>{
                    return <SmallCard  {...props}  key= {index}/>
                })}      
            </div>
        </React.Fragment>
    )
}

AccountCards.defaultProps = []

export default AccountCards;