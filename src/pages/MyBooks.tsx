import React, { useEffect, useState } from "react";
import './Home.css'

interface Book {
    id: number;
    title: string;
    author: string;
    image: string;
    publishedDate: string;
    description: string;
    available: boolean;
    checkedOutDate?: string;
    returnDate?: string;
}

const MyBooks = () => {
    const [checkedOutBooks, setcheckedOutBooks] = useState<Book[]>([])

    useEffect(() => {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            const books: Book[] = JSON.parse(storedBooks);
            const checkedOut = books.filter(book => !book.available);
            setcheckedOutBooks(checkedOut);
            console.log(checkedOut.length)
        }
    }, [])

    return (
        <div className="home-container">
            <h3>My Checked out Books</h3>
            <div className="book-list">
                {checkedOutBooks.length > 0 ? (
                    checkedOutBooks.map(book => (
                        <div className="book-card">
                            <img src={book.image} alt={book.title}></img>
                            <h3>{book.title}</h3>
                            <p>Author: {book.author}</p>
                            <p><strong>Checked Out:</strong> {book.checkedOutDate ? new Date(book.checkedOutDate).toLocaleDateString() : '-'}</p>
                            <p><strong>Return By:</strong> {book.returnDate ? new Date(book.returnDate).toLocaleDateString() : '-'}</p>
                        </div>
                    ))
                ) : (
                    <p> You dont have any checked out books.</p>
                )}
            </div>
        </div>

    )
}

export default MyBooks
