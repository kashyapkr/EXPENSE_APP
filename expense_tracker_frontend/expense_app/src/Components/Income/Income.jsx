import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layout'
import IncomeForm from './IncomeForm'
import { useGlobalContext } from '../../context/GlobalContext'
import IncomeItem from './IncomeItem'

function Income({}) {

  const {addIncome,incomes,getIncomes,deleteItem,totalIncome,income} = useGlobalContext();

  useEffect(()=>{
    getIncomes();
    totalIncome();

  },[]) 


  return (
    <IncomeStyled>
        <InnerLayout>
            <h2 className='total-income'>Total Income: <span>₹{income}</span></h2>
            <div className="income-content">
              <div className="form-container">
                <IncomeForm/>

              </div>
              <div className="incomes">
                  {incomes.slice().reverse().map((income)=>{
                    const{id,title,amount,description,createdAt,category,type} = income;
                    const indicator = type==="INCOME"? "var(--color-green)": "red"
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
                    
                    />
                  })}
              </div>
            </div>
        </InnerLayout>
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`
  display: flex;
    overflow-y: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        /* overflow-y: visible; */
        .incomes{
            flex: 1;
            /* overflow-y: visible */
        }
        
    }
`

export default Income