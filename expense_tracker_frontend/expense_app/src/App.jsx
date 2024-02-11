import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styled from 'styled-components'
import bg from './img/bg.png'
import { MainLayout } from './styles/Layout'
import Orb from './Components/Orb/orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard'
import Income from './Components/Income/Income'
import Expense from './Components/Expense/Expense'
import RegisterComponent from './Components/AuthComponent/RegisterComponent'
import LoginComponent from './Components/AuthComponent/LoginComponent'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Transactions from './Components/Transactions/Transactions'



function App() {
  const [active, setActive] = useState(1);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      case 2:
        return <Transactions/>
      case 3:
        return <Income />
      case 4:
        return <Expense />
      default:
        return <Dashboard />
    }
  }




  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])

  return (
    <Router>
    <AppStyled bg={bg} className='App'>
      {orbMemo}
      <MainLayout>
        <Routes>
          <Route path="/register" element={<RegisterComponent />}></Route>
          <Route path="/" element={<LoginComponent />}></Route>
          <Route path="/dashboard" element={
            <>
              <Navigation active={active} setActive={setActive} />
              <main>
                {displayData()}
              </main>
            </>
          }>
          </Route>
        </Routes>
      </MainLayout>
    </AppStyled>
    </Router>
  )
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App
