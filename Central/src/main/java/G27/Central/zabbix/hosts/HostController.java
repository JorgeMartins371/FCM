package G27.Central.zabbix.hosts;

import G27.Central.connectors.ConnectorController;
import G27.Central.connectors.Zabbix.ZabbixConnector;
import G27.Central.utils.Request;
import G27.Central.utils.RequestBuilder;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HostController {

    private ZabbixConnector api;

    @GetMapping("/host")
    public JSONObject getHost(){

        api = ConnectorController.getZab("1");

        Request request = RequestBuilder.newBuilder().method("host.get").paramEntry("filter","host: [Zabbix server, Linux server]").build();
        JSONObject result = api.call(request);

        System.err.println(JSON.toJSONString(result, true));

        return result;
    }
}
