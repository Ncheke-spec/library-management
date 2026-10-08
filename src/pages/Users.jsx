import { useState } from 'react';

const empty = { name: '', membershipId: '', role: 'Member' };

function Users({ users, setUsers }) {
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.membershipId) { setMessage('Please fill in all fields.'); return; }
    if (editingId) { setUsers(users.map(u => u.id === editingId ? { ...u, ...form } : u)); setMessage('User updated.'); }
    else { setUsers([...users, { ...form, id: Date.now() }]); setMessage('User added.'); }
    setForm(empty); setEditingId(null);
  }
  function edit(user) { setEditingId(user.id); setForm({ name: user.name, membershipId: user.membershipId, role: user.role }); }
  function remove(id) { if (window.confirm('Delete this user?')) setUsers(users.filter(u => u.id !== id)); }

  return <div className="container"><h1>User Management</h1><p className="intro">Manage library users.</p>
    <section className="panel"><h2>{editingId ? 'Update User' : 'Add User'}</h2><form className="form-grid" onSubmit={submit}><div><label>Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div><div><label>Membership ID</label><input value={form.membershipId} onChange={e => setForm({ ...form, membershipId: e.target.value })} /></div><div><label>Role</label><select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}><option>Member</option><option>Admin</option></select></div><div className="form-buttons"><button type="submit">{editingId ? 'Update User' : 'Add User'}</button>{editingId && <button type="button" className="secondary" onClick={() => { setEditingId(null); setForm(empty); }}>Cancel</button>}</div></form>{message && <p className="message">{message}</p>}</section>
    <section className="panel"><h2>User List</h2><table><thead><tr><th>Name</th><th>Membership ID</th><th>Role</th><th>Actions</th></tr></thead><tbody>{users.map(user => <tr key={user.id}><td>{user.name}</td><td>{user.membershipId}</td><td>{user.role}</td><td><button onClick={() => edit(user)}>Update</button> <button className="danger" onClick={() => remove(user.id)}>Delete</button></td></tr>)}</tbody></table></section>
  </div>;
}
export default Users;
