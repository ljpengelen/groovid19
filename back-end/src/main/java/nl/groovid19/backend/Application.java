package nl.groovid19.backend;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertx.core.*;
import io.vertx.ext.web.Router;

public class Application {

    private static final Logger LOGGER = LogManager.getLogger();

    private Vertx vertx;

    private Future<String> deployVerticle(Verticle verticle) {
        Promise<String> promise = Promise.promise();
        vertx.deployVerticle(verticle, promise);
        return promise.future();
    }

    public void start() {
        LOGGER.info("Starting application");

        VertxOptions options = new VertxOptions();
        options.setHAEnabled(true);
        vertx = Vertx.vertx(options);

        LOGGER.info("Deploying verticles");

        var router = Router.router(vertx);
        var httpServer = vertx.createHttpServer();
        httpServer.requestHandler(router);

        CompositeFuture.all(
                deployVerticle(new HealthCheckVerticle(router)),
                deployVerticle(new SockJsVerticle(router))).onComplete(deploymentResult -> {
            if (deploymentResult.succeeded()) {
                LOGGER.info("All verticles started successfully");
                httpServer.listen(3003, ar -> {
                    if (ar.succeeded()) {
                        var server = ar.result();
                        LOGGER.info("HTTP server is listening on port {}", server.actualPort());
                    } else {
                        LOGGER.error("HTTP server is unable to listen", ar.cause());
                    }
                });
            } else {
                LOGGER.error("Unable to deploy all verticles", deploymentResult.cause());
            }
        });
    }

    public static void main(String[] args) {
        Application app = new Application();
        app.start();
    }
}
