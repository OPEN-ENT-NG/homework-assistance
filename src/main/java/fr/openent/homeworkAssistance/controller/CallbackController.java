package fr.openent.homeworkAssistance.controller;
import fr.openent.homeworkAssistance.HomeworkAssistance;
import fr.openent.homeworkAssistance.core.constants.Field;
import fr.openent.homeworkAssistance.models.KiamoForm;
import fr.openent.homeworkAssistance.security.StudentRight;
import fr.openent.homeworkAssistance.service.ICallbackService;
import fr.openent.homeworkAssistance.service.ServiceFactory;
import fr.openent.homeworkAssistance.service.impl.DefaultCallbackService;
import fr.wseduc.rs.*;
import fr.wseduc.security.ActionType;
import fr.wseduc.security.SecuredAction;
import fr.wseduc.webutils.request.RequestUtils;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonObject;
import org.entcore.common.controller.ControllerHelper;
import org.entcore.common.http.filter.ResourceFilter;
import org.entcore.common.http.filter.Trace;
import static org.entcore.common.http.response.DefaultResponseHandler.defaultResponseHandler;

public class CallbackController extends ControllerHelper {

    private final ICallbackService callbackService;

    public CallbackController(ServiceFactory serviceFactory ) {
        super();
        this.callbackService = new DefaultCallbackService(serviceFactory);
    }

    @Post("/services/:id/callback")
    @ApiDoc("Send data to Kiamo")
    @SecuredAction(HomeworkAssistance.STUDENT)
    @Trace("SEND_FORM")
    public void send(HttpServerRequest request) {
        try {
            Integer serviceId = Integer.parseInt(request.getParam(Field.ID));
            RequestUtils.bodyToJson(request, form -> {
                KiamoForm kiamoForm = new KiamoForm(form);
                callbackService.send(serviceId, kiamoForm)
                        .onSuccess(res -> renderJson(request, res))
                        .onFailure(err -> renderError(request, new JsonObject().put(Field.ERROR, err.getMessage())));
            });
        } catch (NumberFormatException err) {
            String message = String.format("[HomeworkAssistance@%s::send] An error has occurred: ", this.getClass().getSimpleName());
            log.error(String.format("%s %s", message, err.getMessage()));
            badRequest(request);
        }
    }

    @Get("/services/all")
    @ApiDoc("Get services from config")
    @ResourceFilter(StudentRight.class)
    @SecuredAction(value="", type = ActionType.RESOURCE)
    public void get(HttpServerRequest request) {
        callbackService.getServices(defaultResponseHandler(request));
    }
}
