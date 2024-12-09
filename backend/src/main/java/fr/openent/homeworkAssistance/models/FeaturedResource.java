package fr.openent.homeworkAssistance.models;

import static fr.openent.homeworkAssistance.core.constants.Field.*;
import io.vertx.core.json.JsonObject;

public class FeaturedResource {
    private String idRessource;
    private String nomRessource;
    private String urlVignette;
    private String urlAccesRessource;
    private String description;

    public FeaturedResource(JsonObject featuredResource) {
        setIdRessource(featuredResource.getString(ID_RESSOURCE));
        this.nomRessource = featuredResource.getString(NOM_RESSOURCE);
        this.urlVignette = featuredResource.getString(URL_VIGNETTE);
        this.urlAccesRessource = featuredResource.getString(URL_ACCES_RESSOURCE);
        this.description = featuredResource.getString(DESCRIPTION);
    }

    // Getters and Setters
    public String getIdRessource() {
        return idRessource;
    }

    public FeaturedResource setIdRessource(String idRessource) {
        this.idRessource = idRessource;
        return this;
    }

    public String getNomRessource() {
        return nomRessource;
    }

    public FeaturedResource setNomRessource(String nomRessource) {
        this.nomRessource = nomRessource;
        return this;
    }

    public String getUrlVignette() {
        return urlVignette;
    }

    public FeaturedResource setUrlVignette(String urlVignette) {
        this.urlVignette = urlVignette;
        return this;
    }

    public String getUrlAccesRessource() {
        return urlAccesRessource;
    }

    public FeaturedResource setUrlAccesRessource(String urlAccesRessource) {
        this.urlAccesRessource = urlAccesRessource;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public FeaturedResource setDescription(String description) {
        this.description = description;
        return this;
    }


}
