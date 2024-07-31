import React from 'react';
import UserRow from './userRow';

interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  login: {
    username: string;
  };
  picture: {
    thumbnail: string;
  };
}

interface UserTableProps {
  users: User[];
  onSort: (sortBy: 'name' | 'username') => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onSort }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-4 py-2 border">Thumbnail</th>
          <th className="px-4 py-2 border cursor-pointer" onClick={() => onSort('name')}>
            Full Name
          </th>
          <th className="px-4 py-2 border cursor-pointer" onClick={() => onSort('username')}>
            Username
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <UserRow
            key={index}
            fullName={`${user.name.title} ${user.name.first} ${user.name.last}`}
            username={user.login.username}
            thumbnail={user.picture.thumbnail}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
