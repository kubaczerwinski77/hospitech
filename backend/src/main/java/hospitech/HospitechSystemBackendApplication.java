package hospitech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class HospitechSystemBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(HospitechSystemBackendApplication.class, args);
    }


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("OPTION", "GET", "PUT", "POST", "DELETE")
                        .allowedOrigins("http://localhost:8080", "http://localhost:3000");
            }
        };
    }
}
