package G27.Central.DB;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "user_connection")
public class User_Connection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String conID;

    public User_Connection(){
    }

    public User_Connection(String username, String conID){
        this.username = username;
        this.conID = conID;
    }

    public String getUsername(){
        return this.username;
    }

    public String getConID() { return this.conID;}

    public long getID(){return this.id;}
}
