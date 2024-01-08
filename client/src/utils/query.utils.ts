/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { ServerErrorResponse } from "@/interface/server";
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
  QueryKey,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast, ToastContent } from "react-toastify";
import apiUtils from "./api.utils";
import { useNavigate } from "react-router-dom";

interface MutationConfig<T> {
  toast?: string;
  invalidateKey: QueryKey;
  mutationFn: (variables: T) => Promise<AxiosResponse<any, any>>;
  onSuccess?: (payload: any) => void;
  goto?: string;
}

interface QueryConfig<T> {
  queryFn: (context: QueryFunctionContext) => Promise<T>;
  key: QueryKey;
}

export default {
  mutation: <T>(config: MutationConfig<T>) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: config.mutationFn,

      onSuccess: (data: AxiosResponse<T>) => {
        if (config.toast) {
          const message: ToastContent<string> = config.toast;
          toast.success(message);
        }
        if (config.onSuccess) {
          config.onSuccess(data);
        }

        queryClient.invalidateQueries({
          queryKey: config.invalidateKey,
        });

        if (config?.goto) {
          navigate(`${config.goto}`);
        }
      },

      onError: (e: AxiosError<ServerErrorResponse>) => {
        const response = apiUtils.errorHandler(e);

        if (typeof response === "string") {
          toast.error(response);
          return;
        }

        const { message } = response;
        toast.error(message);
      },
    });
  },

  query: <T>(config: QueryConfig<T>) => {
    return useQuery({
      queryFn: config.queryFn,
      queryKey: config.key,
    });
  },
};
