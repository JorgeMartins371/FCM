package G27.Central.utils.zabbix;

public class ZabbixPaths {

    //Admin End-Points
    public static final String CONNECTIONS_PATH = "/connections";
    public static final String STOREDCONNECTIONS_PATH = "/storedCon";
    public static final String CONNECTIONS_USER_PATH = CONNECTIONS_PATH + "/{user}";

    public static final String USERS_PATH = "/users";

    public static final String ZABBIX_CON = "/zabbixCon";

    public static final String REGISTER = "/register";

    //Standart User End-Points

    public static final String LOGIN = "/login";

    public static final String INSTANCE_ID = "/{iid}";

    public static final String HOST_PATH = INSTANCE_ID + "/host";
    public static final String HOST_PATH_ID = HOST_PATH + "/{eid}";

    public static final String TRIGGER_PATH = INSTANCE_ID + "/trigger/{eid}";

    public static final String EVENT_PATH = INSTANCE_ID + "/event";
    public static final String ACK_PATH = EVENT_PATH + "/ack";

    public static final String ITEM_PATH = INSTANCE_ID + "/item";
    public static final String ITEM_PATH_INFO = ITEM_PATH + "/{name}";

    public static final String ACTIONS_PATH = INSTANCE_ID + "/actions";
}
