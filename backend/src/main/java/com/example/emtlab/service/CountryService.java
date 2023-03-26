package com.example.emtlab.service;

import com.example.emtlab.model.Country;

import java.util.List;
import java.util.Optional;

public interface CountryService {
    List<Country> getAllCountries();
    Optional<Country> addCountry(Country country);
    Optional<Country> getCountryById(Long id);
    Optional<Country> updateCountry(Long id, Country country);
    void deleteCountry(Long id);
}
