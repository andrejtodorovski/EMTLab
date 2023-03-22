package com.example.emtlab.service;

import com.example.emtlab.model.Author;
import com.example.emtlab.model.dto.AuthorDTO;

import java.util.List;
import java.util.Optional;

public interface AuthorService {
    List<Author> getAllAuthors();
    Author addAuthor(AuthorDTO author);
    Optional<Author> getAuthorById(Long id);
    Optional<Author> updateAuthor(Long id, AuthorDTO author);
    void deleteAuthor(Long id);
}
