package G27.Central.zabbix.events;

import G27.Central.DB.Connection;
import G27.Central.DB.repositories.ConnectionRepository;
import G27.Central.DB.repositories.User_ConnectionRepository;
import G27.Central.connectors.ConnectorController;
import G27.Central.connectors.Zabbix.ZabbixConnector;
import G27.Central.utils.Request;
import G27.Central.utils.RequestBuilder;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

import static G27.Central.utils.zabbix.ZabbixPaths.*;

@RestController
@RequestMapping(headers = "Accept=application/json")
public class EventController {

    private ZabbixConnector api;
    @Autowired
    private ConnectionRepository cr;
    @Autowired
    private User_ConnectionRepository ucr;

    //Unused
    @GetMapping(EVENTS_PATH)
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

    // Main method to get events
    @PostMapping(EVENTS_PATH)
    public JSONObject getSpecificEventS(@PathVariable String user, @RequestBody JSONObject body){

        RequestBuilder aux = RequestBuilder.newBuilder().method("event.get").paramEntry("output","extend")
                .paramEntry("select_acknowledges","extend").paramEntry("selectTags","extend")
                .paramEntry("selectSurpressionData","extend").paramEntry("value",1).paramEntry("sortfield","clock").paramEntry("sortorder","DESC");

        if(body.containsKey("severities")){
            if(!body.getJSONArray("severities").isEmpty()) aux.paramEntry("severities",body.getJSONArray("severities"));
        }

        if(body.containsKey("acknowledged")){
            JSONArray acks = body.getJSONArray("acknowledged");
            if(acks.getBoolean(0) && !acks.getBoolean(1)) aux.paramEntry("acknowledged",true); //Apenas Eventos Acknowledged
        }

        Request req = aux.build();


        LinkedList<Connection> cons = getUserCons(user);
        JSONObject result = new JSONObject();
        JSONArray info = new JSONArray();
        JSONObject events = new JSONObject();
        String iid;

        for (Connection con: cons) {

            JSONObject conID = new JSONObject();

            iid = con.getID();

            if(!ConnectorController.hasZabCon(iid)){
                api = ConnectorController.buildConZab(con.getID(),con.getIP(),con.getUser(),con.getEncoded());
            }else api = ConnectorController.getZab(iid);

            System.out.println(api);
            conID.put("ConnectionID",iid);
            events.putAll(api.call(req));
            conID.put("Events",events);
            info.add(conID);
        }

        result.put("Result",info);

        //System.err.println(JSON.toJSONString(result, true));

        return result;
    }

    //Acknowledge method
    @PostMapping(ACK_PATH)
    public JSONObject ackEvent(@PathVariable String iid ,@RequestBody JSONObject ack){

        System.out.println(iid);

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

        aux.paramEntry("action",action);

        Request req = aux.build();

        return api.call(req);
    }

    private LinkedList<Connection> getUserCons(String user){
        List<String> uc = ucr.queryByUsername(user);

        LinkedList<Connection> cons = new LinkedList<>();

        Connection con;

        for (String conID : uc) {
            con = cr.findByid(conID);
            cons.add(con);
        }

        return cons;
    }

}
