package G27.Central.zabbix.user;

import G27.Central.DB.User;
import G27.Central.DB.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static G27.Central.utils.zabbix.ZabbixPaths.REGISTER;

@RestController
public class UserController {

    @Autowired
    private UserRepository ur;

    @PostMapping(REGISTER)
    public void register(@RequestBody User user){
        User newUser = new User(user.getEncoded(), user.getName());
        ur.save(newUser);
    }
}
