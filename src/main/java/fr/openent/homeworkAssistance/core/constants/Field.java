package fr.openent.homeworkAssistance.core.constants;

public class Field {

    private Field() {
        throw new IllegalStateException("Utility Field constant");
    }

    public static final String ID = "id";
    public static final String USERDATA = "userdata";
    public static final String DESTINATION = "destination";
    public static final String ERROR = "error";
    public static final String STATUS = "status";
    public static final String OK = "OK";
    public static final String KO = "KO";
    public static final String CALLBACK_DATE = "callback_date";
    public static final String CALLBACK_TIME = "callback_time";
    public static final String HOUR = "hour";
    public static final String MINUTE = "minute";
    public static final String ZONE_EU = "Europe/Paris";
    public static final String RESULT = "result";

    public static final String PROXY = "proxy";
    public static final String HOST = "host";
    public static final String PORT = "port";
    public static final String KIAMO = "kiamo";
    public static final String SERVER = "server";
    public static final String KEY = "key";

    // fr key data
    public static final String PRENOM = "prenom";
    public static final String PRENOM_ELEVE = "prenom_eleve";
    public static final String NOM_ELEVE = "nom_eleve";
    public static final String NOM = "nom";
    public static final String ETABLISSEMENT = "etablissement";
    public static final String CLASSE = "classe";
    public static final String MATIERE_AIDE = "matiere_aide";
    public static final String MATIERE = "matiere";
    public static final String INFORMATIONS_COMPLEMENTAIRES = "informations_complementaires";
}
