package fr.openent.homeworkAssistance.service;

import fr.openent.homeworkAssistance.helper.KiamoHelper;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.client.WebClient;

public class ServiceFactory {
    private final WebClient webClient;
    private final Vertx vertx;
    private final JsonObject config;
    private final KiamoHelper kiamoHelper;

    public ServiceFactory(Vertx vertx, JsonObject config, WebClient webClient, KiamoHelper kiamoHelper) {
        this.vertx = vertx;
        this.config = config;
        this.webClient = webClient;
        this.kiamoHelper = kiamoHelper;
    }

    public WebClient getWebClient() {
        return webClient;
    }

    public KiamoHelper kiamoHelper() {
        return kiamoHelper;
    }

    public Vertx getVertx() {
        return vertx;
    }

    public JsonObject getConfig() {
        return config;
    }
}
