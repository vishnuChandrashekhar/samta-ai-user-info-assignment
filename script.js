
async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetching user info:', error);
    return [];
  }
}


function displayUsers(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user.name;
    userList.appendChild(li);
  });
}




function searchUsers() {
  const searchInput = document.getElementById('search');
  const searchTerm = searchInput.value.trim().toLowerCase();


  getUsers().then(users => {
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm));
    displayUsers(filteredUsers);
  });
  updatePastSearchTerms(searchTerm);
}




function updatePastSearchTerms(searchTerm) {
  const pastSearchTerms = JSON.parse(localStorage.getItem('pastSearchTerms')) || [];
  pastSearchTerms.push(searchTerm);

  const uniqueSearchTerms = [...new Set(pastSearchTerms)];

  localStorage.setItem('pastSearchTerms', JSON.stringify(uniqueSearchTerms));
  displayPastSearchTerms(uniqueSearchTerms);
}




function displayPastSearchTerms(searchTerms) {
  const pastSearchTermsList = document.getElementById('pastSearchTerms');
  pastSearchTermsList.innerHTML = ''; 

  searchTerms.forEach(term => {
    const li = document.createElement('li');
    li.textContent = term;
    pastSearchTermsList.appendChild(li);
  });
}



function sortByName() {
  getUsers().then(users => {
    const sortedUsers = users.slice().sort((a, b) => a.name.localeCompare(b.name));
    displayUsers(sortedUsers);
  });
}


getUsers().then(displayUsers);
displayPastSearchTerms(JSON.parse(localStorage.getItem('pastSearchTerms')) || []);
