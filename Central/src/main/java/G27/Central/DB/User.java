package G27.Central.DB;

import javax.persistence.*;

@Entity
@Table(name = "User")
public class User {
    @Id
    private String encoded;
    private String name;

    public User(){
    }

    public User(String encoded, String name){
        this.encoded = encoded;
        this.name = name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getEncoded(){
        return this.encoded;
    }

    public String getName(){
        return this.name;
    }
}
