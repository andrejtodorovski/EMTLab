package com.example.emtlab.model.dto;

import com.example.emtlab.model.enumeration.Category;
import lombok.Data;

@Data
public class BookDTO {
    String name;
    Category category;
    Long authorId;
    Integer availableCopies;
}
