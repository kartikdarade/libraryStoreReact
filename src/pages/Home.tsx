// Home.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

interface Book {
    id: number;
    title: string;
    author: string;
    image: string;
    publishedDate: string;
    description: string;
    available: boolean;
}

const initialBooks: Book[] = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        image: "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg",
        publishedDate: "1925",
        description: "A novel set in the Jazz Age...",
        available: true,
    },
    {
        id: 2,
        title: '1984',
        author: 'George Orwell',
        image: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
        publishedDate: "1925",
        description: "A novel set in the Jazz Age...",
        available: true,
    },
    {
        id: 3,
        title: "It Ends with Us",
        author: "Colleen Hoover",
        image: "https://m.media-amazon.com/images/I/71EwoNQypZL._AC_UF1000,1000_QL80_.jpg",
        publishedDate: "2016",
        description: "A deeply emotional story of love, resilience, and the difficult choices we sometimes face in relationships.",
        available: true,
    },
    {
        id: 4,
        title: "It Starts with Us",
        author: "Colleen Hoover",
        image: "https://m.media-amazon.com/images/I/71PNGYHykrL._AC_UF1000,1000_QL80_.jpg",
        publishedDate: "2016",
        description: "A deeply emotional story of love, resilience, and the difficult choices we sometimes face in relationships.",
        available: true,
    }
];

const Home = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const storedBooks = localStorage.getItem('books');
        if (!storedBooks) {
            localStorage.setItem('books', JSON.stringify(initialBooks));
            setBooks(initialBooks);
        } else {
            setBooks(JSON.parse(storedBooks));
        }
    }, []);

    const handleCheckout = (id: number) => {
        const now = new Date();
        const returnDate = new Date();
        returnDate.setDate(now.getDate() + 7);

        const updatedBooks = books.map((book) =>
            book.id === id ? { 
                ...book, 
                available: false, 
                checkedOutDate : now.toISOString().split('T')[0] ,
                returnDate : returnDate.toISOString().split('T')[0],
             } : book
        );
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        setBooks(updatedBooks);
    };

    const handleImageClick = (id: number) => {
        navigate(`/book/${id}`);
    };

    return (
        <div className="home-container">
            <h2>Library Books</h2>
            <div className="book-list">
                {books.map((book) => (
                    <div className="book-card" key={book.id}>
                        <img 
                        src={book.image} 
                        alt={book.title} 
                        onClick={() => handleImageClick(book.id)}
                         style={{ cursor: 'pointer' }}
                          />
                        <h3>{book.title}</h3>
                        <p>Author: {book.author}</p>
                        <p className={book.available ? 'available' : 'unavailable'}>
                            {book.available ? 'Available' : 'Checked Out'}
                        </p>
                        {book.available && (
                            <button onClick={() => handleCheckout(book.id)}>Check Out</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
