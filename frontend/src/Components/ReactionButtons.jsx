import { FaSmile } from 'react-icons/fa';

const ReactionButtons = () => {
  return (
    <div className="flex space-x-2 mt-4">
      <button className="text-xl text-gray-400 hover:text-white">
        <FaSmile />
      </button>
    </div>
  );
};

export default ReactionButtons;
