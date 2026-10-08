import { useState } from 'react';

const empty = { title: '', author: '', genre: '', isbn: '', quantity: '' };

function Books({ books, setBooks }) {
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  function submit(e) {
    e.preventDefault();
    if (!form.title || !form.author || !form.genre || !form.isbn || form.quantity === '') { setMessage('Please fill in all fields.'); return; }
    const quantity = Number(form.quantity);
    if (quantity < 0) { setMessage('Quantity cannot be negative.'); return; }
    if (editingId) {
      setBooks(books.map(book => book.id === editingId ? { ...book, ...form, quantity } : book));
      setMessage('Book updated.');
    } else {
      setBooks([...books, { ...form, id: Date.now(), quantity }]);
      setMessage('Book added.');
    }
    setForm(empty); setEditingId(null);
  }

  function edit(book) { setEditingId(book.id); setForm({ title: book.title, author: book.author, genre: book.genre, isbn: book.isbn, quantity: book.quantity }); setMessage(''); window.scrollTo(0, 0); }
  function remove(id) { if (window.confirm('Delete this book?')) setBooks(books.filter(book => book.id !== id)); }
  function cancel() { setEditingId(null); setForm(empty); setMessage(''); }

  return <div className="container"><h1>Book Management</h1><p className="intro">Add, update and delete books.</p>
    <section className="panel"><h2>{editingId ? 'Update Book' : 'Add New Book'}</h2>
      <form className="form-grid" onSubmit={submit}>
        <div><label>Title</label><input name="title" value={form.title} onChange={change} /></div>
        <div><label>Author</label><input name="author" value={form.author} onChange={change} /></div>
        <div><label>Genre</label><input name="genre" value={form.genre} onChange={change} /></div>
        <div><label>ISBN</label><input name="isbn" value={form.isbn} onChange={change} /></div>
        <div><label>Initial Quantity</label><input type="number" min="0" name="quantity" value={form.quantity} onChange={change} /></div>
        <div className="form-buttons"><button type="submit">{editingId ? 'Update Book' : 'Add Book'}</button>{editingId && <button type="button" className="secondary" onClick={cancel}>Cancel</button>}</div>
      </form>{message && <p className="message">{message}</p>}
    </section>
    <section className="panel"><h2>Book List</h2><table><thead><tr><th>Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Quantity</th><th>Actions</th></tr></thead><tbody>
      {books.map(book => <tr key={book.id}><td>{book.title}</td><td>{book.author}</td><td>{book.genre}</td><td>{book.isbn}</td><td>{book.quantity}</td><td><button onClick={() => edit(book)}>Update</button> <button className="danger" onClick={() => remove(book.id)}>Delete</button></td></tr>)}
    </tbody></table></section>
  </div>;
}
export default Books;
