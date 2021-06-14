package G27.Central.connectors;

import G27.Central.utils.Request;
import com.alibaba.fastjson.JSONObject;

public interface Connector {

    void init();

    void destroy();

    boolean login(String user, String password);

    JSONObject call(Request request);
}
