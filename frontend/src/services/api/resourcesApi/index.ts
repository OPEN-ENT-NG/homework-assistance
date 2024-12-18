import { FeaturedResource } from "./types";
import { emptySplitApi } from "../emptySplitApi.service";

export const resourcesApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getResources: builder.query<FeaturedResource[], void>({
      query: () => ({
        url: "resources",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetResourcesQuery } = resourcesApi;
