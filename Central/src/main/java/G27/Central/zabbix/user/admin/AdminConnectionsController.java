package G27.Central.zabbix.user.admin;

import G27.Central.DB.Connection;
import G27.Central.DB.repositories.ConnectionRepository;
import G27.Central.DB.repositories.User_ConnectionRepository;
import G27.Central.utils.Encoder;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static G27.Central.utils.zabbix.ZabbixPaths.STOREDCONNECTIONS_PATH;

@RestController
@RequestMapping(headers = "Accept=application/json")
public class AdminConnectionsController {

    @Autowired
    private ConnectionRepository cr;
    @Autowired
    private User_ConnectionRepository ucr;


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

    @PostMapping(STOREDCONNECTIONS_PATH)
    public JSONObject registerCon(@RequestBody JSONObject body){

        String encoded = Encoder.encoder(body.getString("User"),body.getString("Password"));

        Connection newCon = new Connection(body.getString("ID"),body.getString("IP"),body.getString("Tool"),body.getString("User"),encoded);
        cr.save(newCon);

        JSONObject ret = new JSONObject();
        ret.put("Connection",newCon);

        return ret;
    }
}
