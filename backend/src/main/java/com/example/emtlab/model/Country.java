package com.example.emtlab.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String continent;
    @OneToMany(mappedBy = "country", fetch = FetchType.EAGER)
    List<Author> authors;
}
