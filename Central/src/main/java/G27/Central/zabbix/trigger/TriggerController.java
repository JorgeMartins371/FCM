package G27.Central.zabbix.trigger;

import G27.Central.connectors.ConnectorController;
import G27.Central.connectors.Zabbix.ZabbixConnector;
import G27.Central.utils.Request;
import G27.Central.utils.RequestBuilder;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static G27.Central.utils.zabbix.ZabbixPaths.TRIGGER_PATH;

@RestController
@RequestMapping(headers = "Accept=application/json")
public class TriggerController {

    private ZabbixConnector api;

    @GetMapping(TRIGGER_PATH)
    public JSONObject getTriggers(@PathVariable String iid){

        api = ConnectorController.getZab(iid);

        Request req = RequestBuilder.newBuilder().method("trigger.get").build();

        JSONObject res = api.call(req);

        return res;
    }

}
