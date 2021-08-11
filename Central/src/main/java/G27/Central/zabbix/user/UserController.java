package G27.Central.zabbix.user;

import G27.Central.DB.User;
import G27.Central.DB.repositories.UserRepository;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;

import static G27.Central.utils.zabbix.ZabbixPaths.LOGIN;
import static G27.Central.utils.zabbix.ZabbixPaths.REGISTER;

@RestController
public class UserController {

    @Autowired
    private UserRepository ur;

    @PostMapping(REGISTER)
    public void register(@RequestBody JSONObject user){

        String encoded = encoder(user.getString("username"), user.getString("password"));

        User newUser = new User(encoded, user.getString("username"));
        ur.save(newUser);
    }

    @PostMapping(LOGIN)
    public JSONObject login(@RequestBody JSONObject user){

        String encoded = encoder(user.getString("username"), user.getString("password"));

        User aux = ur.findByEncoded(encoded);

        if(aux != null){
            JSONObject ret = new JSONObject();
            ret.put("Encoded", aux.getEncoded());
            return ret;
        }

        //Lançar exception de login failed
        return null;
    }

    public String encoder(String username, String password){
        String ToEnc = username+":"+password;

        return Base64.getEncoder().encodeToString(ToEnc.getBytes());
    }
}
