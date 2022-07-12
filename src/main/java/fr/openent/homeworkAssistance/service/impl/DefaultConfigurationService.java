package fr.openent.homeworkAssistance.service.impl;

import com.mongodb.QueryBuilder;
import fr.openent.homeworkAssistance.service.IConfigurationService;
import fr.wseduc.mongodb.MongoQueryBuilder;
import fr.wseduc.webutils.Either;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import org.entcore.common.service.impl.MongoDbCrudService;

import static org.entcore.common.mongodb.MongoDbResult.validActionResultHandler;

public class DefaultConfigurationService extends MongoDbCrudService implements IConfigurationService {

    private static final Logger log = LoggerFactory.getLogger(DefaultConfigurationService.class);

    public DefaultConfigurationService(String collection) {
        super(collection);
    }

    @Override
    public void get(Handler<Either<String, JsonObject>> handler) {
        mongo.findOne(collection, new JsonObject(), event -> {
            JsonObject result = new JsonObject();
            if(event.body().containsKey("result")){
                result = event.body().getJsonObject("result");
            }
            if(result.containsKey("messages")){
                handler.handle(new Either.Right(result));

            }
            else{
                handler.handle(new Either.Left<>("No waiting orders"));
            }
        });
    }

    @Override
    public void update(Handler<Either<String, JsonObject>> handler, JsonObject settings) {

        mongo.save(collection, settings, event -> {
            if (event.body().getString("status").equals("ok")){
                log.info("[Homework-assistance@Config] La configuration a été sauvegardé");
                String id = settings.getString("_id");
                QueryBuilder query = QueryBuilder.start("_id").notEquals(id);
                mongo.delete(collection, MongoQueryBuilder.build(query), validActionResultHandler(handler));
                if(event.body().getString("status").equals("ok")){
                    handler.handle(new Either.Right(settings));
                }
                else {
                    String message = "[Homework-assistance@Config] Erreur lors de la suppression";
                    log.error(message);
                    handler.handle(new Either.Left<>(message));
                }

            }
            else {
                String message = "[Homework-assistance@Config] Erreur lors de l'enregistrement de la modification";
                log.error(message);
                handler.handle(new Either.Left<>(message));
            }
        });
    }

}