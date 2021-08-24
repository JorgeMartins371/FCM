package G27.Central.utils;

import java.util.Arrays;
import java.util.Base64;

public class Encoder {

    public static String encoder(String username, String password){
        String ToEnc = username+":"+password;

        return Base64.getEncoder().encodeToString(ToEnc.getBytes());
    }

    public static String decoder(String encoded){
        return Arrays.toString(Base64.getDecoder().decode(encoded));
    }
}
