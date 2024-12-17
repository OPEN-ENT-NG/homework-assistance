import { ConfigPayload } from "./types";
import { emptySplitApi } from "../emptySplitApi.service";

export const configApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfig: builder.query<ConfigPayload, void>({
      query: () => "config",
      providesTags: ["Config"],
    }),
    updateConfig: builder.mutation<ConfigPayload, ConfigPayload>({
      query: (
        config: ConfigPayload & { toJson: () => Record<string, any> },
      ) => ({
        url: "config",
        method: "PUT",
        body: config,
      }),
      invalidatesTags: ["Config"],
    }),
  }),
});

export const { useGetConfigQuery, useUpdateConfigMutation } = configApi;
