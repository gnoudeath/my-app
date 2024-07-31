import React, { useEffect } from 'react';
import UserTable from './components/userTable';
import Pagination from './components/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { fetchUsersThunk, setPage, setSort, sortUsers } from './store/userSlice';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, currentPage, totalPages, sortBy, sortOrder } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUsersThunk({ page: currentPage, resultsPerPage: 10 }));
  }, [currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleSort = (sortBy: 'name' | 'username') => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSort({ sortBy, sortOrder: newSortOrder }));
    dispatch(sortUsers());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Table</h1>
      <UserTable users={users} onSort={handleSort} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
