import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Book {
    id : string;
    title : string;
    author : string;
    image : string;
    publishedDate : string;
    description : string;
    available : boolean;
    checkedOutBy? : string;
    returnDate? : string;
    checkedOutDate?: string;
}

interface BookState {
    books : Book[];
}

const initialState : BookState = {
    books : [],
}

const bookSlice = createSlice({
    name : 'books',
    initialState,
    reducers : {
        addBook(state, action : PayloadAction<Omit<Book, 'id'>>)
        {
            state.books.push({...action.payload, id : uuidv4(), available : true});
        },
        editBook(state, action : PayloadAction<Book>)
        {
            const index = state.books.findIndex(book => book.id === action.payload.id);
            if(index !== -1) state.books[index] = action.payload;
        },
        deleteBook(state, action : PayloadAction<string>)
        {
            state.books = state.books.filter(b => b.id !== action.payload);
        },
        checkoutBook(state, action : PayloadAction<{id: string; user: string; returnDate: string}>)
        {
            const book = state.books.find(b=> b.id === action.payload.id);
            if(book && book.available)
            {
                book.available = false;
                book.checkedOutBy = action.payload.user;
                book.returnDate = action.payload.returnDate;
                book.checkedOutDate = new Date().toDateString();
            }
        },
        returnBook(state, action:PayloadAction<string>)
        {
            const book = state.books.find(b=>b.id == action.payload)
            if(book)
            {
                book.available = true;
                delete book.checkedOutBy;
                delete book.returnDate;
            }
        }
        
    }
})

export const { addBook, editBook, deleteBook, checkoutBook, returnBook} = bookSlice.actions;
export default bookSlice.reducer;