package com.example.emtlab.controller;

import com.example.emtlab.model.Book;
import com.example.emtlab.model.dto.BookDTO;
import com.example.emtlab.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks(){
        return new ResponseEntity<>(bookService.getAll(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id){
        return bookService.getBookById(id)
                .map(b->ResponseEntity.ok().body(b))
                .orElseGet(()->ResponseEntity.notFound().build());
    }
    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody BookDTO book){
        return new ResponseEntity<>(bookService.addBook(book),HttpStatus.CREATED);
    }
    @PostMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody BookDTO book){
        return bookService.updateBook(id,book)
                .map(b->ResponseEntity.ok().body(b))
                .orElseGet(()->ResponseEntity.notFound().build());
    }
    @PostMapping("/delete/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable Long id){
        bookService.deleteBook(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PostMapping("/rentBook/{id}")
    public ResponseEntity<Book> rentBook(@PathVariable Long id)
    {
        return bookService.markAsRented(id)
                .map(b->ResponseEntity.ok().body(b))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }
}
