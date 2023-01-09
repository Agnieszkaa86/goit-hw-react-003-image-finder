import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({ modalImgLarge, show}) => {
   if (show) {
      window.addEventListener('keydown', e => {
        if (e.code === 'Escape') {
          this.setState({ show: false });
        }
      });
    }
  return (
    <Overlay onClick={show}>
      <ModalWindow>
        <img src={modalImgLarge} alt="" />
      </ModalWindow>
    </Overlay>
  );
};
Modal.propTypes = {
  modalImgLarge: PropTypes.string.isRequired,
  show: PropTypes.func.isRequired,
};
