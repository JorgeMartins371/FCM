package G27.Central.zabbix.action;

import G27.Central.connectors.ConnectorController;
import G27.Central.connectors.Zabbix.ZabbixConnector;
import G27.Central.utils.Request;
import G27.Central.utils.RequestBuilder;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.*;

import static G27.Central.utils.zabbix.ZabbixPaths.ACTIONS_PATH;

@RestController
@RequestMapping(headers = "Accept=application/json")
public class ActionController {

    private ZabbixConnector api;

    @GetMapping(ACTIONS_PATH)
    public JSONObject getActions(@PathVariable String iid){

        api = ConnectorController.getZab(iid);

        Request request = RequestBuilder.newBuilder().method("action.get").paramEntry("output","extend")
                .paramEntry("selectOperations","extend").paramEntry("selectRecoveryOperations","extend")
                .paramEntry("selectFilter","extend")
                .build();
        JSONObject result = api.call(request);

        System.err.println(JSON.toJSONString(result, true));

        return result;
    }
}
