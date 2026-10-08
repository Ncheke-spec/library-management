function Dashboard({ books }) {
  const totalTitles = books.length;
  const totalCopies = books.reduce((sum, book) => sum + Number(book.quantity), 0);
  const lowStock = books.filter(book => Number(book.quantity) < 2);

  return <div className="container">
    <h1>Dashboard</h1><p className="intro">Current library book availability.</p>
    <div className="cards"><div className="card"><h3>Book Titles</h3><strong>{totalTitles}</strong></div><div className="card"><h3>Total Copies</h3><strong>{totalCopies}</strong></div><div className="card"><h3>Low Stock</h3><strong>{lowStock.length}</strong></div></div>
    <section className="panel"><h2>Books</h2><table><thead><tr><th>Title</th><th>Author</th><th>Genre</th><th>Quantity</th></tr></thead><tbody>
      {books.map(book => <tr key={book.id} className={Number(book.quantity) < 2 ? 'low-stock' : ''}><td>{book.title}</td><td>{book.author}</td><td>{book.genre}</td><td>{book.quantity}{Number(book.quantity) < 2 && <span className="warning"> Low stock</span>}</td></tr>)}
    </tbody></table></section>
  </div>;
}
export default Dashboard;
