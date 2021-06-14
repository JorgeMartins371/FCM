package G27.Central.utils.zabbix;

public class ZabbixPaths {

    public static final String INSTANCE_ID = "/{iid}";

    public static final String EVENT_PATH = INSTANCE_ID + "/event";

    public static final String ITEM_PATH = INSTANCE_ID + "/item";
    public static final String ITEM_PATH_INFO = ITEM_PATH + "/{name}";
}
