package G27.Central.zabbix.item;

import G27.Central.connectors.ConnectorController;
import G27.Central.connectors.Zabbix.ZabbixConnector;
import G27.Central.utils.Request;
import G27.Central.utils.RequestBuilder;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import static G27.Central.utils.zabbix.ZabbixPaths.*;

@RestController
public class ItemController {

    private ZabbixConnector api;

    @PostMapping(ITEM_PATH)
    public JSONObject createItem(@PathVariable String iid){

        api = ConnectorController.getZab(iid);

        Request request = RequestBuilder.newBuilder().method("item.create")
                .paramEntry("name", "test").paramEntry("key_", "test")
                .paramEntry("hostid", "10180").paramEntry("type", "3")
                .paramEntry("value_type", "3")
                .paramEntry("delay", "30").build();

        JSONObject result = api.call(request);

        System.err.println(JSON.toJSONString(result, true));


        return result;
    }

    @GetMapping(ITEM_PATH_INFO)
    public JSONObject getItem(@PathVariable String iid,@PathVariable String name){

        api = ConnectorController.getZab(iid);

        Request request = RequestBuilder.newBuilder().method("item.get")
                .paramEntry("name", name).paramEntry("key_", "key")
                .paramEntry("hostid", "10180").paramEntry("type", "3")
                .paramEntry("value_type", "3")
                .paramEntry("delay", "30")
                .paramEntry("interfaceid", "123").build();

        JSONObject result = api.call(request);

        System.err.println(JSON.toJSONString(result, true));


        return result;
    }

    @GetMapping(ITEM_PATH)
    public JSONObject getAllItems(@PathVariable String iid){

        api = ConnectorController.getZab(iid);

        Request request = RequestBuilder.newBuilder().method("item.get")
                .paramEntry("hostid", "10180").build();

        JSONObject result = api.call(request);

        System.err.println(JSON.toJSONString(result, true));


        return result;
    }
}
