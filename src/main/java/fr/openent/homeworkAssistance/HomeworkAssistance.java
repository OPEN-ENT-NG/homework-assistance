package fr.openent.homeworkAssistance;
import fr.openent.homeworkAssistance.controller.*;
import fr.openent.homeworkAssistance.controller.HomeworkAssistanceController;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import org.entcore.common.http.BaseServer;

public class HomeworkAssistance extends BaseServer {

	public static final String ADMIN = "homework-assistance.admin";
	public static final String STUDENT = "homework-assistance.student";
	public static Vertx homassistVertx;
	public static JsonObject homassistConfig;

	@Override
	public void start() throws Exception {
		super.start();

		homassistVertx = vertx;
		homassistConfig = config;

		addController(new HomeworkAssistanceController());
		addController(new ConfigurationController());
		addController(new CallbackController(homassistVertx, config));
	}
}