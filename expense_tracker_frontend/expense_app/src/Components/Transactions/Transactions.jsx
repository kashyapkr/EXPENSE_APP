import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import IncomeItem from '../Income/IncomeItem'
import { getAllTransactions } from '../Service/AppService'
import { useGlobalContext } from '../../context/GlobalContext'

const Transactions = () => {
    const{deleteItem,getalltrans,transactions} = useGlobalContext()


    useEffect(()=>{

        getalltrans();


    },[])

  return (
    <TransactionsStyled>
        <h2>All Transactions</h2>
        {transactions.slice().reverse().map((t)=>{
                    const{id,title,amount,description,createdAt,category,type} = t;
                    const indicator = type==="INCOME"?"var(--color-green)":"red";
                    return <IncomeItem
                    key={id}
                    id={id} 
                    title={title} 
                    description={description} 
                    amount={amount} 
                    createdAt={createdAt} 
                    type={type}
                    category={category} 
                    indicatorColor={indicator}
                    deleteItem={deleteItem}
                    
                    />})}
    </TransactionsStyled>
  )
}

const TransactionsStyled = styled.div`
    display: flex;
    flex-direction: column;
    /* background-color: black; */
    padding: 3rem;
    gap: 0.5rem;

    h2{
      font-size: 2.2rem;
      font-weight: 600;
      text-align: center;
    }

    

`

export default Transactions