package nl.groovid19.backend;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertx.core.AbstractVerticle;
import io.vertx.ext.bridge.PermittedOptions;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.sockjs.BridgeOptions;
import io.vertx.ext.web.handler.sockjs.SockJSHandler;

public class SockJsVerticle extends AbstractVerticle {

    private static final Logger LOGGER = LogManager.getLogger();
    private static final String CLIENTS_TO_CLIENTS_ADDRESS_REGEX = "clientsToClients\\..*";

    private final Router router;

    public SockJsVerticle(Router router) {
        this.router = router;
    }

    private Router sockJsRouter() {
        BridgeOptions bridgeOptions = new BridgeOptions()
                .addInboundPermitted(new PermittedOptions().setAddressRegex(CLIENTS_TO_CLIENTS_ADDRESS_REGEX))
                .addOutboundPermitted(new PermittedOptions().setAddressRegex(CLIENTS_TO_CLIENTS_ADDRESS_REGEX));

        SockJSHandler sockJSHandler = SockJSHandler.create(vertx);

        return sockJSHandler.bridge(bridgeOptions);
    }

    @Override
    public void start() {
        LOGGER.info("Starting SockJs verticle");
        router.mountSubRouter("/eventBus", sockJsRouter());
    }
}
