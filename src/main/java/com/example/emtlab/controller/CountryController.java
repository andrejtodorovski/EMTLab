package com.example.emtlab.controller;

import com.example.emtlab.model.Country;
import com.example.emtlab.service.CountryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
public class CountryController {
    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }


    @GetMapping
    public ResponseEntity<List<Country>> getAllCountries(){
        return new ResponseEntity<>(countryService.getAllCountries(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Country> getCountryById(@PathVariable Long id){
        return countryService.getCountryById(id)
                .map(b->ResponseEntity.ok().body(b))
                .orElseGet(()->ResponseEntity.notFound().build());
    }
    @PostMapping
    public ResponseEntity<Country> addCountry(@RequestBody Country country){
        return new ResponseEntity<>(countryService.addCountry(country),HttpStatus.CREATED);
    }
    @PostMapping("/{id}")
    public ResponseEntity<Country> updateCountry(@PathVariable Long id, @RequestBody Country country){
        return countryService.updateCountry(id,country)
                .map(b->ResponseEntity.ok().body(b))
                .orElseGet(()->ResponseEntity.notFound().build());
    }
    @PostMapping("/delete/{id}")
    public ResponseEntity<Country> deleteCountry(@PathVariable Long id){
        countryService.deleteCountry(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
