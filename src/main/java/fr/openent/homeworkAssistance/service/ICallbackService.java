package fr.openent.homeworkAssistance.service;
import fr.openent.homeworkAssistance.models.KiamoForm;
import fr.wseduc.webutils.Either;
import io.vertx.core.Future;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;

public interface ICallbackService {

    /**
     * send data to kiamo
     *
     * @param serviceId     User Session {@link Integer}
     * @param kiamoForm     kiamo payload form {@link KiamoForm}
     * @return  Future containing response of send action {@link JsonObject}
     */
    Future<JsonObject> send(Integer serviceId, KiamoForm kiamoForm);

    /**
     * get services names and keys
     */
    void getServices(Handler<Either<String, JsonObject>> handler);

}
