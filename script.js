
async function userInfo() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetching user info:', error);
    return [];
  }
}


function disUserInfo(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user.name;
    userList.appendChild(li);
  });
}




function srcUserInfo() {
  const searchInput = document.getElementById('search');
  const searchTerm = searchInput.value.trim().toLowerCase();


  userInfo().then(users => {
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm));
    disUserInfo(filteredUsers);
  });
  updateHistory(searchTerm);
}




function updateHistory(searchTerm) {
  const pastSearchTerms = JSON.parse(localStorage.getItem('pastSearchTerms')) || [];
  pastSearchTerms.push(searchTerm);

  const uniqueSearchTerms = [...new Set(pastSearchTerms)];

  localStorage.setItem('pastSearchTerms', JSON.stringify(uniqueSearchTerms));
  disUpdateHistory(uniqueSearchTerms);
}




function disUpdateHistory(searchTerms) {
  const pastSearchTermsList = document.getElementById('pastSearchTerms');
  pastSearchTermsList.innerHTML = ''; 

  searchTerms.forEach(term => {
    const li = document.createElement('li');
    li.textContent = term;
    pastSearchTermsList.appendChild(li);
  });
}



function sortByName() {
  userInfo().then(users => {
    const sortedUsers = users.slice().sort((a, b) => a.name.localeCompare(b.name));
    disUserInfo(sortedUsers);
  });
}


userInfo().then(disUserInfo);
disUpdateHistory(JSON.parse(localStorage.getItem('pastSearchTerms')) || []);
