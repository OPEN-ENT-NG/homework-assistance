package fr.openent.homeworkAssistance.service.impl;
import fr.openent.homeworkAssistance.core.constants.Field;
import fr.openent.homeworkAssistance.helper.KiamoHelper;
import fr.openent.homeworkAssistance.models.KiamoForm;
import fr.openent.homeworkAssistance.service.ICallbackService;
import fr.openent.homeworkAssistance.service.ServiceFactory;
import fr.wseduc.webutils.Either;
import io.vertx.core.Future;
import io.vertx.core.Handler;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

public class DefaultCallbackService implements ICallbackService {
    private final JsonObject config;
    private final KiamoHelper kiamoHelper;

    final Logger log = LoggerFactory.getLogger(DefaultCallbackService.class);


    public DefaultCallbackService(ServiceFactory serviceFactory) {
        this.config = serviceFactory.getConfig();
        this.kiamoHelper = serviceFactory.kiamoHelper();
    }

    @Override
    public Future<JsonObject> send(Integer serviceId, KiamoForm kiamoForm) {
        Promise<JsonObject> promise = Promise.promise();
        this.kiamoHelper.sendForm(serviceId, kiamoForm)
                .onSuccess(res -> promise.complete(new JsonObject().put(Field.STATUS, Field.OK)))
                .onFailure(err -> {
                    String message = String.format("[HomeworkAssistance@%s::send] Failed to send request to Kiamo: ", this.getClass().getSimpleName());
                    log.error(String.format("%s %s", message, err.getMessage()));
                    promise.fail(err.getMessage());
                });
        return promise.future();
    }

    @Override
    public void getServices(Handler<Either<String, JsonObject>> handler) {
        JsonObject services = config.getJsonObject("services") != null ? config.getJsonObject("services") : new JsonObject();
        handler.handle(new Either.Right<>(services));
    }
}