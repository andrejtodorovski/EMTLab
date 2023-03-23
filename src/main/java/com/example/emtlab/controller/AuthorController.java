package com.example.emtlab.controller;

import com.example.emtlab.model.Author;
import com.example.emtlab.model.dto.AuthorDTO;
import com.example.emtlab.service.AuthorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {
    private final AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }


    @GetMapping
    public ResponseEntity<List<Author>> getAllAuthors(){
        return new ResponseEntity<>(authorService.getAllAuthors(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable Long id){
        return authorService.getAuthorById(id)
                .map(a->ResponseEntity.ok().body(a))
                .orElseGet(()->ResponseEntity.notFound().build());
    }
    @PostMapping("/add")
    public ResponseEntity<Author> addAuthor(@RequestBody AuthorDTO author){
        return this.authorService.addAuthor(author)
                .map(a -> ResponseEntity.ok().body(a))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }
    @PutMapping("/edit/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable Long id, @RequestBody AuthorDTO author){
        return authorService.updateAuthor(id,author)
                .map(b->ResponseEntity.ok().body(b))
                .orElseGet(()->ResponseEntity.notFound().build());
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Author> deleteAuthor(@PathVariable Long id){
        authorService.deleteAuthor(id);
        if(this.authorService.getAuthorById(id).isEmpty())
            return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }
}
