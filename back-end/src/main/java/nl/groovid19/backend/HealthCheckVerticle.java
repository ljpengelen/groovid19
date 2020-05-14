package nl.groovid19.backend;

import java.io.IOException;
import java.util.Objects;
import java.util.Properties;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;

public class HealthCheckVerticle extends AbstractVerticle {

    private static final Logger LOGGER = LogManager.getLogger();

    private final Router router;

    HealthCheckVerticle(Router router) {
        this.router = router;
    }

    private String getCommitHash() {
        var commitHash = System.getenv("DEPLOY_REVISION");
        if (commitHash == null) {
            return "untracked";
        }

        return commitHash;
    }

    private String getVersion() {
        Properties properties = new Properties();
        try {
            properties.load(Objects.requireNonNull(this.getClass().getClassLoader().getResourceAsStream("build.properties")));
            return properties.getProperty("project.version");
        } catch (IOException e) {
            return "unknown";
        }
    }

    @Override
    public void start() {
        LOGGER.info("Starting health-check verticle");

        var commitHash = getCommitHash();
        var version = getVersion();

        var responseBody = new JsonObject()
                .put("commitHash", commitHash)
                .put("version", version)
                .toString();

        router.route(HttpMethod.GET, "/health").handler(request -> {
            var response = request.response();
            response.putHeader("content-type", "application/json");
            response.end(responseBody);
        });
    }
}
