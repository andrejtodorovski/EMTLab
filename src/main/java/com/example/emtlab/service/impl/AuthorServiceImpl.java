package com.example.emtlab.service.impl;

import com.example.emtlab.model.Author;
import com.example.emtlab.model.Country;
import com.example.emtlab.model.dto.AuthorDTO;
import com.example.emtlab.repository.AuthorRepository;
import com.example.emtlab.repository.CountryRepository;
import com.example.emtlab.service.AuthorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;
    private final CountryRepository countryRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository, CountryRepository countryRepository) {
        this.authorRepository = authorRepository;
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @Override
    public Optional<Author> addAuthor(AuthorDTO author) {
        Country country = countryRepository.findById(author.getCountryId())
                .orElseThrow(RuntimeException::new);
        Author newAuthor = new Author(author.getName(),author.getSurname(),country);
        return Optional.of(authorRepository.save(newAuthor));
    }

    @Override
    public Optional<Author> getAuthorById(Long id) {
        return authorRepository.findById(id);
    }

    @Override
    public Optional<Author> updateAuthor(Long id, AuthorDTO author) {
        Author authorToUpdate = authorRepository.findById(id)
                .orElseThrow(RuntimeException::new);
        Country country = countryRepository.findById(author.getCountryId())
                .orElseThrow(RuntimeException::new);
        authorToUpdate.setName(author.getName());
        authorToUpdate.setSurname(author.getSurname());
        authorToUpdate.setCountry(country);
        return Optional.of(authorRepository.save(authorToUpdate));
    }

    @Override
    public void deleteAuthor(Long id) {
        authorRepository.deleteById(id);
    }
}
