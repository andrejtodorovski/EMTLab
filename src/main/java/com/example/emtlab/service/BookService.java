package com.example.emtlab.service;

import com.example.emtlab.exception.BookNotFoundException;
import com.example.emtlab.model.Book;

import java.util.List;

public interface BookService {
    List<Book> getAll();
    Book addBook(Book book);
    Book getBookById(Long id) throws BookNotFoundException;
    Book updateBook(Long id, Book book) throws BookNotFoundException;
    void deleteBook(Long id);
    void markAsRented(Long id) throws BookNotFoundException;
}
