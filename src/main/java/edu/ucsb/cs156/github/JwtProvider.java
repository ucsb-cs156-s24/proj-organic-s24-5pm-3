package edu.ucsb.cs156.github;

public class JwtProvider {
    private String appId;
    private String privateKeyPEM;

    private String jwt;
    private long jwtCreatedAt;

    public JwtProvider(String appId, String privateKeyPEM) {
        this.appId = appId;
        this.privateKeyPEM = privateKeyPEM;
    }

    private void checkJwtExpiration() {
        if (jwt == null || System.currentTimeMillis() - jwtCreatedAt > 600000) {
            try {
                jwt = Utils.createJWT(appId, 600000, privateKeyPEM);
                jwtCreatedAt = System.currentTimeMillis();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public String getJwt() {
        checkJwtExpiration();
        return jwt;
    }
}
