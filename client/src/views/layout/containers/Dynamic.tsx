/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseProps } from "@/interface/component";
import Layout from "..";
import LoadingScreen from "@/views/public/auth/LoginScreen";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { toast, ToastContent } from "react-toastify";
import { useDispatch } from "react-redux";
import { setPagination, setTableData } from "@/service/store/slice/table.slice";
import { AxiosError, AxiosResponse } from "axios";
import { clearCredentials } from "@/service/store/slice/auth.slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Props extends BaseProps {
  name?: string;
  fetchFn?: () => Promise<AxiosResponse<any, any>>; // Ensure fetchFn returns a Promise<void>
  queryKey?: QueryKey;
}

const Dynamic = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = useQuery<AxiosResponse<void, any>, Error>({
    queryFn: props?.fetchFn,
    queryKey: [`${props.queryKey}`],
  });

  const handleSuccess = (res: AxiosResponse<any, any>) => {
    const {
      data: { payload, currentPage, pageCount },
    } = res || {};

    if (payload && props.name) {
      dispatch(setTableData({ id: props.name, data: payload }));
      dispatch(
        setPagination({
          id: props.name,
          data: { size: pageCount, index: currentPage },
        })
      );
    }
  };

  const handleError = (error: AxiosError) => {
    const { response } = error;

    if (response) {
      const { data } = response;
      const errorMessage =
        (data as { message: string })?.message || "Something went wrong";
      const errorToastContent: ToastContent<AxiosError> = `Error: ${errorMessage}`;
      toast.error(errorToastContent);

      if (response.status === 401) {
        dispatch(clearCredentials());
        navigate("/login");
      }
    }
  };

  if (query.isSuccess) {
    handleSuccess(query.data as AxiosResponse<any, any>);
  }

  useEffect(() => {
    if (query.isError) {
      // handle error asynchronously after the rendering phase
      setTimeout(() => {
        handleError(query.error as AxiosError);
      });
    }
  }, [query.isError]);

  if (query.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-screen flex overflow-y-auto">
      <Layout.Sidebar />
      <main className="flex flex-col w-screen overflow-hidden">
        {props.children}
      </main>
    </div>
  );
};

export default Dynamic;
