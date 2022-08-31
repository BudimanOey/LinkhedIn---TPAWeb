import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Auth, UnAuth } from './Middlewares/Auth'
import ActivatePage from './pages/ActivatePage'
import ResetPasswordPage from './pages/ResetPassword/ResetPasswordPage'
import InsertNewpassPage from './pages/ResetPassword/InsertNewpassPage'
import ProfilePage from './pages/ProfilePage'
import UserContextProvider from './contextProvider/userContext'
import RefetchUserProvider from './contextProvider/RefetchUserContext'


function App() {
  
  const client = new ApolloClient({
    uri: 'http://localhost:7070/query',
    cache: new InMemoryCache(),
  })

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <UserContextProvider>
          <RefetchUserProvider>
            <Routes>
              <Route path='/' element={<UnAuth><LoginPage/></UnAuth>}/>
              <Route path='/register' element={<UnAuth><RegisterPage/></UnAuth>}/>
              <Route path='/:id' element={<UnAuth><ActivatePage/></UnAuth>}/>
              <Route path='/resetpass' element={<ResetPasswordPage/>}/>
              <Route path='/resetpass/:id' element={<InsertNewpassPage/>}/>
              <Route path='/home' element={<Auth><HomePage/></Auth>}/>
              <Route path='/network' element={<Auth><HomePage/></Auth>}/>
              <Route path='/profile/:id'element={<Auth><ProfilePage/></Auth>}/>
            </Routes>
          </RefetchUserProvider>
        </UserContextProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default App