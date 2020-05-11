package nl.groovid19.backend;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.json.JsonObject;

public class TestVerticle extends AbstractVerticle {

    private static final Logger LOGGER = LogManager.getLogger();

    private EventBus eventBus;

    @Override
    public void start() {
        LOGGER.info("Starting test verticle");

        eventBus = vertx.eventBus();

        vertx.setPeriodic(5000, timerId -> {
            LOGGER.info("Publish message");
            eventBus.publish(SockJsVerticle.OUTGOING_ACTIONS_ADDRESS, new JsonObject().put("message", "hello from server"));
        });

        eventBus.consumer(SockJsVerticle.INCOMING_ACTIONS_ADDRESS, msg -> {
            var body = (JsonObject) msg.body();
            LOGGER.info("Received a message: '{}'", body);
        });
    }
}
