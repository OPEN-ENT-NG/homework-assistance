import { CallbackPayload } from "./types";
import { emptySplitApi } from "../emptySplitApi.service";

export const callbackApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<Record<string, number>, void>({
      query: () => "services/all",
    }),
    createCallback: builder.mutation<void, CallbackPayload>({
      query: (callback) => ({
        url: `services/${callback.userdata.service}/callback`,
        method: "POST",
        body: callback,
      }),
    }),
  }),
});

export const { useGetServicesQuery, useCreateCallbackMutation } = callbackApi;
