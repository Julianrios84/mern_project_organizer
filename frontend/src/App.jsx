import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/auth.context';
import { ProjectProvider } from './context/project.context';

import AuthLayout from './layouts/auth.layout';
import Protected from './layouts/protected.layout';

import Login from './pages/auth/login.page';
import Register from './pages/auth/register.page';
import Confirm from './pages/auth/confirm.page';
import ForgetPassword from './pages/auth/password/forget.page';
import ResetPassword from './pages/auth/password/reset.page';

import Projects from './pages/project/projects.page';
import CreateProject from './pages/project/create.page';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="reset" element={<ForgetPassword />} />
              <Route path="reset/:token" element={<ResetPassword />} />
              <Route path="confirm/:token" element={<Confirm />} />
            </Route>
            <Route path="/projects" element={<Protected />}>
              <Route index element={<Projects />} />
              <Route path="create" element={<CreateProject />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
