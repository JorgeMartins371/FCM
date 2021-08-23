package G27.Central.connectors;

import G27.Central.DB.Connection;
import G27.Central.DB.User;
import G27.Central.DB.repositories.ConnectionRepository;
import G27.Central.DB.repositories.UserRepository;
import G27.Central.connectors.Zabbix.ZabbixConnector;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.concurrent.atomic.AtomicInteger;

import static G27.Central.utils.zabbix.ZabbixPaths.*;

@RestController
public class ConnectorController {

    private ZabbixConnector zab;
    private static final AtomicInteger nextId = new AtomicInteger(0);
    private static HashMap<String,ZabbixConnector> connectors = new HashMap<>();

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

    public static ZabbixConnector getZab(String id){
        return connectors.get(id);
    }
}
