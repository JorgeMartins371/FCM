package G27.Central.DB;

import javax.persistence.*;

@Entity
@Table(name = "Connection")
public class Connection {

    @Id
    private String id;
    private String ip;
    private String tool;
    private String user;
    private String encoded;

    public Connection(){

    }

    public Connection(String ID, String IP, String Tool,String user, String encoded){
        this.id = ID;
        this.ip = IP;
        this.tool = Tool;
        this.user = user;
        this.encoded = encoded;
    }

    public void setID(String ID){ this.id = ID;}

    public String getIP() {
        return ip;
    }

    public String getID(){
        return id;
    }

    public String getTool() {
        return tool;
    }

    public String getUser() {
        return user;
    }

    public String getEncoded(){
        return encoded;
    }
}
