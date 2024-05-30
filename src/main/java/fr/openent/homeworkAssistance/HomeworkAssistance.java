package fr.openent.homeworkAssistance;
import fr.openent.homeworkAssistance.config.KiamoConfig;
import fr.openent.homeworkAssistance.controller.*;
import fr.openent.homeworkAssistance.controller.HomeworkAssistanceController;
import fr.openent.homeworkAssistance.core.constants.Field;
import fr.openent.homeworkAssistance.helper.KiamoHelper;
import fr.openent.homeworkAssistance.service.ServiceFactory;
import io.vertx.core.Promise;
import io.vertx.core.net.ProxyOptions;
import io.vertx.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;
import org.entcore.common.http.BaseServer;

public class HomeworkAssistance extends BaseServer {
	public static final int TIMEOUT_VALUE = 300;
	public static final String ADMIN = "homework-assistance.admin";
	public static final String STUDENT = "homework-assistance.student";

	@Override
	public void start(Promise<Void> startPromise) throws Exception {

		super.start(startPromise);

		WebClient webClient = initWebClient();
		KiamoConfig kiamoConfig = new KiamoConfig(config);
		KiamoHelper kiamoHelper = new KiamoHelper(kiamoConfig, webClient);
		ServiceFactory serviceFactory = new ServiceFactory(vertx, config, webClient, kiamoHelper);

		addController(new HomeworkAssistanceController());
		addController(new ConfigurationController());
		addController(new CallbackController(serviceFactory));
		startPromise.tryComplete();
		startPromise.tryFail("[Homework-assistance@HomeworkAssistance::start] Fail to start Homework-assistance");
	}

	private WebClient initWebClient() {
		WebClientOptions options = new WebClientOptions()
				.setConnectTimeout(HomeworkAssistance.TIMEOUT_VALUE);
		if (config.getJsonObject(Field.PROXY) != null) {
			ProxyOptions proxyOptions = new ProxyOptions()
					.setHost(config.getJsonObject(Field.PROXY).getString(Field.HOST))
					.setPort(config.getJsonObject(Field.PROXY).getInteger(Field.PORT));
			options.setProxyOptions(proxyOptions);
		}
		return WebClient.create(vertx, options);
	}
}