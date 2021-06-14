package G27.Central.connectors;

import G27.Central.connectors.Zabbix.ZabbixConnector;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
public class ConnectorController {

    private ZabbixConnector zab;
    private static final AtomicInteger nextId = new AtomicInteger(0);
    private static HashMap<String,ZabbixConnector> connectors = new HashMap<>();

    @GetMapping("/zabbixCon")
    public void getZabbixCon(){

        String url = "http://195.22.17.158/zabbix/api_jsonrpc.php";

        zab = new ZabbixConnector(url);
        zab.init();
        nextId.incrementAndGet();

        connectors.put(nextId.toString(),zab);

        System.out.println("Connector intialized succesfully with ID=" + nextId.toString());

        String user = "user_isel_estagio";
        String password = "Admin.Cl4raN€t";
        boolean login = zab.login(user, password);
        System.out.println("login result:" + login);
        System.out.println("Instance created with ID=" + nextId.toString());
    }

    public static ZabbixConnector getZab(String id){
        return connectors.get(id);
    }
}
