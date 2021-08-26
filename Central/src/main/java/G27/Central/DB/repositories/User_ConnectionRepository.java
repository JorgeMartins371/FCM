package G27.Central.DB.repositories;

import G27.Central.DB.User_Connection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface User_ConnectionRepository extends CrudRepository<User_Connection, String> {

    @Query("select conID from User_Connection where username=:username")
    List<String> queryByUsername(String username);

    @Query("select id from User_Connection where username=:username and conID=:conID")
    long queryByUserAndCon(String username,String conID);

    User_Connection findByConID(String conID);

    User_Connection save(User_Connection user_connection);

    int deleteConById(long id);
}
