package G27.Central.DB.repositories;

import G27.Central.DB.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {
    User findByEncoded(String encoded);
    User findByName(String name);
    User save(User user);
    int deleteUserByName(String name);
}
