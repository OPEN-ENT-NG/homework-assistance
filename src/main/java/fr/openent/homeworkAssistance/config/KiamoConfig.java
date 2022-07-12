package fr.openent.homeworkAssistance.config;

import fr.openent.homeworkAssistance.core.constants.Field;
import io.vertx.core.json.JsonObject;

public class KiamoConfig {
    private final String server;
    private final String key;

    public KiamoConfig(JsonObject kiamoConfig) {
        this.server = kiamoConfig.getJsonObject(Field.KIAMO, new JsonObject()).getString(Field.SERVER);
        this.key = kiamoConfig.getJsonObject(Field.KIAMO, new JsonObject()).getString(Field.KEY);
    }

    public String server() {
        return server;
    }

    public String key() {
        return key;
    }
}
