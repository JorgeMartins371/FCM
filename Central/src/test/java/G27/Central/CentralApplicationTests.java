package G27.Central;

import G27.Central.connectors.Zabbix.ZabbixConnector;
import G27.Central.utils.Request;
import G27.Central.utils.RequestBuilder;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CentralApplicationTests {

	private ZabbixConnector zabbixApi;

	public void before() {
		String url = "http://localhost:49156/zabbix/api_jsonrpc.php";

		url = "http://195.22.17.158//zabbix/api_jsonrpc.php";

		zabbixApi = new ZabbixConnector(url);
		zabbixApi.init();
	}

	@Test
	public void testLogin() {
		before();
		String user = "user_isel_estagio";
		String password = "Admin.Cl4raN€t";
		boolean login = zabbixApi.login(user, password);
		System.out.println("login result:" + login);

		if (login) {
			Request request = RequestBuilder.newBuilder().method("user.get")
					.paramEntry("output", "extend").build();
			JSONObject response = zabbixApi.call(request);
			System.err.println(JSON.toJSONString(response, true));
		}

	}
}
