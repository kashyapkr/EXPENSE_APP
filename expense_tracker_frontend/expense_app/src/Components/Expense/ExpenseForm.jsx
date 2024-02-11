import React, { useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/GlobalContext'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Button from '../Button/Button';
import { plus } from '../../Utils/icons';
import { format } from 'date-fns';

const ExpenseForm = () => {
    const {addExpense,addIncome, getExpenses, error, setError}  = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        description: '',
        category: '',
        createdAt: '',
        amount: '',
        type:'EXPENSE'
    });

    const handleInput = (name)=>(e)=>{
        
        setInputState({
            ...inputState,
            [name]: e.target.value})
          
    }
    const handelThis = (e)=>{
     
        e.preventDefault();
        if (!(inputState.createdAt instanceof Date && !isNaN(inputState.createdAt))) {
            setError("Enter a valid date");
            return;
        }


       
        const formattedDate = format(inputState.createdAt, 'dd/MM/yyyy');
         addExpense({ ...inputState, createdAt: formattedDate });
         setError('');
        // addIncome({ ...inputState, createdAt: formattedDate });

        console.log("Expense added")
       
        setInputState({
            title: '',
            amount: '',
            createdAt: '',
            category: '',
            description: '',
            type:'EXPENSE'
        })

    }
    const { title, amount, createdAt, category,description } = inputState;

  return (
    <ExpenseFormStyled onSubmit={handelThis}>
        {error && <p className='error'>{error}</p>}
             <div className="input-control">
                <input 
                    type="text" 
                    value={inputState.title}
                    name={'title'} 
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input value={inputState.amount}  
                    type="text" 
                    name={'amount'} 
                    placeholder='Expense Amount'
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className="input-control">
            <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    selected={createdAt}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, createdAt:date});
                    }}
                />

            </div>
            <div className="selects input-control">
                <select required value={inputState.category} name="category" id="category" onChange={handleInput('category')}>
                     <option value="" disabled >Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>  
                    <option value="other">Other</option> 
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={inputState.description} placeholder='Add A Reference'
                 id="description" cols="30" rows="4" 
                 onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button
                name={'Add expense'}
                icon={plus}
                bPad={'.8rem 1.6rem'}
                bRad={'30px'}
                bg={'var(--color-accent'}
                color={'#fff'}

                />
                

            </div>

    </ExpenseFormStyled>
  )
}


const ExpenseFormStyled = styled.form`
      display: flex;
    flex-direction: column;
    gap: 1.5rem;
    /* position: absolute; */
    .error{
        color: #ef2929;
        font-weight: 500;
        /* margin-bottom: 15px;
         */
        text-align: center;
    }

    input, textarea,select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }

    }
    .input-control{
        input{
            width: 100%;
        }
    }
    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }
    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
                
            }
        }
    }
    
`

export default ExpenseForm