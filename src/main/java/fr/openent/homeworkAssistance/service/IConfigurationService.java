package fr.openent.homeworkAssistance.service;

import fr.wseduc.webutils.Either;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;

public interface IConfigurationService {

    /**
     * get platform configuration
     */
    void get(Handler<Either<String, JsonObject>> handler);

    /**
     * update platform configuration
     */
    void save(Handler<Either<String, JsonObject>> handler, JsonObject settings);

}
