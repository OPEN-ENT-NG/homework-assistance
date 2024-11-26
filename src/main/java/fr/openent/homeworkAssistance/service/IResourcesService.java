package fr.openent.homeworkAssistance.service;

import fr.openent.homeworkAssistance.models.FeaturedResource;
import io.vertx.core.Future;
import org.entcore.common.user.UserInfos;

import java.util.List;

public interface IResourcesService {

    /**
     * Get resources from Mediacentre to display
     * @param user The {@link UserInfos} of the connected user
     * @return A {@link Future} containing {@link List<FeaturedResource>} with the ressources to display to the connected user
     */
    Future<List<FeaturedResource>> getResources(UserInfos user);
}
