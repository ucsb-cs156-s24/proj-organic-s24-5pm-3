package edu.ucsb.cs156.organic.services;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import edu.ucsb.cs156.github.GitHubApp;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class SanityCheck {
    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.github.client-secret}")
    private String clientSecret;

    @Value("${edu.ucsb.cs156.github.pkfile}")
    private String clientPkPath;

    @Value("${spring.profiles.active}")
    private String activeProfile;

    // public SanityCheck() {
    // log.warn("clientId: " + clientId);
    // log.warn("clientSecret: " + clientSecret);
    // log.warn("clientPkPath: " + clientPkPath);
    // this.githubApp();
    // }

    @Bean
    public void runSanityCheck() {
        log.warn("\u001B[33m" + activeProfile + "\u001B[0m");
        this.githubApp();
    }

    public void githubApp() {
        log.warn("----------RUNNING SANITY CHECK FOR GITHUB APP----------");
        log.warn("clientPkPath: " + clientPkPath);
        try {
            GitHubApp tempApp = new GitHubApp(clientId, clientPkPath);
            JSONObject app = tempApp.appInfo();
            log.warn("GitHub App Name: " + app.getString("slug"));
        } catch (Exception e) {
            log.error(e.toString());
            log.error("----------SANITY CHECK FAILED FOR GITHUB APP----------");
            throw new RuntimeException("Sanity check failed. See logs above for more information.");
        }
        log.warn("----------SANITY CHECK PASSED FOR GITHUB APP----------");
    }
}
