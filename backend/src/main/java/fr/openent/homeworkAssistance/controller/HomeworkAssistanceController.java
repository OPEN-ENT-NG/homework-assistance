package fr.openent.homeworkAssistance.controller;

import java.util.Map;

import fr.wseduc.security.ActionType;
import org.entcore.common.controller.ControllerHelper;
import org.entcore.common.events.EventStore;
import org.entcore.common.events.EventStoreFactory;
import org.entcore.common.http.filter.ResourceFilter;
import org.entcore.common.http.filter.SuperAdminFilter;
import org.vertx.java.core.http.RouteMatcher;

import fr.openent.homeworkAssistance.HomeworkAssistance;
import fr.wseduc.rs.Get;
import fr.wseduc.security.SecuredAction;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonObject;

import static fr.openent.homeworkAssistance.core.constants.Field.KEY;
import static fr.openent.homeworkAssistance.core.constants.Field.KIAMO;

public class HomeworkAssistanceController extends ControllerHelper {
    private EventStore eventStore;
    private enum HomeworkAssistanceEvent { ACCESS }


    public HomeworkAssistanceController() {
        super();
    }

    @Override
    public void init(Vertx vertx, JsonObject config, RouteMatcher rm, Map<String, fr.wseduc.webutils.security.SecuredAction> securedActions) {
        super.init(vertx, config, rm, securedActions);
        eventStore = EventStoreFactory.getFactory().getEventStore(HomeworkAssistance.class.getSimpleName());
    }

    @Get("")
    @SecuredAction("view")
    public void view (HttpServerRequest request) {
        renderView(request, new JsonObject(),"index.html", null);
        eventStore.createAndStoreEvent(HomeworkAssistanceEvent.ACCESS.name(), request);
    }

    @Get("/config")
    @SecuredAction(value = "", type = ActionType.RESOURCE)
    @ResourceFilter(SuperAdminFilter.class)
    public void getConfig(final HttpServerRequest request) {
        JsonObject safeConfig = config.copy();

        JsonObject kiamo = safeConfig.getJsonObject(KIAMO, null);
        if (kiamo != null) {
            if (kiamo.getString(KEY, null) != null) kiamo.put(KEY, "**********");
        }

        renderJson(request, safeConfig);
    }
}
