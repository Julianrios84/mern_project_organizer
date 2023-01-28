import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/auth.layout'
import Login from './pages/auth/login.page'
import Register from './pages/auth/register.page'
import Confirm from './pages/auth/confirm.page'
import ForgetPassword from './pages/auth/password/forget.page'
import ResetPassword from './pages/auth/password/reset.page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout/>} >
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset" element={<ForgetPassword />} />
          <Route path="reset/:token" element={<ResetPassword />} />
          <Route path="confirm/:token" element={<Confirm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
