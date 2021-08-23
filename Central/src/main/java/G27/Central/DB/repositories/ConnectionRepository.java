package G27.Central.DB.repositories;

import G27.Central.DB.Connection;
import org.springframework.data.repository.CrudRepository;

public interface ConnectionRepository extends CrudRepository<Connection, String> {
    Connection findByid(String id);
    Connection findByip(String ip);
    Connection findBytool(String tool);
    Connection findByUser(String user);
    Connection findByEncoded(String encoded);
    Connection save(Connection connection);
}
