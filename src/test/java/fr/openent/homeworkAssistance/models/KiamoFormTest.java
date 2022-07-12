package fr.openent.homeworkAssistance.models;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.unit.TestContext;
import io.vertx.ext.unit.junit.VertxUnitRunner;
import org.junit.Test;
import org.junit.runner.RunWith;


@RunWith(VertxUnitRunner.class)
public class KiamoFormTest {

    @Test
    public void homeworkAssistanceShould_Send_Correct_Payload(TestContext ctx) {
        JsonObject homeworkCallbackForm = new JsonObject(
                "{" +
                    "\"destination\":\"06000000\"," +
                    "\"callback_date\":\"2022-07-11T22:00:00.000Z\"," +
                    "\"callback_time\":{" +
                    "    \"hour\":\"11\"," +
                    "    \"minute\":15" +
                    "}," +
                    "\"userdata\":{" +
                    "   \"prenom\":\"Miradi\"," +
                    "   \"nom\":\"BON\"," +
                    "   \"etablissement\":\"Etablissement Formation 15613\"," +
                    "   \"classe\":\"6 3\"," +
                    "   \"matiere\":\"Test\"," +
                    "   \"service\":251\r\n   " +
                    "}," +
                    "\"informations_complementaires\":\"test\"" +
                "}");
        KiamoForm kiamoForm = new KiamoForm(homeworkCallbackForm);

        String expectedPayload = "[" +
                "{" +
                    "\"destination\": \"06000000\"," +
                    "\"callback_date\": \"2022-07-11T11:15:00+02:00\"," +
                    "\"userdata\": {" +
                    "    \"prenom_eleve\": \"Miradi\"," +
                    "    \"nom_eleve\": \"BON\"," +
                    "    \"etablissement\": \"Etablissement Formation 15613\"," +
                    "    \"classe\": \"6 3\"," +
                    "    \"matiere_aide\": \"Test\"," +
                    "    \"informations_complementaires\": \"test\"" +
                    " }" +
                " }" +
                "]";

        ctx.assertEquals(new JsonArray(expectedPayload), kiamoForm.homeworkAssistanceToKiamo());
    }
}