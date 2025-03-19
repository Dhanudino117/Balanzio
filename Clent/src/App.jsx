import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import BudgetManagement from './Pages/BudgetManagement'
import SettingsPage from './Pages/SettingsPage'
import TransactionPage from './Pages/TransactionPage'
import Expenditure from './Pages/Expenditure'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}   />
      <Route path='/user-budget' element={<BudgetManagement />} />
      <Route path='/user-settings' element={<SettingsPage/>}/>
      <Route path='/user-transactions' element={<TransactionPage/>}/>
      <Route path='/user-settings' element={<SettingsPage/>}/>
      <Route path='/user-expenditure'element={<Expenditure/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
