package fr.openent.homeworkAssistance.controller;
import fr.openent.homeworkAssistance.HomeworkAssistance;
import fr.openent.homeworkAssistance.service.ICallbackService;
import fr.openent.homeworkAssistance.service.impl.DefaultCallbackService;
import fr.wseduc.rs.*;
import fr.wseduc.security.SecuredAction;
import fr.wseduc.webutils.request.RequestUtils;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonObject;
import org.entcore.common.controller.ControllerHelper;
import org.entcore.common.http.filter.Trace;
import static org.entcore.common.http.response.DefaultResponseHandler.defaultResponseHandler;

public class CallbackController extends ControllerHelper {

    private ICallbackService callbackService;

    public CallbackController(Vertx vertx, JsonObject config) {
        super();
        this.callbackService = new DefaultCallbackService(vertx, config);
    }

    @Post("/services/:id/callback")
    @ApiDoc("Send data to Kiamo")
    @SecuredAction(HomeworkAssistance.STUDENT)
    @Trace("SEND_FORM")
    public void send(HttpServerRequest request) {
        RequestUtils.bodyToJson(request, form -> callbackService.send(form, defaultResponseHandler(request)));
    }

    @Get("/services/all")
    @ApiDoc("Get services from config")
    public void get(HttpServerRequest request) {
        callbackService.getServices(defaultResponseHandler(request));
    }
}
