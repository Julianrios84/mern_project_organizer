import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/header.component';
import Sidebar from '../components/sidebar.component';
import useAuth from '../hooks/auth.hook';

const Protected = () => {
  const { auth, loading } = useAuth();
  if (loading) {
    return (
      <>
        <p>Cargando...</p>
      </>
    );
  }
  return (
    <>
      {auth._id ? (
        <div className='bg-gray-100'>
          <Header />
          <div className='md:flex md:min-h-screen'>
            <Sidebar />
            <main className='p-10 flex-1'>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Protected;
