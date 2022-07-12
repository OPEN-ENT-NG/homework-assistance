package fr.openent.homeworkAssistance.models;

import fr.openent.homeworkAssistance.core.constants.Field;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

import java.time.Instant;
import java.time.OffsetTime;
import java.time.ZoneId;

public class KiamoForm {
    private final String destination;
    private final String dateTime;
    private final UserData userData;

    public KiamoForm(JsonObject kiamoPayload) {
        this.destination = kiamoPayload.getString(Field.DESTINATION);
        this.dateTime = kiamoPayload.getString(Field.CALLBACK_DATE).substring(0, 11) +
                kiamoPayload.getJsonObject(Field.CALLBACK_TIME).getValue(Field.HOUR) + ":" +
                kiamoPayload.getJsonObject(Field.CALLBACK_TIME).getInteger(Field.MINUTE) + ":00" +
                OffsetTime.ofInstant(Instant.now(), ZoneId.of(Field.ZONE_EU)).getOffset();
        this.userData = new UserData(kiamoPayload.getJsonObject(Field.USERDATA, new JsonObject()))
                .setAdditionalInformation(kiamoPayload.getString(Field.INFORMATIONS_COMPLEMENTAIRES));
    }

    public static class UserData {
        private final String firstName;
        private final String lastName;
        private final String structure;
        private final String group;
        private final String subject;
        private String additionalInformation;

        public UserData(JsonObject userData) {
            this.firstName = userData.getString(Field.PRENOM);
            this.lastName = userData.getString(Field.NOM);
            this.structure = userData.getString(Field.ETABLISSEMENT);
            this.group = userData.getString(Field.CLASSE);
            this.subject = userData.getString(Field.MATIERE);
            this.additionalInformation = null;
        }

        public UserData setAdditionalInformation(String additionalInformation) {
            this.additionalInformation = additionalInformation;
            return this;
        }

        public JsonObject toJSON() {
            return new JsonObject()
                    .put(Field.PRENOM_ELEVE, this.firstName)
                    .put(Field.NOM_ELEVE, this.lastName)
                    .put(Field.ETABLISSEMENT, this.structure)
                    .put(Field.CLASSE, this.group)
                    .put(Field.MATIERE_AIDE, this.subject)
                    .put(Field.INFORMATIONS_COMPLEMENTAIRES, this.additionalInformation);
        }
    }

    public JsonArray homeworkAssistanceToKiamo() {
        JsonObject kiamoPayload = new JsonObject();
        kiamoPayload.put(Field.DESTINATION, this.destination)
                .put(Field.CALLBACK_DATE, this.dateTime)
                .put(Field.USERDATA, this.userData.toJSON());
        return new JsonArray().add(kiamoPayload);
    }
}
