package fr.openent.homeworkAssistance.service.impl;

import fr.openent.homeworkAssistance.core.constants.Field;
import fr.openent.homeworkAssistance.service.IConfigurationService;
import fr.wseduc.webutils.Either;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import org.entcore.common.service.impl.MongoDbCrudService;

public class DefaultConfigurationService extends MongoDbCrudService implements IConfigurationService {

    protected static final Logger log = LoggerFactory.getLogger(DefaultConfigurationService.class);

    public DefaultConfigurationService(String collection) {
        super(collection);
    }

    @Override
    public void get(Handler<Either<String, JsonObject>> handler) {
        mongo.findOne(collection, new JsonObject(), event -> {
            if (event.body().getString(Field.STATUS).equals(Field.ok)) {
                JsonObject result = event.body().getJsonObject(Field.RESULT, new JsonObject());
                if (result.containsKey(Field.MESSAGES))
                    handler.handle(new Either.Right<>(result));
                else
                    handler.handle(new Either.Left<>("No waiting orders"));
            } else {
                String message = "[Homework-assistance@DefaultConfigurationService] " +
                        "Error while getting config : " + event.body().toString();
                log.error(message);
                handler.handle(new Either.Left<>(message));
            }
        });
    }

    @Override
    public void save(Handler<Either<String, JsonObject>> handler, JsonObject settings) {
        mongo.count(collection, new JsonObject(), count -> {
            if (count.body().getString(Field.STATUS).equals(Field.ok)) {
                Integer numberOfDocuments = count.body().getInteger(Field.COUNT);
                switch (numberOfDocuments) {
                    case 0 :
                        insertConfig(handler, settings);
                    case 1 :
                        updateConfig(handler, settings);
                    default :
                        //If more than one document, we delete all configs and insert the new one
                        mongo.delete(collection, new JsonObject(), result -> {
                            if (result.body().getString(Field.STATUS).equals(Field.ok)) {
                                insertConfig(handler, settings);
                            } else {
                                String message = "[Homework-assistance@DefaultConfigurationService] " +
                                        "Error while deleting config : " + result.body().toString();
                                log.error(message);
                                handler.handle(new Either.Left<>(message));
                            }
                        });
                }
            } else {
                String message = "[Homework-assistance@DefaultConfigurationService] " +
                        "Error while counting config : " + count.body().toString();
                log.error(message);
                handler.handle(new Either.Left<>(message));
            }
        });
    }

    private void updateConfig(Handler<Either<String, JsonObject>> handler, JsonObject settings) {
        JsonObject configToUpdate = new JsonObject().put(Field._ID, settings.getInteger(Field._ID));
        mongo.update(collection, configToUpdate, settings, event -> {
            if (event.body().getString(Field.STATUS).equals(Field.ok)) {
                handler.handle(new Either.Right<>(settings));
            } else {
                String message = "[Homework-assistance@DefaultConfigurationService] " +
                        "Error while updating config : " + event.body().toString();
                log.error(message);
                handler.handle(new Either.Left<>(message));
            }
        });
    }

    private void insertConfig(Handler<Either<String, JsonObject>> handler, JsonObject settings) {
        mongo.insert(collection, settings, event -> {
            if (event.body().getString(Field.STATUS).equals(Field.ok)) {
                handler.handle(new Either.Right<>(settings));
            } else {
                String message = "[Homework-assistance@DefaultConfigurationService] " +
                        "Error while inserting new config : " + event.body().toString();
                log.error(message);
                handler.handle(new Either.Left<>(message));
            }
        });
    }

}
