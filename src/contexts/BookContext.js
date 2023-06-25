//old one without using reducers---

// import React,{createContext,useState} from 'react'
// import {v1 as uuidv1} from 'uuid'

// export const BookContext=createContext();

// const BookContextProvider=(props)=>{
//     const [books,setBooks]=useState([
//         {title:'name of the wind',author:'patrick rothfuss',id:1},
//         {title:'the final empire',author:'brandon sanderson',id:2}
//     ]);

//     const addBook= (title,author)=>{
//         setBooks([...books,{title:title,author:author,id:uuidv1()}]);
//     };

//     const removeBook=(id)=>{
//         setBooks(books.filter(book=>book.id!==id));//filter method only returns elements that give true to the condition

//     };

//     return(
//         <BookContext.Provider value={{books,addBook,removeBook}}>
//             {props.children}
//         </BookContext.Provider>
//     )
// }

// export default BookContextProvider;

//with using reducers----------------------------------------------------------------------------------------------------------------------------------------

import React,{createContext,useReducer,useEffect} from 'react'
import {bookReducer} from '../reducers/bookReducer'

export const BookContext=createContext();

const BookContextProvider=(props)=>{
    const [books,dispatch]=useReducer(bookReducer,[],()=>{
        const localData=localStorage.getItem('books');
        return localData?JSON.parse(localData):[];
    });
    useEffect(()=>{
        localStorage.setItem('books',JSON.stringify(books))
    },[books]);
    return(
        <BookContext.Provider value={{books,dispatch}}>
            {props.children}
        </BookContext.Provider>
    )
}

export default BookContextProvider;