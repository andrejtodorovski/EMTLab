package com.example.emtlab.controller;

import com.example.emtlab.model.Book;
import com.example.emtlab.model.dto.BookDTO;
import com.example.emtlab.model.enumeration.Category;
import com.example.emtlab.service.BookService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
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
    @PostMapping("/add")
    public ResponseEntity<Book> addBook(@RequestBody BookDTO book){
        return this.bookService.addBook(book)
                .map(b -> ResponseEntity.ok().body(b))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody BookDTO book){
        return bookService.updateBook(id,book)
                .map(b->ResponseEntity.ok().body(b))
                .orElseGet(()->ResponseEntity.notFound().build());
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable Long id){
        bookService.deleteBook(id);
        if(this.bookService.getBookById(id).isEmpty())
            return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }
    @PutMapping("/rentBook/{id}")
    public ResponseEntity<Book> rentBook(@PathVariable Long id)
    {
        return bookService.markAsRented(id)
                .map(b->ResponseEntity.ok().body(b))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }
    @GetMapping("/pagination")
    public List<Book> getAllBooksWithPagination(Pageable pageable){
        return bookService.findAllByPagination(pageable).getContent();
    }
    @GetMapping("/categories")
    public List<Category> getCategories(){
        return bookService.getCategories();
    }
}
