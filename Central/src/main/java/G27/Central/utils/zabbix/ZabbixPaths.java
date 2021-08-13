package G27.Central.utils.zabbix;

public class ZabbixPaths {

    public static final String REGISTER = "/register";
    public static final String LOGIN = "/login";

    public static final String INSTANCE_ID = "/{iid}";

    public static final String HOST_PATH = INSTANCE_ID + "/host";

    public static final String TRIGGER_PATH = INSTANCE_ID + "/trigger";

    public static final String EVENT_PATH = INSTANCE_ID + "/event";
    public static final String ACK_PATH = EVENT_PATH + "/ack";

    public static final String ITEM_PATH = INSTANCE_ID + "/item";
    public static final String ITEM_PATH_INFO = ITEM_PATH + "/{name}";

    public static final String ACTIONS_PATH = INSTANCE_ID + "/actions";
}
