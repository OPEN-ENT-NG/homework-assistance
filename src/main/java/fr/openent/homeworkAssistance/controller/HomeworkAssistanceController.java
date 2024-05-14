package fr.openent.homeworkAssistance.controller;

import fr.openent.homeworkAssistance.HomeworkAssistance;
import fr.wseduc.rs.ApiDoc;
import fr.wseduc.rs.Get;
import fr.wseduc.security.ActionType;
import fr.wseduc.security.SecuredAction;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonObject;
import org.entcore.common.controller.ControllerHelper;
import org.entcore.common.events.EventStore;
import org.entcore.common.events.EventStoreFactory;
import org.entcore.common.http.filter.ResourceFilter;
import org.entcore.common.http.filter.SuperAdminFilter;
import org.vertx.java.core.http.RouteMatcher;
import java.util.Map;

import static fr.openent.homeworkAssistance.core.constants.Field.KEY;
import static fr.openent.homeworkAssistance.core.constants.Field.KIAMO;
import static org.entcore.common.http.response.DefaultResponseHandler.defaultResponseHandler;

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
        renderView(request, new JsonObject());
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
