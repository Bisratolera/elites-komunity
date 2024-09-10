import { useState } from 'react';
import PropTypes from 'prop-types';
import EmojiPicker from 'emoji-picker-react';
import { FaSmile } from 'react-icons/fa';

const CommentBox = ({ onSubmit }) => {
  const [comment, setComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment); // Call the passed onSubmit function
      setComment(''); // Clear the comment input
      setShowEmojiPicker(false); // Hide emoji picker after submission
    }
  };

  const onEmojiClick = (emojiData) => {
    const emoji = String.fromCodePoint(...emojiData.unified.split('-').map((u) => '0x' + u));
    setComment((prevInput) => prevInput + emoji);
    setShowEmojiPicker(false); // Hide emoji picker after selection
  };

  return (
    <div className="relative p-4 bg-gray-700 rounded-lg mt-4">
      <textarea
        placeholder="Add a comment..."
        className="w-full p-2 bg-gray-600 rounded-lg border border-gray-500 resize-none mb-4"
        value={comment}
        onChange={handleCommentChange}
      />
      <div className="flex items-center justify-between">
        <button
          className="text-xl text-[#ffd000] hover:text-gray-200 transition duration-150 ease-in-out"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <FaSmile />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-full left-0 bg-gray-800 p-2 rounded-lg border border-gray-600 shadow-lg z-50">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <button
          className="bg-blue-500 px-4 py-2 rounded-lg text-white"
          onClick={handleCommentSubmit}
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

// PropTypes for validation
CommentBox.propTypes = {
  onSubmit: PropTypes.func.isRequired, // onSubmit is a required function prop
};

export default CommentBox;
