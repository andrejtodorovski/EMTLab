package com.example.emtlab.service;

import com.example.emtlab.model.Book;
import com.example.emtlab.model.dto.BookDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BookService {
    List<Book> getAll();
    Optional<Book> addBook(BookDTO book);
    Optional<Book> getBookById(Long id);
    Optional<Book> updateBook(Long id, BookDTO book);
    void deleteBook(Long id);
    Optional<Book> markAsRented(Long id);
    Page<Book> findAllByPagination(Pageable pageable);
    List<String> getCategories();
}
