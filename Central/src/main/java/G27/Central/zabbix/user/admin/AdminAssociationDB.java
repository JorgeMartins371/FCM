package G27.Central.zabbix.user.admin;

import G27.Central.DB.User_Connection;
import G27.Central.DB.repositories.User_ConnectionRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.util.List;

public class AdminAssociationDB {

    @Autowired
    private static User_ConnectionRepository ucr;

    @Transactional
    public static int deleteAssociation(List<User_Connection> cons){

        int ret=0;

        for (User_Connection aux: cons) {
            ret+=ucr.deleteConById(aux.getID());
        }
        return ret;
    }
}
