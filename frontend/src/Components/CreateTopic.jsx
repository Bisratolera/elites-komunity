import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaImage, FaFile, FaSmile, FaGift } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { users } from '../data/lists'; // Adjust import path if necessary

const gf = new GiphyFetch('FLd8KaiLj0FTXytUqhH7FPNYmhuGbTMH'); // Replace with your Giphy API key

const CreateTopic = ({ onCreate, onClose }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifUrl, setGifUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [selectedUser, setSelectedUser] = useState(users[0]); // Default to the first user

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCreate = () => {
    const newItem = {
      content,
      image,
      file,
      link,
      location,
      gifUrl,
      user: selectedUser // Include the selected user
    };
    onCreate(newItem);
    onClose(); // Close the modal after creating
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const onEmojiClick = (emojiData) => {
    const emoji = String.fromCodePoint(...emojiData.unified.split('-').map((u) => '0x' + u));
    setContent((prevInput) => prevInput + emoji);
    setShowEmojiPicker(false);
  };

  const handleGifSearch = async (query) => {
    if (query.trim() === '') {
      setGifs([]);
      return;
    }
    const { data } = await gf.search(query, { offset: 0, limit: 10 });
    setGifs(data);
  };

  const handleGifSelect = (gif) => {
    setGifUrl(gif.images.original.url); // Set the GIF URL directly
    setShowGifPicker(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl max-w-3xl w-full h-full md:h-3/4 overflow-y-auto transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-2xl font-semibold text-white">Create a Post</h2>
        </div>

        {/* User Selection */}
        <div className="p-4 border-b border-gray-700">
          <label className="block text-gray-300 mb-2">Select User</label>
          <select
            value={selectedUser.username}
            onChange={(e) => setSelectedUser(users.find(user => user.username === e.target.value))}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
          >
            {users.map((user) => (
              <option key={user.username} value={user.username}>
                {user.name} ({user.carrierType})
              </option>
            ))}
          </select>
        </div>

          {image && (
            <div className="mb-4">
              <img
                src={image}
                alt="Selected"
                className="w-fit h-64 object-cover rounded-lg mx-9 mb-2"
              />
            </div>
          )}
        <div className="p-4">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={handleContentChange}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg resize-none h-32 mb-4 text-white"
          />

          {/* Image, File, Link, and Location Inputs */}
          <div className="flex items-center justify-start space-x-7 mb-4">
            <label className="cursor-pointer text-[#ffd000] hover:text-white">
              <FaImage className="text-xl" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <label className="cursor-pointer text-[#ffd000] hover:text-white">
              <FaFile className="text-xl" />
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <button
              className="text-xl text-[#ffd000] hover:text-white"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <FaSmile />
            </button>
            <button
              className="text-xl text-[#ffd000] hover:text-white"
              onClick={() => setShowGifPicker(!showGifPicker)}
            >
              <FaGift />
            </button>
          </div>

          {showEmojiPicker && (
            <div className="mb-4">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}

          {showGifPicker && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search GIFs..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleGifSearch(e.target.value);
                }}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg mb-2 text-white"
              />
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {gifs.map((gif) => (
                  <img
                    key={gif.id}
                    src={gif.images.preview_gif.url}
                    alt={gif.title}
                    className="cursor-pointer w-full h-auto rounded-lg"
                    onClick={() => handleGifSelect(gif)}
                  />
                ))}
              </div>
            </div>
          )}

          <input
            type="text"
            placeholder="Add a link (optional)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg mb-4 text-white"
          />

          <input
            type="text"
            placeholder="Add your location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg mb-4 text-white"
          />

          {/* Selected Image and GIF Preview */}

          {gifUrl && (
            <div className="mb-4">
              <img
                src={gifUrl}
                alt="GIF"
                className="w-full h-64 object-cover rounded-lg mb-2"
              />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={handleCreate}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateTopic.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateTopic;
