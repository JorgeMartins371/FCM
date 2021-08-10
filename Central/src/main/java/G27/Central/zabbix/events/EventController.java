package G27.Central.zabbix.events;

import G27.Central.connectors.ConnectorController;
import G27.Central.connectors.Zabbix.ZabbixConnector;
import G27.Central.utils.Request;
import G27.Central.utils.RequestBuilder;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.*;

import static G27.Central.utils.zabbix.ZabbixPaths.*;

@RestController
@RequestMapping(headers = "Accept=application/json")
public class EventController {

    private ZabbixConnector api;

    @GetMapping(EVENT_PATH)
    public JSONObject getEvent(@PathVariable String iid){

        api = ConnectorController.getZab(iid);

        Request request = RequestBuilder.newBuilder().method("event.get")
                /*.paramEntry("hostids","10084")*/.paramEntry("output","extend")
                .paramEntry("select_acknowledges","extend").paramEntry("selectTags","extend")
                .paramEntry("selectSurpressionData","extend")
                .build();

        JSONObject result = api.call(request);

        JSONArray arr = result.getJSONArray("result");

        System.err.println(JSON.toJSONString(result, true));

        return result;
    }
}
