package nl.groovid19.backend;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.math3.random.RandomDataGenerator;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CorsHandler;

public class ActionStoreVerticle extends AbstractVerticle {

    private static final Logger LOGGER = LogManager.getLogger();

    private final Router router;

    private Map<String, JsonObject> actions = new HashMap<>();

    public ActionStoreVerticle(Router router) {
        this.router = router;
    }

    private String generateToken() {
        RandomDataGenerator randomDataGenerator = new RandomDataGenerator();
        return randomDataGenerator.nextSecureHexString(24);
    }

    private void handlePost(RoutingContext routingContext) {
        var body = routingContext.getBodyAsJson();
        var token = generateToken();

        actions.put(token, body);
        routingContext.response().end(token);
        routingContext.next();
    }

    private void handleGet(RoutingContext routingContext) {
        var token = routingContext.request().getParam("token");
        var action = actions.get(token);

        if (action == null) {
            routingContext.response().setStatusCode(404).end();
        } else {
            routingContext.response().end(action.toString());
        }
        routingContext.next();
    }

    @Override
    public void start() {
        LOGGER.info("Starting action-store verticle");

        router.route("/action/*").handler(CorsHandler.create("*")
                .allowedMethod(HttpMethod.POST)
                .allowedMethod(HttpMethod.GET)
                .allowedHeader("content-type"));
        router.post("/action/").handler(BodyHandler.create());
        router.post("/action/").handler(this::handlePost);
        router.get("/action/:token").handler(this::handleGet);
    }
}
