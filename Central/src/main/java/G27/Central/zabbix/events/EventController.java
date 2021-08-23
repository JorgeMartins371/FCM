package G27.Central.zabbix.events;

import G27.Central.connectors.ConnectorController;
import G27.Central.connectors.Zabbix.ZabbixConnector;
import G27.Central.utils.Request;
import G27.Central.utils.RequestBuilder;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonAlias;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

import static G27.Central.utils.zabbix.ZabbixPaths.*;

@RestController
@RequestMapping(headers = "Accept=application/json")
public class EventController {

    private ZabbixConnector api;

    @GetMapping(EVENT_PATH)
    public JSONObject getEvent(@PathVariable String iid){

        api = ConnectorController.getZab(iid);

        Request request = RequestBuilder.newBuilder().method("event.get").paramEntry("output","extend")
                .paramEntry("select_acknowledges","extend").paramEntry("selectTags","extend")
                .paramEntry("selectSurpressionData","extend")
                .build();

        JSONObject result = api.call(request);

        JSONArray arr = result.getJSONArray("result");

        System.err.println(JSON.toJSONString(result, true));

        return result;
    }

    @PostMapping(EVENT_PATH)
    public JSONObject getSpecificEventS(@PathVariable String iid, @RequestBody JSONObject body){
        api = ConnectorController.getZab(iid);

        RequestBuilder aux = RequestBuilder.newBuilder().method("event.get").paramEntry("output","extend")
                .paramEntry("select_acknowledges","extend").paramEntry("selectTags","extend")
                .paramEntry("selectSurpressionData","extend").paramEntry("value",1);

        if(!body.getJSONArray("severities").isEmpty()) aux.paramEntry("severities",body.getJSONArray("severities"));

        JSONArray acks = body.getJSONArray("acknowledged");

        if(acks.getBoolean(0) && !acks.getBoolean(1)) aux.paramEntry("acknowledged",true); //Apenas Eventos Acknowledged

        Request req = aux.build();

        JSONObject result = api.call(req);

        System.err.println(JSON.toJSONString(result, true));

        return result;
    }

    @PostMapping(ACK_PATH)
    public JSONObject ackEvent(@PathVariable String iid ,@RequestBody JSONObject ack){

        api = ConnectorController.getZab(iid);

        Integer action = 0;

        System.out.println(ack);

        RequestBuilder aux = RequestBuilder.newBuilder().method("event.acknowledge")
                .paramEntry("eventids",ack.get("eventids"));

        if(ack.getBoolean("close")) action+=1;

        if(ack.getBoolean("ack")) action+=2;

        if(!ack.getString("message").equals("")){
            aux.paramEntry("message",ack.getString("message"));
            action +=4;
        }

        if(ack.getInteger("severity")!=9){
            aux.paramEntry("severity",ack.getInteger("severity"));
            action +=8;
        }

        //Fazer controlo

        aux.paramEntry("action",action);

        Request req = aux.build();

        return api.call(req);
    }
}
