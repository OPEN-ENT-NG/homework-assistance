package fr.openent.homeworkAssistance.controller;

import fr.openent.homeworkAssistance.HomeworkAssistance;
import fr.openent.homeworkAssistance.security.AdminRight;
import fr.openent.homeworkAssistance.security.StudentRight;
import fr.openent.homeworkAssistance.service.IConfigurationService;
import fr.openent.homeworkAssistance.service.impl.DefaultConfigurationService;
import fr.wseduc.rs.*;
import fr.wseduc.security.ActionType;
import fr.wseduc.security.SecuredAction;
import io.vertx.core.http.HttpServerRequest;
import org.entcore.common.controller.ControllerHelper;
import fr.wseduc.webutils.request.RequestUtils;
import org.entcore.common.http.filter.ResourceFilter;

import static org.entcore.common.http.response.DefaultResponseHandler.defaultResponseHandler;

public class ConfigurationController extends ControllerHelper {

    private final IConfigurationService configurationService;

    public ConfigurationController() {
        super();
        this.configurationService = new DefaultConfigurationService("homework-assistance");
    }
    @Put("/parameters")
    @ApiDoc("Update config")
    @SecuredAction(HomeworkAssistance.ADMIN)
    public void update(HttpServerRequest request) {
        RequestUtils.bodyToJson(request, settings ->
                configurationService.save(defaultResponseHandler(request), settings));
    }
    @Get("/parameters")
    @ApiDoc("Get config")
    @SecuredAction(value="", type = ActionType.AUTHENTICATED)
    public void get(HttpServerRequest request) {
        configurationService.get(defaultResponseHandler(request));
    }
}