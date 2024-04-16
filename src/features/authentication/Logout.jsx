import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import useLogout from '../../hooks/useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
  const { logout, isLogout } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isLogout}>
      {!isLogout ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
