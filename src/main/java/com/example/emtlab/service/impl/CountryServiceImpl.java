package com.example.emtlab.service.impl;

import com.example.emtlab.model.Country;
import com.example.emtlab.repository.CountryRepository;
import com.example.emtlab.service.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryServiceImpl implements CountryService {
    private final CountryRepository countryRepository;

    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    @Override
    public Optional<Country> addCountry(Country country) {

        return Optional.of(countryRepository.save(country));
    }

    @Override
    public Optional<Country> getCountryById(Long id) {
        return countryRepository.findById(id);
    }

    @Override
    public Optional<Country> updateCountry(Long id, Country country) {
        Country current = countryRepository.findById(id)
                .orElseThrow(RuntimeException::new);
        current.setContinent(country.getContinent());
        current.setName(country.getName());
        return Optional.of(countryRepository.save(current));
    }

    @Override
    public void deleteCountry(Long id) {
        countryRepository.deleteById(id);
    }
}
