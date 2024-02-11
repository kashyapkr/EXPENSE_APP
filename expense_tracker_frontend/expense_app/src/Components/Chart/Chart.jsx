import React, { useEffect } from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import {Line} from 'react-chartjs-2'

import { useGlobalContext } from '../../context/GlobalContext'
import { dateFormat } from '../../Utils/dateFormat'
import styled from 'styled-components'


ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)


const Chart = () => {

    

    const{incomes,expenses,totalIncome,totalExpense,getIncomes,getExpenses} =  useGlobalContext();

    useEffect(()=>{
        getIncomes();
        getExpenses();
    })

    const data = {
        labels: incomes.map((inc)=>{
            const{createdAt}  = inc
            return dateFormat(createdAt)
        }),
        datasets: [

            {
                label:'Income',
                data:[
                    ...incomes.map((income)=>{
                        const{amount} = income
                        return amount
                    })
                ],
                backgroundColor:'green',
                tension: .2
            },
            {
                label:'Expense',
                data:[
                    ...expenses.map((expense)=>{
                        const{amount} = expense
                        return amount
                    })
                ],
                backgroundColor:'red',
                tension: .2

                
            }
        ]
    }




  return (
    <ChartSytled>
            <Line data={data}/>
    </ChartSytled>
  )
}

const ChartSytled = styled.div`

    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`


export default Chart
