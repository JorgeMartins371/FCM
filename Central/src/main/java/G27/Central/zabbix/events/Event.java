package G27.Central.zabbix.events;

import java.sql.Timestamp;

public class Event {

    private String eventId, objectId;
    private Integer object,acknowledged,value,severity, suppressed;
    private Timestamp clock;

    public Event(String eventId, String objectId, Integer object, Integer acknowledged, Timestamp clock, Integer value, Integer severity, Integer suppressed){
        this.eventId = eventId;
        this.objectId = objectId;
        this.object = object;
        this.acknowledged = acknowledged;
        this.clock = clock;
        this.value = value;
        this.severity = severity;
        this.suppressed = suppressed;
    }

    public String getEventId() {
        return eventId;
    }

    public String getObjectId() {
        return objectId;
    }

    public Integer getObject() {
        return object;
    }

    public Integer getAcknowledged() {
        return acknowledged;
    }

    public Integer getValue() {
        return value;
    }

    public Integer getSeverity() {
        return severity;
    }

    public Integer getSuppressed() {
        return suppressed;
    }

    public Timestamp getClock() {
        return clock;
    }
}
