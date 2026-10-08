import { useState } from 'react';

function Transactions({ books, setBooks, transactions, setTransactions }) {
  const [bookId, setBookId] = useState('');
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState('');

  function changeStock(type) {
    const book = books.find(b => b.id === Number(bookId));
    const qty = Number(amount);
    if (!book) { setMessage('Please select a book.'); return; }
    if (!qty || qty < 1) { setMessage('Enter a valid quantity.'); return; }
    if (type === 'Borrow' && book.quantity < qty) { setMessage('There are not enough copies available.'); return; }
    const newQuantity = type === 'Add Stock' ? book.quantity + qty : book.quantity - qty;
    setBooks(books.map(b => b.id === book.id ? { ...b, quantity: newQuantity } : b));
    setTransactions([{ id: Date.now(), book: book.title, type, quantity: qty, date: new Date().toLocaleString() }, ...transactions]);
    setMessage('Transaction saved.');
    setBookId(''); setAmount(1);
  }

  return <div className="container"><h1>Transactions</h1><p className="intro">Add stock or record borrowed books.</p>
    <section className="panel"><h2>Stock Transaction</h2><label>Book</label><select value={bookId} onChange={e => setBookId(e.target.value)}><option value="">Select a book</option>{books.map(book => <option key={book.id} value={book.id}>{book.title} (Available: {book.quantity})</option>)}</select>
      <label>Quantity</label><input className="small-input" type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} />
      <div className="form-buttons"><button onClick={() => changeStock('Add Stock')}>Add Stock</button><button onClick={() => changeStock('Borrow')}>Borrow Book</button></div>{message && <p className="message">{message}</p>}
    </section>
    <section className="panel"><h2>Transaction History</h2>{transactions.length === 0 ? <p>No transactions yet.</p> : <table><thead><tr><th>Book</th><th>Action</th><th>Quantity</th><th>Date</th></tr></thead><tbody>{transactions.map(t => <tr key={t.id}><td>{t.book}</td><td>{t.type}</td><td>{t.quantity}</td><td>{t.date}</td></tr>)}</tbody></table>}</section>
  </div>;
}
export default Transactions;
