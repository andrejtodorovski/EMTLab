package com.example.emtlab.service.impl;

import com.example.emtlab.model.Author;
import com.example.emtlab.model.Book;
import com.example.emtlab.model.dto.BookDTO;
import com.example.emtlab.model.enumeration.Category;
import com.example.emtlab.repository.AuthorRepository;
import com.example.emtlab.repository.BookRepository;
import com.example.emtlab.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    public BookServiceImpl(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    @Override
    @Transactional
    public Optional<Book> addBook(BookDTO book) {
        Author author = authorRepository.findById(book.getAuthorId())
                .orElseThrow(RuntimeException::new);
        Book newBook = new Book(book.getName(), book.getCategory(), author, book.getAvailableCopies());
        return Optional.of(bookRepository.save(newBook));
    }

    @Override
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    @Transactional
    public Optional<Book> updateBook(Long id, BookDTO book){
        Book bookToUpdate = bookRepository.findById(id).orElseThrow(RuntimeException::new);
        Author author = authorRepository.findById(book.getAuthorId())
                .orElseThrow(RuntimeException::new);
        bookToUpdate.setName(book.getName());
        bookToUpdate.setCategory(book.getCategory());
        bookToUpdate.setAuthor(author);
        bookToUpdate.setAvailableCopies(book.getAvailableCopies());
        return Optional.of(bookRepository.save(bookToUpdate));
    }

    @Override
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Optional<Book> markAsRented(Long id) {
        Book book = bookRepository.findById(id).orElseThrow(RuntimeException::new);
        if(book.getAvailableCopies()<=0)
        {
            throw new RuntimeException();
        }
        int newCopiesValue = book.getAvailableCopies() - 1;
        book.setAvailableCopies(newCopiesValue);
        return Optional.of(bookRepository.save(book));
    }

    @Override
    public Page<Book> findAllByPagination(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    @Override
    public List<Category> getCategories() {
        return Arrays.stream(Category.values()).toList();
    }
}
