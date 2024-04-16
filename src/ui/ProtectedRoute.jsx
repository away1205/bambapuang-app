import styled from 'styled-components';
import useUser from '../hooks/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isPending, isAuthenticated } = useUser();

  // 3. If there is no authenticated user, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate('/login');
  }, [isAuthenticated, isPending, navigate]);

  // 2. While loading, show a spinner
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is a user, redirect to the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
