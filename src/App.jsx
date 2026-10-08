import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Transactions from './pages/Transactions';
import Users from './pages/Users';

const starterBooks = [
  { id: 1, title: 'Things Fall Apart', author: 'Chinua Achebe', genre: 'Fiction', isbn: '9780385474542', quantity: 3 },
  { id: 2, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Novel', isbn: '9780061122415', quantity: 1 },
  { id: 3, title: 'Computer Basics', author: 'John Smith', genre: 'Technology', isbn: '9781234567890', quantity: 5 }
];

const starterUsers = [
  { id: 1, name: 'Admin User', membershipId: 'ADMIN001', role: 'Admin' }
];

function App() {
  const [books, setBooks] = useState(() => JSON.parse(localStorage.getItem('libraryBooks')) || starterBooks);
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('libraryUsers')) || starterUsers);
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('libraryTransactions')) || []);
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('libraryLoggedIn') === 'true');

  useEffect(() => localStorage.setItem('libraryBooks', JSON.stringify(books)), [books]);
  useEffect(() => localStorage.setItem('libraryUsers', JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem('libraryTransactions', JSON.stringify(transactions)), [transactions]);
  useEffect(() => localStorage.setItem('libraryLoggedIn', loggedIn), [loggedIn]);

  function login(name, membershipId) {
    const user = users.find(u => u.name.toLowerCase() === name.toLowerCase() && u.membershipId === membershipId);
    if (user) { setLoggedIn(true); return true; }
    return false;
  }

  function logout() { setLoggedIn(false); }

  return (
    <Routes>
      <Route path="/login" element={<Login users={users} login={login} />} />
      <Route path="*" element={loggedIn ? <Layout logout={logout}><RoutesInner books={books} setBooks={setBooks} users={users} setUsers={setUsers} transactions={transactions} setTransactions={setTransactions} /></Layout> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

function Login({ users, login }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [membershipId, setMembershipId] = useState('');
  const [error, setError] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!name || !membershipId) { setError('Please fill in both fields.'); return; }
    if (!login(name, membershipId)) { setError('User not found. Try Admin User and ADMIN001.'); return; }
    navigate('/');
  }

  return <div className="login-page"><form className="login-box" onSubmit={submit}>
    <h1>Community Library</h1><p>Login</p>
    <label>Name</label><input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
    <label>Membership ID</label><input value={membershipId} onChange={e => setMembershipId(e.target.value)} placeholder="Enter membership ID" />
    {error && <p className="error">{error}</p>}
    <button type="submit">Login</button>
    <small>Demo: Admin User / ADMIN001</small>
  </form></div>;
}

function Layout({ children, logout }) {
  const location = useLocation();
  return <div>
    <header><div className="header-inner"><h2>Community Library</h2><nav>
      <Link className={location.pathname === '/' ? 'active' : ''} to="/">Dashboard</Link>
      <Link className={location.pathname === '/books' ? 'active' : ''} to="/books">Books</Link>
      <Link className={location.pathname === '/transactions' ? 'active' : ''} to="/transactions">Transactions</Link>
      <Link className={location.pathname === '/users' ? 'active' : ''} to="/users">Users</Link>
      <button className="logout" onClick={logout}>Logout</button>
    </nav></div></header>
    <main>{children}</main>
  </div>;
}

function RoutesInner(props) {
  return <Routes>
    <Route path="/" element={<Dashboard books={props.books} />} />
    <Route path="/books" element={<Books books={props.books} setBooks={props.setBooks} />} />
    <Route path="/transactions" element={<Transactions books={props.books} setBooks={props.setBooks} transactions={props.transactions} setTransactions={props.setTransactions} />} />
    <Route path="/users" element={<Users users={props.users} setUsers={props.setUsers} />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}

export default App;
