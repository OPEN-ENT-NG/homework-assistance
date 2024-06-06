package fr.openent.homeworkAssistance.models;

import fr.openent.homeworkAssistance.core.constants.Field;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

public class KiamoForm {
    final Logger log = LoggerFactory.getLogger(KiamoForm.class);
    private String destination;
    private String dateTime;
    private UserData userData;

    public KiamoForm(JsonObject kiamoPayload) {
        this.destination = kiamoPayload.getString(Field.DESTINATION);
        this.dateTime = this.formatDateTime(kiamoPayload);
        this.userData = new UserData(kiamoPayload.getJsonObject(Field.USERDATA, new JsonObject()))
                .setAdditionalInformation(kiamoPayload.getString(Field.INFORMATIONS_COMPLEMENTAIRES));
    }

    private String formatDateTime (JsonObject kiamoPayload) {
        TimeZone tz = TimeZone.getTimeZone("Europe/Paris");
        int offset = tz.getOffset(new Date().getTime()) / 1000 / 60 / 60;

        String date = kiamoPayload.getString(Field.SCHEDULED_DATE, kiamoPayload.getString(Field.CALLBACK_DATE)).substring(0, 10);
        JsonObject localTime = kiamoPayload.getJsonObject(Field.SCHEDULED_TIME, kiamoPayload.getJsonObject(Field.CALLBACK_TIME));

        try {
            int hour = Integer.parseInt(localTime.getValue(Field.HOUR, "00").toString());
            int minute = Integer.parseInt(localTime.getValue(Field.MINUTE, "00").toString());
            return String.format("%s %s:%s:00", date, (hour - offset), minute);
        }
        catch (NumberFormatException e) {
            log.error("[HomeworkAssistance@KiamoForm::formatDateTime] Failed to format date and time of payload to make Kiamo model.");
            throw e;
        }
    }

    // Getters

    public String getDestination() {
        return destination;
    }

    public String getDateTime() {
        return dateTime;
    }

    public UserData getUserData() {
        return userData;
    }

    // Setters

    public KiamoForm setDestination(String destination) {
        this.destination = destination;
        return this;
    }

    public KiamoForm setDateTime(String dateTime) {
        this.dateTime = dateTime;
        return this;
    }

    public KiamoForm setUserData(UserData userData) {
        this.userData = userData;
        return this;
    }

    public static class UserData {
        private String firstName;
        private String lastName;
        private List<String> structures;
        private List<String> uais;
        private List<String> groups;
        private String subject;
        private String additionalInformation;

        public UserData(JsonObject userData) {
            this.firstName = "";
            this.lastName = "";
            this.structures = new ArrayList<>();
            this.uais = new ArrayList<>();
            this.groups = new ArrayList<>();
            this.subject = userData.getString(Field.MATIERE);
            this.additionalInformation = null;
        }

        // Getters

        public String getFirstName() {
            return firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public List<String> getStructures() {
            return structures;
        }

        public List<String> getUais() {
            return uais;
        }

        public List<String> getGroups() {
            return groups;
        }

        public String getSubject() {
            return subject;
        }


        // Setters

        public UserData setFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public UserData setLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public UserData setStructures(List<String> structures) {
            this.structures = structures;
            return this;
        }

        public UserData setUais(List<String> uais) {
            this.uais = uais;
            return this;
        }

        public UserData setGroups(List<String> groups) {
            this.groups = groups;
            return this;
        }

        public UserData setSubject(String subject) {
            this.subject = subject;
            return this;
        }

        public UserData setAdditionalInformation(String additionalInformation) {
            this.additionalInformation = additionalInformation;
            return this;
        }

        public JsonObject toJSON() {
            return new JsonObject()
                    .put(Field.PRENOM_ELEVE, this.firstName)
                    .put(Field.NOM_ELEVE, this.lastName)
                    .put(Field.ETABLISSEMENT, this.structures)
                    .put(Field.UAI, this.uais)
                    .put(Field.CLASSE, this.groups)
                    .put(Field.MATIERE_AIDE, this.subject)
                    .put(Field.INFORMATIONS_COMPLEMENTAIRES, this.additionalInformation);
        }

        private JsonObject formatForKiamo() {
            JsonObject jo = this.toJSON();
            for (String key : jo.fieldNames()) {
                Object value = jo.getValue(key);
                if (value instanceof JsonArray && !((JsonArray) value).isEmpty()) {
                    jo.put(key, ((JsonArray) value).getValue(0));
                }
            }
            return jo;
        }
    }

    public JsonArray homeworkAssistanceToKiamo() {
        JsonObject kiamoPayload = new JsonObject();
        kiamoPayload.put(Field.DESTINATION, this.destination)
                .put(Field.SCHEDULED_DATE, this.dateTime)
                .put(Field.USERDATA, this.userData.formatForKiamo());
        return new JsonArray().add(kiamoPayload);
    }
}