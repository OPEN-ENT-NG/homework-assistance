package fr.openent.homeworkAssistance.controller;

import fr.openent.homeworkAssistance.models.FeaturedResource;
import fr.openent.homeworkAssistance.security.ViewRight;
import fr.openent.homeworkAssistance.service.IResourcesService;
import fr.openent.homeworkAssistance.service.impl.DefaultResourcesService;
import fr.wseduc.rs.ApiDoc;
import fr.wseduc.rs.Get;
import fr.wseduc.security.ActionType;
import fr.wseduc.security.SecuredAction;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServerRequest;
import org.entcore.common.controller.ControllerHelper;
import org.entcore.common.http.filter.ResourceFilter;
import org.entcore.common.user.UserUtils;

import java.util.List;
import java.util.stream.Collectors;

public class ResourcesController extends ControllerHelper {
    private final IResourcesService resourcesService;

    public ResourcesController(Vertx vertx) {
        super();
        this.resourcesService = new DefaultResourcesService(vertx);
    }

    @Get("/resources")
    @ApiDoc("Get GAR featured resources")
    @ResourceFilter(ViewRight.class)
    @SecuredAction(value = "", type = ActionType.RESOURCE)
    public void get(HttpServerRequest request){
        UserUtils.getAuthenticatedUserInfos(eb, request)
                .compose(resourcesService::getResources)
                .onSuccess(resources -> {
                    List<FeaturedResource> filteredResources = resources.stream()
                            .filter(resource -> resource.getIdRessource() != null && !resource.getIdRessource().isEmpty())
                            .collect(Collectors.toList());
                    render(request, filteredResources);
                })
                .onFailure(e -> {
                    log.error("[HomeworkAssistance@ResourcesController::get] Failed to handle request: " + e.getMessage());
                    renderError(request);
                });
    }
}
