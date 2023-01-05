import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({ modalImgLarge, closeImg }) => {
  return (
    <Overlay onClick={closeImg}>
      <ModalWindow>
        <img src={modalImgLarge} alt="" />
      </ModalWindow>
    </Overlay>
  );
};
Modal.propTypes = {
  modalImgLarge: PropTypes.string.isRequired,
  closeImg: PropTypes.func.isRequired,
};
