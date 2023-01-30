import { useState, useEffect, createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clientAxios from '../config/axios.config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true)

  const location = useLocation();

  const navigate = useNavigate()

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false)
          return;
        }
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }; 
        const { data } = await clientAxios('/user/profile', config);
        setAuth(data);
        
        if(location.pathname === '/') {
          navigate('/projects')
        }
      } catch (error) {
        setAuth({});
      } finally {
        setLoading(false)
      }
      
    };
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
