package nl.groovid19.backend;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.IOException;
import java.net.ServerSocket;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;

import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.client.HttpResponse;
import io.vertx.ext.web.client.WebClient;
import io.vertx.junit5.VertxExtension;
import io.vertx.junit5.VertxTestContext;

@DisplayName("Health-check verticle")
@ExtendWith(VertxExtension.class)
public class HealthCheckVerticleTest {

    private static final Logger LOGGER = LogManager.getLogger();

    private int port;

    @BeforeEach
    public void deployVerticle(Vertx vertx, VertxTestContext vertxTestContext) throws IOException {
        ServerSocket socket = new ServerSocket(0);
        port = socket.getLocalPort();
        socket.close();

        var router = Router.router(vertx);
        var httpServer = vertx.createHttpServer();
        httpServer.requestHandler(router);

        vertx.deployVerticle(new HealthCheckVerticle(router), deployResult -> {
            if (deployResult.succeeded()) {
                httpServer.listen(port, listenResult -> {
                    if (listenResult.succeeded()) {
                        var server = listenResult.result();
                        LOGGER.info("HTTP server is listening on port {}", server.actualPort());
                        vertxTestContext.completeNow();
                    } else {
                        LOGGER.error("HTTP server is unable to listen", listenResult.cause());
                        vertxTestContext.failNow(listenResult.cause());
                    }
                });
            } else {
                vertxTestContext.failNow(deployResult.cause());
            }
        });
    }

    @Test
    @DisplayName("Returns an HTTP 200 OK on every request")
    public void testHTTP200OK(Vertx vertx, VertxTestContext vertxTestContext) {
        WebClient client = WebClient.create(vertx);
        client.get(port, "localhost", "/health")
                .send(ar -> {
                    if (ar.failed()) {
                        LOGGER.error("Request to health endpoint failed", ar.cause());
                        vertxTestContext.failNow(ar.cause());
                    }

                    vertxTestContext.verify(() -> {
                        assertThat(ar.succeeded()).isTrue();

                        HttpResponse<Buffer> response = ar.result();
                        assertThat(response.statusCode()).isEqualTo(200);
                    });
                    vertxTestContext.completeNow();
                });
    }

    @Test
    @DisplayName("Returns commit hash on every request")
    public void returnsCommitHash(Vertx vertx, VertxTestContext vertxTestContext) {
        WebClient client = WebClient.create(vertx);
        client.get(port, "localhost", "/health")
                .send(ar -> {
                    if (ar.failed()) {
                        LOGGER.error("Request to health endpoint failed", ar.cause());
                        vertxTestContext.failNow(ar.cause());
                    }

                    vertxTestContext.verify(() -> {
                        assertThat(ar.succeeded()).isTrue();

                        HttpResponse<Buffer> response = ar.result();
                        assertThat(response.bodyAsJsonObject().getString("commitHash")).isNotBlank();
                    });
                    vertxTestContext.completeNow();
                });
    }

    @Test
    @DisplayName("Returns version on every request")
    public void returnsVersion(Vertx vertx, VertxTestContext vertxTestContext) {
        WebClient client = WebClient.create(vertx);
        client.get(port, "localhost", "/health")
                .send(ar -> {
                    if (ar.failed()) {
                        LOGGER.error("Request to health endpoint failed", ar.cause());
                        vertxTestContext.failNow(ar.cause());
                    }

                    vertxTestContext.verify(() -> {
                        assertThat(ar.succeeded()).isTrue();

                        HttpResponse<Buffer> response = ar.result();
                        assertThat(response.bodyAsJsonObject().getString("version")).isNotBlank();
                    });
                    vertxTestContext.completeNow();
                });
    }
}
