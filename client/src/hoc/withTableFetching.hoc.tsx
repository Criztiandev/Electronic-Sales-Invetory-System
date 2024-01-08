/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { setTableData } from "@/service/store/slice/table.slice";
import LoadingScreen from "@/views/utils/LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ComponentType, useEffect } from "react";
import { AxiosError } from "axios";
import { clearCredentials } from "@/service/store/slice/auth.slice";
import { toast } from "react-toastify";
import { ServerErrorResponse } from "@/interface/server";

interface ConfigProps {
  base: string;
  name: string;
}

interface WrappedComponentProp {
  base: string;
  name: string;
}

interface Props {
  fetchFn?: any;
}

const withTableFetching = (
  Component: ComponentType<WrappedComponentProp>,
  config: ConfigProps
) => {
  return (props: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const query = useQuery({
      queryFn: async () => await props.fetchFn(),
      queryKey: [`${config?.base}`],
    });

    const handleError = (error: AxiosError) => {
      const { response } = error;

      if (response) {
        const { data } = response;
        const errorMessage =
          (data as { message: string })?.message || "Something went wrong";
        const errorToastContent: string = `Error: ${errorMessage}`;
        toast.error(errorToastContent);

        if (response.status === 401) {
          navigate("/");
          dispatch(clearCredentials());
        }
      }
    };

    useEffect(() => {
      if (query.isError) {
        handleError(query.error as AxiosError<ServerErrorResponse>);
      }
    }, [query.isError]);

    if (query.isLoading) {
      return <LoadingScreen />;
    }

    if (query.isSuccess) {
      const { data: res } = query.data;
      dispatch(setTableData({ id: config.name, data: res }));
    }

    return <Component {...props} {...config} />;
  };
};

export default withTableFetching;
