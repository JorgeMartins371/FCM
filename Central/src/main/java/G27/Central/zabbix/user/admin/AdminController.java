package G27.Central.zabbix.user.admin;

import G27.Central.DB.Connection;
import G27.Central.DB.User;
import G27.Central.DB.repositories.ConnectionRepository;
import G27.Central.DB.repositories.UserRepository;
import G27.Central.utils.Encoder;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

import static G27.Central.utils.zabbix.ZabbixPaths.*;

@RestController
public class AdminController {

    @Autowired
    private ConnectionRepository cr;
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

    @Transactional
    @DeleteMapping(USERS_PATH)
    public JSONObject unregister(@RequestBody JSONObject user){

        int result = ur.deleteUserByName(user.getString("username"));

        JSONObject ret = new JSONObject();
        ret.put("Result",result);

        return ret;
    }

    @GetMapping(STOREDCONNECTIONS_PATH)
    public JSONObject getStoredConnections(){

        JSONObject ret = new JSONObject();
        JSONArray cons = new JSONArray();
        Iterable<Connection> all;


        all = cr.findAll();

        for (Connection c: all) {
            cons.add(c);
        }
        ret.put("Connections",cons);
        return ret;

    }

    @PostMapping(INSERTCONNECTION_PATH)
    public JSONObject registerCon(@RequestBody JSONObject body){

        //Maybe verificar se Tool é Zabbix, Nagios ou Nimsoft (Talvez option no FE)

        String encoded = Encoder.encoder(body.getString("User"),body.getString("Password"));

        Connection newCon = new Connection(body.getString("ID"),body.getString("IP"),body.getString("Tool"),body.getString("User"),encoded);
        cr.save(newCon);

        JSONObject ret = new JSONObject();
        ret.put("Connection",newCon);

        return ret;
    }

    @GetMapping(USERS_PATH)
    public JSONObject getUsers(){
        JSONObject ret = new JSONObject();
        JSONArray users = new JSONArray();
        Iterable<User> all;


        all = ur.findAll();

        for (User u: all) {
            users.add(u);
        }
        ret.put("Users",users);
        return ret;
    }
}
