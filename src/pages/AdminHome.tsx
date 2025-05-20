import React, { useEffect, useState } from "react";
import './AdminHome.css'
import { useNavigate } from "react-router-dom";

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    checkedOutDate?: string;
    returnDate?: string;
}


const AdminHome = () => {
    const [books, setbooks] = useState<Book[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            setbooks(JSON.parse(storedBooks));
        }
    }, [])
    console.log(books)
    return (
        <div className="admin-home">
            <h1>Library Books Status</h1>
            <button className="add-book-btn" onClick={() => navigate('/add-book')}>
                + Add Book
            </button>
            <table className="book-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Borrowed Date</th>
                        <th>Return Date</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(b => (
                        <tr>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td className={b.available ? 'available' : 'unavailable'}>{b.available ? 'Available' : 'Borrowed'}</td>
                            <td>{b.checkedOutDate}</td>
                            <td>{b.returnDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminHome