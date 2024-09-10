import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black  backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 bg-opacity-0 backdrop-blur-lg rounded-lg shadow-lg p-4 relative max-w-4xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-300 transition duration-150"
        >
          <FaTimes size={24} />
        </button>
        <img
          src={imageUrl}
          alt="Full view"
          className="w-full h-auto max-h-[90vh] object-contain"
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Modal;
