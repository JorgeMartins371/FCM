package G27.Central.zabbix.user;

import G27.Central.DB.User;
import G27.Central.DB.repositories.UserRepository;
import G27.Central.exceptions.user.UserNotFoundException;
import G27.Central.utils.Encoder;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Base64;

import static G27.Central.utils.zabbix.ZabbixPaths.*;

@RestController
public class UserController {

    @Autowired
    private UserRepository ur;

    @PostMapping(LOGIN)
    public JSONObject login(@RequestBody JSONObject user) throws Exception {

        String encoded = Encoder.encoder(user.getString("username"), user.getString("password"));

        try{

            User aux = ur.findByEncoded(encoded);
            if(aux == null) throw new UserNotFoundException();
            JSONObject ret = new JSONObject();
            ret.put("User",aux.getName());
            ret.put("Admin",aux.isAdmin());
            return ret;

        }catch (UserNotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"User not Found",e);
        }
    }
}
