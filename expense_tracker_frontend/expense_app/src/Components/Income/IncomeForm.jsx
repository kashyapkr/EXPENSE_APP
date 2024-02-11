import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Button from '../Button/Button';
import { plus } from '../../Utils/icons';
import { format } from 'date-fns';
import { useGlobalContext } from '../../context/GlobalContext';
// import Button from '../Button/Button';

const IncomeForm = () => {

    const {addIncome, getIncomes, error, setError} = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        description: '',
        category: '',
        createdAt: '',
        amount: '',
        type:'INCOME'
    });


    const handleInput = (name)=>(e)=>{
        setInputState({
            ...inputState,
            [name]: e.target.value})
            console.log(error);
            
            ;
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        // console.log("Object is this:"+ inputState.createdAt);

        if (!(inputState.createdAt instanceof Date && !isNaN(inputState.createdAt))) {
            setError("Enter a valid date");
            return;
        }

        
        const formattedDate = format(inputState.createdAt, 'dd/MM/yyyy');
        addIncome({ ...inputState, createdAt: formattedDate });
        setError('');
        // console.log(error);
        setInputState({
            title: '',
            amount: '',
            createdAt: '',
            category: '',
            description: '',
            type:'INCOME'
        })

    }
   
    const { title, amount, createdAt, category,description } = inputState;

  return (
    <IncomeFormStyled  onSubmit={handleSubmit}>
        {error && <p className='error'>{error}</p>}
          <div className="input-control">
                <input 
                    type="text" 
                    value={inputState.title}
                    name={'title'} 
                    placeholder="Salary Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input value={inputState.amount}  
                    type="text" 
                    name={'amount'} 
                    placeholder={'Salary Amount'}
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
                    <option value=""  disabled >Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investiments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
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
                name={'Add income'}
                icon={plus}
                bPad={'.8rem 1.6rem'}
                bRad={'30px'}
                bg={'var(--color-accent'}
                color={'#fff'}

                />
            </div>


    </IncomeFormStyled>
  )
}


const IncomeFormStyled = styled.form`
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

export default IncomeForm