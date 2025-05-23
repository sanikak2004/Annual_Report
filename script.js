const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'staff', password: 'staff2023' }
];

const reports = [
  { title: 'Computer Engineering Report 2023', year: '2023', department: 'Computer Engineering', file: 'https://example.com/computer_2023.pdf' },
  { title: 'ENTC Report 2023', year: '2023', department: 'ENTC', file: 'https://example.com/entc_2023.pdf' },
  { title: 'Civil Engineering Report 2023', year: '2023', department: 'Civil', file: 'https://example.com/civil_2023.pdf' },
  { title: 'Mechanical Report 2023', year: '2023', department: 'Mechanical', file: 'https://example.com/mechanical_2023.pdf' }
];

function checkLogin() {
  const isLoggedIn = localStorage.getItem('loggedIn');
  if (isLoggedIn === 'true') {
    showPortal();
  }
}

function handleLogin() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const error = document.getElementById('loginError');
  const found = users.find(u => u.username === user && u.password === pass);
  if (found) {
    localStorage.setItem('loggedIn', 'true');
    showPortal();
  } else {
    error.textContent = 'Invalid username or password';
  }
}

function handleLogout() {
  localStorage.removeItem('loggedIn');
  location.reload();
}

function showPortal() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('portalPage').style.display = 'block';
  renderReports();
}

const reportList = document.getElementById('reportList');
const searchInput = document.getElementById('searchInput');
const departmentSelect = document.getElementById('departmentSelect');

function renderReports() {
  const search = searchInput.value.toLowerCase();
  const department = departmentSelect.value;

  reportList.innerHTML = '';
  const filtered = reports.filter(report =>
    (report.title.toLowerCase().includes(search) || report.year.includes(search)) &&
    (department === '' || report.department === department)
  );

  if (filtered.length === 0) {
    reportList.innerHTML = '<p>No reports found.</p>';
    return;
  }

  filtered.forEach(report => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div>
        <h2>${report.title}</h2>
        <p>${report.department} | Year: ${report.year}</p>
      </div>
      <a href="${report.file}" class="view-button" target="_blank">View</a>
    `;
    reportList.appendChild(card);
  });
}

searchInput?.addEventListener('input', renderReports);
departmentSelect?.addEventListener('change', renderReports);

checkLogin();