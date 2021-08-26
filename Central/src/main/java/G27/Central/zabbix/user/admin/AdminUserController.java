package G27.Central.zabbix.user.admin;

import G27.Central.DB.Connection;
import G27.Central.DB.User;
import G27.Central.DB.User_Connection;
import G27.Central.DB.repositories.ConnectionRepository;
import G27.Central.DB.repositories.UserRepository;
import G27.Central.DB.repositories.User_ConnectionRepository;
import G27.Central.utils.Encoder;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

import java.util.List;

import static G27.Central.utils.zabbix.ZabbixPaths.*;

@RestController
@RequestMapping(headers = "Accept=application/json")
public class AdminUserController {

    @Autowired
    private ConnectionRepository cr;
    @Autowired
    private UserRepository ur;
    @Autowired
    private User_ConnectionRepository ucr;

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

        String username = user.getString("username");

        int i = deleteAssociation(ucr.findByUsername(username));

        int result = ur.deleteUserByName(username);

        JSONObject ret = new JSONObject();
        ret.put("Associations removed",i);
        ret.put("Result",result);

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

    @GetMapping(CONNECTIONS_USER_PATH)
    public JSONObject getConnectionsOfUsers(@PathVariable String user){

        List<String> uc = ucr.queryByUsername(user);

        JSONObject ret = new JSONObject();
        JSONArray cons = new JSONArray();

        Connection con;

        for (String conID : uc) {
            con = cr.findByid(conID);
            cons.add(con);

        }

        ret.put("Connections",cons);

        return ret;
    }

    @Transactional
    @PostMapping(CONNECTIONS_USER_PATH)
    public JSONObject addConnectionToUser(@PathVariable String user,@RequestBody JSONObject body){

        JSONArray conID = body.getJSONArray("cons");

        for (int i = 0; i < conID.size(); i++) {
            User_Connection newCon = new User_Connection(user,conID.getString(i));
            ucr.save(newCon);
        }

        return body;
    }

    @Transactional
    @DeleteMapping(CONNECTIONS_USER_PATH)
    public JSONObject removeConFromUser(@PathVariable String user,@RequestBody JSONObject body){

        JSONArray conID = body.getJSONArray("cons");

        long id;

        for (int i = 0; i < conID.size(); i++) {
            id = ucr.queryByUserAndCon(user,conID.get(i).toString());
            ucr.deleteConById(id);
        }

        return body;
    }

    @Transactional
    private int deleteAssociation(List<User_Connection> cons){

        int ret=0;

        for (User_Connection aux: cons) {
            ret+=ucr.deleteConById(aux.getID());
        }
        return ret;
    }

}
