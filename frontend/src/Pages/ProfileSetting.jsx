import PropTypes from 'prop-types';
import { gitstats, programmingLanguages, EthicalHackingTypes, users } from "../data/lists";
import { useState, useEffect } from "react";

// Helper function to find user data by username
const findUserData = (username) => users.find(user => user.username === username);

// ProfileCard Component
const ProfileCard = ({ stats, userData, onClick, isDetailView }) => (
  <div className={`card bg-gray-700 shadow-xl w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mb-8 transform transition-all ${isDetailView ? '' : 'hover:scale-105 hover:shadow-2xl'}`}>
    <figure className="flex flex-col items-center p-6">
      <div className="relative">
        <img
          className={`rounded-full border-4 border-primary transform ${isDetailView ? 'w-48 h-48' : 'w-32 h-32'} transition-transform`}
          src={`https://github.com/${stats.user}.png?size=200`}
          alt={`${stats.user}'s profile`}
        />
      </div>
      <figcaption className="mt-4 text-center">
        <h2 className="text-3xl font-bold">{userData?.name || stats.user}</h2>
        <p className="text-lg text-gray-300">{userData?.carrierType || "Unknown"}</p>
        <button
          onClick={onClick}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
        >
          {isDetailView ? "Return" : "View Profile"}
        </button>
      </figcaption>
    </figure>
  </div>
);

ProfileCard.propTypes = {
  stats: PropTypes.shape({
    user: PropTypes.string.isRequired,
  }).isRequired,
  userData: PropTypes.shape({
    name: PropTypes.string,
    carrierType: PropTypes.string,
    code: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired,
  isDetailView: PropTypes.bool.isRequired,
};

// GitHubStats Component
const GitHubStats = ({ username }) => (
  <div className="mb-6">
    <p className="text-xl font-semibold mb-4">GitHub Stats</p>
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <img
        className="rounded-lg transform hover:scale-105 transition-transform"
        src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&bg_color=0D1117&title_color=ffffff&text_color=ffffff`}
        alt={`GitHub Stats for ${username}`}
      />
      <img
        className="rounded-lg transform hover:scale-105 transition-transform"
        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&bg_color=0D1117&title_color=ffffff&text_color=ffffff`}
        alt={`Top Languages for ${username}`}
      />
    </div>
  </div>
);

GitHubStats.propTypes = {
  username: PropTypes.string.isRequired,
};

// ProfileDetail Component
const ProfileDetail = ({ stats, userData, onBack }) => (
  <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="col-span-1">
        <ProfileCard stats={stats} userData={userData} onClick={onBack} isDetailView={true} />
        {userData?.bio ? (
          <p className="mt-4 text-xl text-gray-400 text-center">{userData.bio}</p>
        ) : (
          <p className="mt-4 text-xl text-gray-400 text-center">No bio available.</p>
        )}
      </div>
      <div className="col-span-1 grid grid-cols-1 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Motivations</h3>
          {/* Add motivation bars like in the image */}
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Personality</h3>
          {/* Add personality sliders like in the image */}
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Frustrations</h3>
          {/* Add frustrations list like in the image */}
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Favorite Brands</h3>
          {/* Add favorite brands icons like in the image */}
        </div>
      </div>
    </div>
    <div className="flex justify-center mt-4">
      <GitHubStats username={stats.user} />
    </div>
  </div>
);

ProfileDetail.propTypes = {
  stats: PropTypes.shape({
    user: PropTypes.string.isRequired,
  }).isRequired,
  userData: PropTypes.shape({
    bio: PropTypes.string,
  }),
  onBack: PropTypes.func.isRequired,
};

// ProfileSetting Component
const ProfileSetting = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      const fetchedUserData = findUserData(selectedUser);
      setUserData(fetchedUserData);
    } else {
      setUserData(null);
    }
  }, [selectedUser]);

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      {selectedUser ? (
        <ProfileDetail
          stats={gitstats.find(stat => stat.user === selectedUser)}
          userData={userData}
          onBack={() => setSelectedUser(null)}
        />
      ) : (
        gitstats.map((stats, index) => {
          const userData = findUserData(stats.user);

          return (
            <ProfileCard
              key={index}
              stats={stats}
              userData={userData}
              onClick={() => setSelectedUser(stats.user)}
              isDetailView={false}
            />
          );
        })
      )}
    </div>
  );
};

export default ProfileSetting;