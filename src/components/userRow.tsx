import React from 'react';

interface UserRowProps {
  fullName: string;
  username: string;
  thumbnail: string;
}

const UserRow: React.FC<UserRowProps> = ({ fullName, username, thumbnail }) => {
  return (
    <tr>
      <td className="px-4 py-2 border">
        <img src={thumbnail} alt={username} className="w-10 h-10 rounded-full" />
      </td>
      <td className="px-4 py-2 border">{fullName}</td>
      <td className="px-4 py-2 border">{username}</td>
    </tr>
  );
};

export default UserRow;
