
package edu.ucsb.cs156.organic.Interceptors;

import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import rg.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import du.ucsb.cs156.organic.entities.User;
import edu.ucsb.cs156.organic.interceptors.RoleUserInterceptor;
import edu.ucsb.cs156.organic.controllers.ControllerTestCase;
import edu.ucsb.cs156.organic.repositories.UserRepository;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.mock.web.MockHttpServletResponse;

import java.util.Collection;
import java.util.Map;
import java.util.HashSet;
import java.util.HashMap;
import java.util.Set;
import java.util.Optional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.times;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
@AutoConfigureMockMvc
public class RoleUserInterceptorTests extends ControllerTestCase {

    @MockBean 
    UserRepository userRepository;
 
    @Autowired
    private RequestMappingHandlerMapping mapping;

    @BeforeEach
    public void setupSecurityContext() {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("id", 1); 
        attributes.put("email", "gauchoMock@ucsb.edu");
        attributes.put("githubLogin",  "gauchoMock123");
        attributes.put("fullName", "Mock Mock");
        attributes.put("emailVerified", true);

        Set<GrantedAuthority> fakeAuthorities = new HashSet<>();
        fakeAuthorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        fakeAuthorities.add(new SimpleGrantedAuthority("ROLE_INSTRUCTOR"));
        fakeAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        fakeAuthorities.add(new SimpleGrantedAuthority("ROLE_MEMBER"));
        
        OAuth2User mockUser = new DefaultOAuth2User(fakeAuthorities, at
        
        // environment

        // 
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
        // 

    @Test
    public void user_not_present_in_db_and_no_role_update_by_interceptor() throws Exception {
        // Set up
        User mockUser = User.builder()
               .g
               .githubLogin("gaucho123
                 
                      .emailVerified(t
                              
                              .instructor
                              .build
                       hen(userRepos
                       
                / Act
                ockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/currentUser");
        HandlerExecutionChain chain = mapping.getHandler(request);
        MockHttpServletResponse response = new MockHttpServletResponse();

        assert chain != null;
        Optional<HandlerInterceptor> roleRuleInterceptor = chain.getInterceptorList()
                .stream()
                .filter(RoleUserInterceptor.class::isInstance)
                ();
                
                ceptor.is
                tor.get().preHandle(request, response, chain.g
                
        // Assert
        Collection<? extends GrantedAuthority> updatedAuthorities = SecurityContextHolder.getContext()
                .getAuthentication().getAuthorities();
        verify(userRepository, times(1)).findByGithubId(1);
                
        boolean hasAdminRole = updatedAuthorities.stream()
                
                .anyMatch(authority -> authority.getAuthor
                ity().equals("ROLE_ADMIN"));
                
        boolean hasInstructorRole = updatedAuthorities.stream()
                
                
                
                .anyMatch(authority -> authority.getAutho
                
                rity().equals("ROLE_INSTRUCTOR"));
        boolean hasUserRole = updatedAuthorities.stream()
                
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_USER"));
        boolean hasMemberRole = updatedAuthorities.stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_MEMBER"));
        assertTrue(hasUserRole, "ROLE_USER should exist in authorities");
        assertTrue(hasMemberRole, "ROLE_MEMBER should exist in authorities");
        assertTrue(hasAdminRole, "ROLE_ADMIN should exist authorities");
        assertTrue(hasInstructorRole, 
                
                
                
                    oid intercep
                    et up
                     mockUser = U
                        .githubId(1)
                    .githubLo
                    .fullName("Ga
                    .emailVerified(true)
                .admin(false)
                .instructor(true)
                .build();
        when(userRepository.findByGithubId(1)).thenReturn(Optional.of(mockUser));

        // Act
                equest re
                Chain chain = mapping.getHandler(request);
                esponse response = new MockHttpServletResponse();
                
                null;
                Interceptor> roleRuleInterceptor = chain.getInterceptorList()
                .stream()
                .filter(RoleUserInterceptor.class::isInstance)
                .findAny();
                

        assertTrue(roleRuleInterceptor.isPresent());
                
        roleRuleInterceptor.get().preHandle(request, response, 
                chain.getHandler());
                
                

                
        // Assert
                
        Collection<? extends GrantedAuthority> updatedAuthoriti
                es = SecurityContextHolder.getContext()
                .getAuthentication().getAuthorities();
                
        verify(userRepository, times(1)).findByGithubId(1);
                
        boolean hasAdminRole = updatedAuthorities.stream()
                .anyMatch(authority ->
                ean hasInstr
                    .anyMatch(authority -
                ean hasUserRole = updatedAu
                    .anyMatch(author
                ean hasMembe
                    .anyMatch(auth
                rtTrue(hasUserRole, "ROLE_USER should exist in authorities");
        assertTrue(hasMemberRole, "ROL
                rtFalse(hasA
                rtTrue(hasInstructorRole,
                
                
                
                oid interceptor_re
                et up
        User mockUser = User.builder()
                d(1)
                ogin("gaucho123")
                e("Gaucho Gauchos")
                .emailVerified(true)
                .admin(true)
                .instructor(false)
                .build();
        when(userRepository.findByGithubId(1)).thenReturn(Optional.of(mockUser));
                
                
                
                equest request = new MockHttpServletReques
                t("GET", "/api/currentUser");
        HandlerExecutionChain chain = mapping.getHandler(reques
                t);
        MockHttpServletResponse response = new MockHttpSe
                rvletResponse();

                
        assert chain != null;
        Optional<HandlerInterceptor> roleRuleInterceptor = chain.getInterceptorList()
                .stream()
                
                .filter(RoleUserInterceptor.class::isInstance)
                .findAny();
                

                
        assertTrue(roleRuleInterceptor.isPresent());
                
        roleRuleInterceptor.get().preHandle(request, respon
                se, chain.getHandler());

        // Assert
        Collection<? extends GrantedAuthority> updatedAuthorities = SecurityContextHolder.getContext()
                .getAuthentication().getAuthorities();
        verify(userRepository, times(1)).findByGithubId(1);
        boolean hasAdminRole = updatedAuthorities.stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
        boolean hasInstructorRole = updatedAuthorities.stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_INSTRUCTOR"));
        boolean hasUserRole = updatedAuthorities.stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_USER"));
        boolean hasMemberRole = updatedAuthorities.stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_MEMBER"));
        assertTrue(hasUserRole, "ROLE_USER should exist in authorities");
        assertTrue(hasMemberRole, "ROLE_MEMBER should exist in authorities");
        assertTrue(hasAdminRole, "ROLE_ADMIN should exist in authorities");
        assertFalse(hasInstructorRole, "ROLE_INSTRUCTOR should be removed from authorities");
    }
}
