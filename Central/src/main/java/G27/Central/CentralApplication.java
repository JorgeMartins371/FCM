package G27.Central;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class CentralApplication {

	public static void main(String[] args) {

		SpringApplication.run(CentralApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:9000")
						.allowCredentials(true)
						.allowedHeaders("Authorization", "Content-type", "Access-Control-Allow-Headers")
						//.maxAge(1)
						.exposedHeaders("Custom-Header")
						.allowedMethods("GET", "POST", "DELETE", "PUT")  ;
			}
		};
	}

}
