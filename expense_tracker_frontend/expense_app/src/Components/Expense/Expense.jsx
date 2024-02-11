
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layout'
import { useGlobalContext } from '../../context/GlobalContext'
import IncomeItem from '../Income/IncomeItem';
import ExpenseForm from './ExpenseForm';


function Expense() {

  const {addExpense,expenses,getExpenses,deleteItem,totalExpense,expense} = useGlobalContext();

  useEffect(()=>{
    getExpenses();
    totalExpense();

  },[]) 


  return (
    <ExpenseStyled>
        <InnerLayout>
        <h2 className='total-income'>Total Expense: <span>₹{expense}</span></h2>
            <div className="income-content">
              <div className="form-container">
                <ExpenseForm/>
              </div>
              <div className="incomes">
                  {expenses.slice().reverse().map((expense)=>{
                    const{id,title,amount,description,createdAt,category,type} = expense;
                    return <IncomeItem
                    key={id}
                    id={id} 
                    title={title} 
                    description={description} 
                    amount={amount} 
                    createdAt={createdAt} 
                    type={type}
                    category={category} 
                    indicatorColor="var( --color-dot)"
                    deleteItem={deleteItem}
                    
                    />
                  })}
              </div>
            </div>
        </InnerLayout>
    </ExpenseStyled>
    
  )
}

const ExpenseStyled = styled.div`
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
            color: #e72828d7;
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

export default Expense