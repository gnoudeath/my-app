export const fetchUsers = async (page: number, resultsPerPage: number) => {
    const response = await fetch(`https://randomuser.me/api/?page=${page}&results=${resultsPerPage}`);
    const data = await response.json();
    return data.results;
  };
  