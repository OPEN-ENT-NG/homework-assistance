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
                    "\"scheduled_date\":\"2022-07-11T22:00:00.000Z\"," +
                    "\"scheduled_time\":{" +
                    "    \"hour\":11," +
                    "    \"minute\":15" +
                    "}," +
                    "\"userdata\":{" +
                    "   \"prenom\":\"Miradi\"," +
                    "   \"nom\":\"BON\"," +
                    "   \"etablissement\":\"Etablissement Formation 15613\"," +
                    "   \"uai\":\"1016024A\"," +
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
                    "\"scheduled_date\": \"2022-07-11 9:15:00\"," +
                    "\"userdata\": {" +
                    "    \"prenom_eleve\": \"\"," +
                    "    \"nom_eleve\": \"\"," +
                    "    \"etablissement\": []," +
                    "    \"uai\": []," +
                    "    \"classe\": []," +
                    "    \"matiere_aide\": \"Test\"," +
                    "    \"informations_complementaires\": \"test\"" +
                    " }" +
                " }" +
                "]";

        ctx.assertEquals(new JsonArray(expectedPayload), kiamoForm.homeworkAssistanceToKiamo());
    }

    @Test
    public void homeworkAssistanceShould_Send_Correct_Payload_With_Another_Format_Date(TestContext ctx) {
        JsonObject homeworkCallbackForm = new JsonObject(
                "{" +
                        "\"destination\":\"06000000\"," +
                        "\"scheduled_date\":\"2022-07-14T00:00:00Z\"," +
                        "\"scheduled_time\":{" +
                        "    \"hour\":11," +
                        "    \"minute\":15" +
                        "}," +
                        "\"userdata\":{" +
                        "   \"prenom\":\"Miradi\"," +
                        "   \"nom\":\"BON\"," +
                        "   \"etablissement\":\"Etablissement Formation 15613\"," +
                        "   \"uai\":\"1016024A\"," +
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
                    "\"scheduled_date\": \"2022-07-14 9:15:00\"," +
                    "\"userdata\": {" +
                    "    \"prenom_eleve\": \"\"," +
                    "    \"nom_eleve\": \"\"," +
                    "    \"etablissement\": []," +
                    "    \"uai\": []," +
                    "    \"classe\": []," +
                    "    \"matiere_aide\": \"Test\"," +
                    "    \"informations_complementaires\": \"test\"" +
                    " }" +
                " }" +
            "]";

        ctx.assertEquals(new JsonArray(expectedPayload), kiamoForm.homeworkAssistanceToKiamo());
    }
}