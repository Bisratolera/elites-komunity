import React from 'react';
import PropTypes from 'prop-types';

const TopicCard = ({ item, onDelete, onEdit }) => {
  const [showComments, setShowComments] = React.useState(false);

  return (
    <div className="topic-card">
      <div className="header">
        <img src={item.user.icon} alt={item.user.username} className="user-icon" />
        <div className="user-info">
          <h3>{item.user.name}</h3>
          <span>{item.user.carrierType}</span>
        </div>
      </div>
      <div className="content">
        <h2>{item.title}</h2>
        <p>{item.content}</p>
        {item.image && <img src={item.image} alt="Topic" />}
        {item.gifUrl && <img src={item.gifUrl} alt="Topic GIF" />}
        {item.file && <a href={item.file.url}>{item.file.name}</a>}
        {item.link && <a href={item.link}>Read more</a>}
        {item.location && <span>{item.location}</span>}
        {item.emoji && <span>{item.emoji}</span>}
      </div>
      <div className="footer">
        <button onClick={() => setShowComments(!showComments)}>
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
        <button onClick={() => onEdit(item)}>Edit</button>
        <button onClick={() => onDelete(item)}>Delete</button>
      </div>
      {showComments && (
        <div className="comments">
          {item.comments && item.comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>{comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

TopicCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    gifUrl: PropTypes.string,
    file: PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string
    }),
    link: PropTypes.string,
    location: PropTypes.string,
    emoji: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      carrierType: PropTypes.string.isRequired
    }).isRequired,
    comments: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default TopicCard;
