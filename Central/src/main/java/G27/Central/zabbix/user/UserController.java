package G27.Central.zabbix.user;

import G27.Central.DB.User;
import G27.Central.DB.repositories.UserRepository;
import G27.Central.utils.Encoder;
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
    public JSONObject register(@RequestBody JSONObject user){

        String encoded = Encoder.encoder(user.getString("username"), user.getString("password"));

        User newUser = new User(encoded, user.getString("username"),user.getBoolean("admin"));
        ur.save(newUser);

        JSONObject ret = new JSONObject();
        ret.put("User",newUser);

        return ret;
    }

    @PostMapping(LOGIN)
    public JSONObject login(@RequestBody JSONObject user){

        String encoded = Encoder.encoder(user.getString("username"), user.getString("password"));

        User aux = ur.findByEncoded(encoded);
        if(aux != null){
            JSONObject ret = new JSONObject();
            ret.put("Encoded", aux.getEncoded());
            ret.put("Admin",aux.isAdmin());
            return ret;
        }

        //Lançar exception de login failed
        return null;
    }
}
