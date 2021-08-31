package G27.Central.connectors;

import G27.Central.DB.Connection;
import G27.Central.DB.User;
import G27.Central.DB.User_Connection;
import G27.Central.DB.repositories.ConnectionRepository;
import G27.Central.DB.repositories.UserRepository;
import G27.Central.DB.repositories.User_ConnectionRepository;
import G27.Central.connectors.Zabbix.ZabbixConnector;
import G27.Central.utils.Encoder;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import static G27.Central.utils.zabbix.ZabbixPaths.*;

@RestController
public class ConnectorController {

    private static ZabbixConnector zab;
    private static final AtomicInteger nextId = new AtomicInteger(0);
    private static HashMap<String,ZabbixConnector> connectors = new HashMap<>();

    @Autowired
    private User_ConnectionRepository ucr;
    @Autowired
    private ConnectionRepository cr;

    @GetMapping(ZABBIX_CON)
    public void getZabbixCon(){

        String url = "http://195.22.17.158/zabbix/api_jsonrpc.php";

        zab = new ZabbixConnector(url);
        zab.init();
        nextId.incrementAndGet();

        connectors.put("Zabbix"+nextId.toString(),zab);

        System.out.println("Connector intialized succesfully with ID= Zabbix" + nextId.toString());

        String user = "user_isel_estagio";
        String password = "Admin.Cl4raN€t";
        boolean login = zab.login(user, password);
        System.out.println("login result:" + login);
    }

    @PostMapping(ZABBIX_CON)
    public JSONObject getSpecificCon(@RequestBody JSONObject body){

        String url = body.getString("url");

        zab = new ZabbixConnector(url);
        zab.init();
        nextId.incrementAndGet();

        connectors.put("Zabbix"+nextId.toString(),zab);

        String user = body.getString("user");
        String password = body.getString("pass");
        boolean login = zab.login(user, password);

        JSONObject ret = new JSONObject();
        ret.put("ConnectionId","Zabbix"+nextId.toString());

        return ret;
    }

    @GetMapping(CONNECTIONS_PATH)
    public JSONObject getAvailableConnections(){

        JSONObject ret = new JSONObject();
        JSONArray aux = new JSONArray();

        aux.addAll(connectors.keySet());

        ret.put("Connections",aux);

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

    public static ZabbixConnector getZab(String id){
        return connectors.get(id);
    }

    public static boolean hasZabCon(String id){
        return connectors.containsKey(id);
    }

    public static ZabbixConnector buildConZab(String id,String ip,String user, String encoded){

        String url = "http://" + ip + "/zabbix/api_jsonrpc.php";

        zab = new ZabbixConnector(url);
        zab.init();

        connectors.put(id,zab);

        String auxPass = Encoder.decoder(encoded);

        String logPass = auxPass.split(":")[1];

        try{
            boolean login = zab.login(user, logPass);
            System.out.println("Login result= " + login);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Couldnt initialize Connection",e);

        }

        return zab;
    }
}
