import { useState } from 'react';
import {
  FaComment,
  FaShareAlt,
  FaTrash,
  FaEdit,
  FaDownload,
  FaThumbsUp,
  FaThumbsDown,
} from 'react-icons/fa';
import CreateTopic from '../Components/CreateTopic';
import CommentBox from '../Components/CommentBox'; // Import CommentBox component
import Modal from '../Components/Modal'; // Import Modal component

const MainPage = () => {
  const [postedItems, setPostedItems] = useState([]);
  const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(null);
  const [replyToCommentIdx, setReplyToCommentIdx] = useState(null);
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteTopic = (idx) => {
    setPostedItems(postedItems.filter((_, i) => i !== idx));
  };

  const handleEditTopic = (idx) => {
    setEditIndex(idx);
    setIsCreateTopicOpen(true);
  };

  const handleCreateTopic = (newItem) => {
    if (editIndex !== null) {
      const updatedItems = [...postedItems];
      updatedItems[editIndex] = newItem;
      setPostedItems(updatedItems);
      setEditIndex(null);
    } else {
      setPostedItems([newItem, ...postedItems]);
    }
    setIsCreateTopicOpen(false);
  };

  const handleCloseCreateTopic = () => {
    setIsCreateTopicOpen(false);
    setEditIndex(null);
  };

  const handleCommentSubmit = (comment, idx) => {
    const updatedItems = [...postedItems];
    if (!updatedItems[idx].comments) {
      updatedItems[idx].comments = [];
    }
    updatedItems[idx].comments.push({
      text: comment,
      user: { icon: '😊', name: 'Anonymous' },
      reactions: { thumbsUp: 0, thumbsDown: 0 },
      replies: [],
    });
    setPostedItems(updatedItems);
    setShowCommentBox(null);
  };

  const handleReplySubmit = (reply, postIdx, commentIdx) => {
    const updatedItems = [...postedItems];
    if (!updatedItems[postIdx].comments[commentIdx].replies) {
      updatedItems[postIdx].comments[commentIdx].replies = [];
    }
    updatedItems[postIdx].comments[commentIdx].replies.push({
      text: reply,
      user: { icon: '😊', name: 'Anonymous' },
      reactions: { thumbsUp: 0, thumbsDown: 0 },
    });
    setPostedItems(updatedItems);
    setReplyToCommentIdx(null);
  };

  const handleReaction = (postIdx, commentIdx, reactionType, isReply) => {
    const updatedItems = [...postedItems];
    if (isReply) {
      const reactions = updatedItems[postIdx].comments[commentIdx].replies.find((_, idx) => idx === commentIdx)?.reactions;
      if (reactionType === 'thumbsUp') {
        reactions.thumbsUp += 1;
      } else if (reactionType === 'thumbsDown') {
        reactions.thumbsDown += 1;
      }
    } else {
      const reactions = updatedItems[postIdx].comments[commentIdx]?.reactions || updatedItems[postIdx].reactions;
      if (reactionType === 'thumbsUp') {
        reactions.thumbsUp += 1;
      } else if (reactionType === 'thumbsDown') {
        reactions.thumbsDown += 1;
      }
    }
    setPostedItems(updatedItems);
  };

  const openImageModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setModalImageUrl(null);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600 transition duration-150"
        onClick={() => {
          setIsCreateTopicOpen(true);
          setEditIndex(null);
        }}
      >
        Create New Post
      </button>

      {postedItems.map((item, idx) => (
        <div
          key={idx}
          className="bg-gray-800 p-6 rounded-lg mb-4 relative shadow-lg"
        >
          <div className="flex items-center text-start mb-4">
            <div className="text-4xl flex-shrink-0 mr-4 ring-green-400 ring rounded-full p-2">
              {item.user.icon}
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold">
                {item.user.name}
              </h3>
              <p className="text-gray-400">{item.user.carrierType}</p>
              <p className="text-gray-400">@{item.user.username}</p>
            </div>
          </div>

          <div className="relative mb-4 text-start">
            {item.image && (
              <div className="w-[300px] h-[300px] overflow-hidden rounded-lg mb-4 relative">
                <img
                  src={item.image}
                  alt="Posted"
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => openImageModal(item.image)}
                />
                <button
                  className="absolute bottom-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-lg"
                  onClick={() => openImageModal(item.image)}
                >
                  Full View
                </button>
              </div>
            )}
            {item.gifUrl && (
              <img
                src={item.gifUrl}
                alt="Selected GIF"
                className="h-[100px] w-[100px] object-cover rounded-lg border border-gray-600 shadow-md"
              />
            )}
            <p className="text-white text-start flex text-xl capitalize mb-4">
              {item.content}
            </p>
            {item.file && (
              <p className="text-gray-400 mb-4 items-center gap-2 flex">
                Attached File: {item.file.name}
                <a
                  href={URL.createObjectURL(item.file)}
                  download={item.file.name}
                >
                  <FaDownload className="text-blue-400 text-xl" />
                </a>
              </p>
            )}
            {item.link && (
              <a href={item.link} className="text-blue-400 mb-4 block">
                Link: {item.link}
              </a>
            )}
            {item.location && (
              <p className="text-gray-400 mb-4">Location: {item.location}</p>
            )}
            {item.emoji && (
              <p className="text-xl text-[#2dff2d] mb-4">{item.emoji}</p>
            )}
          </div>
          
          <div className="flex space-x-4 mb-4">
            <button
              className="flex items-center text-gray-400 hover:text-gray-300"
              onClick={() => handleReaction(idx, null, 'thumbsUp', false)}
            >
              <FaThumbsUp />
              <span className="ml-1">{item.reactions?.thumbsUp || 0}</span>
            </button>
            <button
              className="flex items-center text-gray-400 hover:text-gray-300"
              onClick={() => handleReaction(idx, null, 'thumbsDown', false)}
            >
              <FaThumbsDown />
              <span className="ml-1">{item.reactions?.thumbsDown || 0}</span>
            </button>
          </div>

          <div className="flex space-x-4 absolute bottom-4 right-4">
            <button
              className="text-gray-400 hover:text-gray-300 transition duration-150"
              onClick={() => setShowCommentBox(showCommentBox === idx ? null : idx)}
            >
              <FaComment />
            </button>
            <button className="text-gray-400 hover:text-gray-300 transition duration-150">
              <FaShareAlt />
            </button>
            <button
              className="text-blue-400 hover:text-blue-300 transition duration-150"
              onClick={() => handleEditTopic(idx)}
            >
              <FaEdit />
            </button>
            <button
              className="text-red-400 hover:text-red-500 transition duration-150"
              onClick={() => handleDeleteTopic(idx)}
            >
              <FaTrash />
            </button>
          </div>

          {showCommentBox === idx && (
            <CommentBox
              onSubmit={(comment) => handleCommentSubmit(comment, idx)}
              onClose={() => setShowCommentBox(null)}
            />
          )}

          {item.comments && item.comments.length > 0 && (
            <div className="mt-4 border-t border-gray-600 pt-4">
              <h4 className="text-gray-400 mb-2">Comments:</h4>
              <ul>
                {item.comments.map((comment, commentIdx) => (
                  <li key={commentIdx} className="text-gray-300 mb-4">
                    <div className="flex items-start mb-2">
                      <div className="text-2xl flex-shrink-0 mr-2 ring-green-400 ring rounded-full p-2">
                        {comment.user.icon}
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          {comment.user.name}<br />
                          {comment.user.username}
                        </p>
                        <p>{comment.text}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button
                            className="flex items-center text-gray-400 hover:text-gray-300"
                            onClick={() => handleReaction(idx, commentIdx, 'thumbsUp', true)}
                          >
                            <FaThumbsUp />
                            <span className="ml-1">{comment.reactions.thumbsUp}</span>
                          </button>
                          <button
                            className="flex items-center text-gray-400 hover:text-gray-300"
                            onClick={() => handleReaction(idx, commentIdx, 'thumbsDown', true)}
                          >
                            <FaThumbsDown />
                            <span className="ml-1">{comment.reactions.thumbsDown}</span>
                          </button>
                          <button
                            className="text-gray-400 hover:text-gray-300 text-sm"
                            onClick={() => setReplyToCommentIdx(replyToCommentIdx === commentIdx ? null : commentIdx)}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                    {replyToCommentIdx === commentIdx && (
                      <CommentBox
                        onSubmit={(reply) => handleReplySubmit(reply, idx, commentIdx)}
                        onClose={() => setReplyToCommentIdx(null)}
                      />
                    )}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-6 mt-4 border-l border-gray-600 pl-4">
                        <ul>
                          {comment.replies.map((reply, replyIdx) => (
                            <li key={replyIdx} className="text-gray-300 mb-2">
                              <div className="flex items-start mb-2">
                                <div className="text-2xl flex-shrink-0 mr-2 ring-green-400 ring rounded-full p-1">
                                  {reply.user.icon}
                                </div>
                                <div>
                                  <p className="text-white font-semibold">{reply.user.name}</p>
                                  <p>{reply.text}</p>
                                  <div className="flex items-center space-x-4 mt-2">
                                    <button
                                      className="flex items-center text-gray-400 hover:text-gray-300"
                                      onClick={() => handleReaction(idx, commentIdx, 'thumbsUp', true)}
                                    >
                                      <FaThumbsUp />
                                      <span className="ml-1">{reply.reactions.thumbsUp}</span>
                                    </button>
                                    <button
                                      className="flex items-center text-gray-400 hover:text-gray-300"
                                      onClick={() => handleReaction(idx, commentIdx, 'thumbsDown', true)}
                                    >
                                      <FaThumbsDown />
                                      <span className="ml-1">{reply.reactions.thumbsDown}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      {isCreateTopicOpen && (
        <CreateTopic
          onCreate={handleCreateTopic}
          onClose={handleCloseCreateTopic}
          initialData={editIndex !== null ? postedItems[editIndex] : null}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeImageModal}
        imageUrl={modalImageUrl}
      />
    </div>
  );
};

export default MainPage;
