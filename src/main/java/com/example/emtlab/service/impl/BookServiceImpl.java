package com.example.emtlab.service.impl;

import com.example.emtlab.exception.BookNotFoundException;
import com.example.emtlab.model.Book;
import com.example.emtlab.service.BookService;
import org.springframework.stereotype.Service;
import com.example.emtlab.repository.BookRepository;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    @Override
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book getBookById(Long id) throws BookNotFoundException {
        return bookRepository.findById(id).orElseThrow(()->new BookNotFoundException(id));
    }

    @Override
    public Book updateBook(Long id, Book book) throws BookNotFoundException {
        Book bookToUpdate = bookRepository.findById(id).orElseThrow(()->new BookNotFoundException(id));
        bookToUpdate.setName(book.getName());
        bookToUpdate.setCategory(book.getCategory());
        bookToUpdate.setAuthor(book.getAuthor());
        bookToUpdate.setAvailableCopies(book.getAvailableCopies());
        return bookRepository.save(bookToUpdate);
    }

    @Override
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public void markAsRented(Long id) throws BookNotFoundException {
        Book book = bookRepository.findById(id).orElseThrow(()->new BookNotFoundException(id));
        int newCopiesValue = book.getAvailableCopies() - 1;
        book.setAvailableCopies(newCopiesValue);
        bookRepository.save(book);
    }
}
