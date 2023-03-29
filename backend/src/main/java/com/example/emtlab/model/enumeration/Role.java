package com.example.emtlab.model.enumeration;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ROLE_LIBRARIAN, ROLE_ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
