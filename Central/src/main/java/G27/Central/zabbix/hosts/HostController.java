package G27.Central.zabbix.hosts;

import G27.Central.connectors.ConnectorController;
import G27.Central.connectors.Zabbix.ZabbixConnector;
import G27.Central.utils.Request;
import G27.Central.utils.RequestBuilder;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.*;

import static G27.Central.utils.zabbix.ZabbixPaths.HOST_PATH;

@RestController
public class HostController {

    private ZabbixConnector api;

    @GetMapping(HOST_PATH)
    public JSONObject getHost(@PathVariable String iid) {

        api = ConnectorController.getZab(iid);

        Request request = RequestBuilder.newBuilder().method("host.get").build();
        JSONObject result = api.call(request);

        System.err.println(JSON.toJSONString(result, true));

        return result;
    }
}
