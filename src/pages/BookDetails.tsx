import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetails.css';

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  publishedDate: string;
  description: string;
  available: boolean;
}

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      const books : Book [] = JSON.parse(storedBooks);
      const found = books.find((b: any) => b.id.toString() === id);
      if (found) {
        setBook(found);
      }
    }
  }, [id]);

  const handleCheckout = () => {
    if(!book) return;

    const storedBooks = localStorage.getItem('books');
    if(storedBooks)
    {
        const books: Book[] = JSON.parse(storedBooks);
        const updatedBooks = books.map( (b) => 
            b.id === book.id ? {...b, available : false } : b
        );
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        setBook({...book, available : false});
    }
  }

  if (!book) {
    return <p className="book-details">Book not found.</p>;
  }

  return (
    <div className="book-details">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="book-card-details">
        <div className="image-box">
          <img src={book.image} alt={book.title} />
        </div>
        <div className="book-info">
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Published:</strong> {book.publishedDate}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={book.available ? 'available' : 'unavailable'}>
              {book.available ? 'Available' : 'Checked Out'}
            </span>
          </p>
          {book.available && <button onClick={handleCheckout}>Check Out</button>}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
