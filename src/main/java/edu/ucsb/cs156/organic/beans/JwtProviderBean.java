package edu.ucsb.cs156.organic.beans;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import edu.ucsb.cs156.github.JwtProvider;

@Configuration
public class JwtProviderBean {

    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.github.client-secret}")
    private String clientSecret;

    @Value("${edu.ucsb.cs156.github.privateKeyPEM:NO-KEY-PROVIDED}")
    private String privateKeyPEM;

    @Bean
    public JwtProvider jwtProvider() {
        return new JwtProvider(this.clientId, this.privateKeyPEM);
    }

}
