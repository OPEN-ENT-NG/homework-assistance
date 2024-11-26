package fr.openent.homeworkAssistance.service.impl;

import fr.openent.homeworkAssistance.models.FeaturedResource;
import fr.openent.homeworkAssistance.service.IResourcesService;
import io.vertx.core.Future;
import io.vertx.core.Promise;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.entcore.common.user.UserInfos;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

import static fr.openent.homeworkAssistance.core.constants.Field.*;


public class DefaultResourcesService implements IResourcesService {
    private EventBus eb;
    private static final Logger log = LoggerFactory.getLogger(DefaultResourcesService.class);

    public DefaultResourcesService(Vertx vertx) {
        this.eb = vertx.eventBus();
    }

    public Future<List<FeaturedResource>> getResources(UserInfos user) {
        Promise<List<FeaturedResource>> promise = Promise.promise();
        try {
            JsonObject action = new JsonObject()
                    .put(USER, user.getUserId())
                    .put(MODULE, HOMEWORK_ASSISTANCE);

            eb.request(MEDIACENTRE_ADDRESS, action, event -> {
                if (event.succeeded()) {
                    JsonObject body = (JsonObject) event.result().body();
                    JsonArray resourcesJsonArray = body.getJsonArray(RESOURCES, new JsonArray());
                    List<FeaturedResource> resources = resourcesJsonArray.stream()
                            .map(resourceJson -> new FeaturedResource((JsonObject) resourceJson))
                            .collect(Collectors.toList());
                    promise.complete(resources);
                } else {
                    log.error("[Homework-Assistance@DefaultResourcesService::getResources] Failed to call EventBus: " + event.cause().getMessage());
                    promise.fail(event.cause());
                }
            });
        } catch (Exception e) {
            log.error("[Homework-Assistance@DefaultResourcesService::getResources] Failed to get resources " + e.getMessage());
            promise.fail(e);
        }
        return promise.future();
    }
}
