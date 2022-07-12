package fr.openent.homeworkAssistance.helper;
import fr.openent.homeworkAssistance.config.KiamoConfig;
import fr.openent.homeworkAssistance.models.KiamoForm;
import io.vertx.core.*;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.ext.web.client.HttpResponse;
import io.vertx.ext.web.client.WebClient;

public class KiamoHelper {

    protected static final Logger log = LoggerFactory.getLogger(KiamoHelper.class);
    private final KiamoConfig kiamoConfig;
    private final WebClient webClient;


    public KiamoHelper(KiamoConfig kiamoConfig, WebClient webClient) {
        this.kiamoConfig = kiamoConfig;
        this.webClient = webClient;
    }

    private String endpoint(Integer serviceId) {
        return this.kiamoConfig.server() + "/api/services/" + serviceId + "/tasks?token=" + this.kiamoConfig.key();
    }

    public Future<Buffer> sendForm(Integer serviceId, KiamoForm kiamoForm) {
        Promise<Buffer> promise = Promise.promise();

        this.webClient.postAbs(this.endpoint(serviceId)).sendJson(kiamoForm.homeworkAssistanceToKiamo(), responseAsync -> {
            if (responseAsync.failed()) {
                String message = String.format("[HomeworkAssistance@%s::sendForm] An error has occurred during fetching endpoint : %s",
                            this.getClass().getSimpleName(), responseAsync.cause().getMessage());
                log.error(message);
                promise.fail(responseAsync.cause().getMessage());
            } else {
                HttpResponse<Buffer> response = responseAsync.result();
                if (response.statusCode() != 201) {
                    String messageToFormat = "[HomeworkAssistance@%s::sendForm] Response status is not a HTTP 201 : %s : %s";
                    HttpResponseHelper.reject(log, messageToFormat, this.getClass().getSimpleName(), response, promise);
                } else {
                    promise.complete(response.body());
                }
            }
        });
        return promise.future();
    }
}