package nl.groovid19.backend;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertx.core.Vertx;
import io.vertx.core.VertxOptions;

public class Application {

    private static final Logger logger = LogManager.getLogger();

    private Vertx vertx;

    public static void main(String[] args) {
        Application app = new Application();
        app.start();
    }

    public void start() {
        logger.info("Starting application");

        VertxOptions options = new VertxOptions();
        options.setHAEnabled(true);
        vertx = Vertx.vertx(options);

        logger.info("Deploying verticles");
        vertx.deployVerticle(new HealthCheckVerticle());
        vertx.deployVerticle(new SockJsVerticle());
        vertx.deployVerticle(new TestVerticle());
    }
}
