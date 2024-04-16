import styled from 'styled-components';
import Button from './Button';
import Heading from './Heading';

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as='h3'>Delete {resourceName}</Heading>
      <p>
        Apakah anda yakin ingin menghapus {resourceName} secara permanent? Data
        tidak akan dapat dikembalikan.
      </p>

      <div>
        <Button
          variation='secondary'
          disabled={disabled}
          onClick={onCloseModal}
        >
          Batalkan
        </Button>
        <Button variation='danger' disabled={disabled} onClick={onConfirm}>
          Hapus
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
