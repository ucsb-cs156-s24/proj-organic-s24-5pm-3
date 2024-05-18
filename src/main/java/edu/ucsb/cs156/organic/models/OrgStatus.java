package edu.ucsb.cs156.organic.models;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.AccessLevel;


import org.springframework.security.core.GrantedAuthority;

import edu.ucsb.cs156.organic.entities.User;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class OrgStatus {
  private User user;
  private Collection<? extends GrantedAuthority> roles;
}
