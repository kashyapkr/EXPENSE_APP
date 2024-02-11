import { createContext, useState ,useContext} from "react";
import { addTransaction as apiAddTransactions,getAllIncomes,getAllExpenses,deleteTransaction, getTotalIncome, getTotalExpese, historyApi, getAllTransactions} from "../Components/Service/AppService";

const GlobalContext = createContext();





export const GlobalProvider = ({children})=>{

    const[incomes,setIncomes] = useState([]); //list of income
    const[expenses,setExpenses] = useState([]); // list of expense
    const [error, setError] = useState('');
    const[income,setIncome]=useState(''); //total income
    const[expense,setExpense] = useState(''); //total expense
    const[transactions,setTransactions] = useState([]);

    //Add Income
    const addIncome = async(transactionDto)=>{
        const response = await apiAddTransactions(transactionDto)
        .catch(error=>{
            setError("ALl fields are necessary!");
        });

        getIncomes();
        totalIncome();
        

    }

    //Add Expnese
    const addExpense = async(transactionDto)=>{
        const response = await apiAddTransactions(transactionDto)
        .catch(error=>{
            console.log(error);
            setError("All fields are necessary!")
        });
        getExpenses();
        totalExpense();

    }


    //Get All Incomes
    const getIncomes = async()=>{
        const response = await getAllIncomes()
        .catch(error=>{
            setError(error.response.data.messsage);
        })
        setIncomes(response.data);

    }

    //Get All Expenses
    const getExpenses = async()=>{
        const response = await getAllExpenses()
        .catch(error=>{
            setError(error.response.data.messsage);
        })
        setExpenses(response.data);
    }

    //Delete
    const deleteItem = async(id)=>{
        const response  = await deleteTransaction(id).catch(error=>console.log(error));
        // getall();
        getIncomes();
        totalIncome();
        getExpenses();
        totalExpense();
        getalltrans();
    }
    //Total income
    const totalIncome = async()=>{
        const response = await getTotalIncome().catch(error=>console.log(error));
        setIncome(response.data);
        
    }

    //Total Expense
    const totalExpense = async()=>{
        const response = await getTotalExpese().catch(error=>console.log(error));
        setExpense(response.data);
       
    }
    const getalltrans = async()=>{
        const response = await getAllTransactions().catch(error=>console.log(error));
        setTransactions(response.data);
        
    }

  
    return(
        <GlobalContext.Provider value={{
            addIncome,
            addExpense,
            getIncomes,
            getExpenses,
            incomes,
            expenses,
            error,
            setError,
            deleteItem,
            totalIncome,
            income,
            expense,
           totalExpense,
           getalltrans,
           transactions,
           error
          
          

        }}>
            {children}
        </GlobalContext.Provider>
    )

}


export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}