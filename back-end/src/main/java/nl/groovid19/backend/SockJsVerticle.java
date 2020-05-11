package nl.groovid19.backend;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertx.core.AbstractVerticle;
import io.vertx.ext.bridge.PermittedOptions;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.sockjs.BridgeOptions;
import io.vertx.ext.web.handler.sockjs.SockJSHandler;

public class SockJsVerticle extends AbstractVerticle {

    public static final String INCOMING_ACTIONS_ADDRESS = "eventsFromClientsToServer";
    public static final String OUTGOING_ACTIONS_ADDRESS = "eventsFromServerToClients";

    private static final Logger LOGGER = LogManager.getLogger();

    private Router sockJsRouter() {
        BridgeOptions bridgeOptions = new BridgeOptions()
                .addInboundPermitted(new PermittedOptions().setAddress(INCOMING_ACTIONS_ADDRESS))
                .addOutboundPermitted(new PermittedOptions().setAddress(OUTGOING_ACTIONS_ADDRESS));

        SockJSHandler sockJSHandler = SockJSHandler.create(vertx);

        return sockJSHandler.bridge(bridgeOptions);
    }

    @Override
    public void start() {
        Router router = Router.router(vertx);
        router.route("/eventBus/*").handler(context -> {
            LOGGER.info("Connecting to the event bus");

            var token = context.request().getParam("token");
            var tokenIsValid = true;
            if (tokenIsValid) {
                LOGGER.info("Successfully connected to the event bus");
                context.next();
            } else {
                LOGGER.error("Invalid token '{}' used to connect to the event bus", token);
                context.fail(401);
            }
        });
        router.mountSubRouter("/eventBus", sockJsRouter());

        vertx.createHttpServer().requestHandler(router::handle).listen(3003);
    }
}
