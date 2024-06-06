package edu.ucsb.cs156.github;

import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;

import java.security.PrivateKey;
import java.security.Security;
import java.security.KeyFactory;
import java.security.spec.PKCS8EncodedKeySpec;

import java.util.Base64;

import org.bouncycastle.openssl.PEMParser;
import org.bouncycastle.asn1.pkcs.PrivateKeyInfo;

public class PrivateKeyConverter {

    /**
     * Convert a private key from the PEM format you can download when you create
     * a Github app (the one that starts with <code>-----BEGIN RSA PRIVATE KEY-----
    </code>) into a PrivateKey object.
     * 
     * @param privateKeyString
     * @return a PrivateKey object
     */

    public static PrivateKey convertToPrivateKey(String privateKeyString) throws Exception {
        // Make sure Bouncy Castle provider is registered
        Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());

        try {

            // Remove the BEGIN and END lines, and newline characters
            String privateKeyPEMTrimmed = privateKeyString
                    .replace("-----BEGIN RSA PRIVATE KEY-----", "")
                    .replace("-----END RSA PRIVATE KEY-----", "")
                    .replaceAll("\\s+", "");

            // Decode Base64 and convert to byte array
            byte[] privateKeyBytes = Base64.getDecoder().decode(privateKeyPEMTrimmed);


            // Parse the ASN.1 encoded private key
            ByteArrayInputStream bis = new ByteArrayInputStream(privateKeyBytes);
            PEMParser pemParser = new PEMParser(new InputStreamReader(bis));
            Object obj = pemParser.readObject();
            pemParser.close();
            bis.close();

            if (obj instanceof PrivateKeyInfo) {
                PrivateKeyInfo pki = (PrivateKeyInfo) obj;

                // Initialize a KeyFactory with the Bouncy Castle provider
                KeyFactory kf = KeyFactory.getInstance("RSA", "BC");

                // Generate the PrivateKey object
                PrivateKey privateKey = kf.generatePrivate(new PKCS8EncodedKeySpec(pki.getEncoded()));

                // Use the PrivateKey object as needed
                System.out.println("Private key: " + privateKey);
                return privateKey;
            } else {
                return null;
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

}
