/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingScreen from "@/views/utils/LoadingScreen";
import { lazy, Suspense, ComponentType } from "react";

// Define a type for the component that will be dynamically loaded
type LazyComponentType = ComponentType<any>;

const withLazyLoading = (
  importComponent: () => Promise<{ default: LazyComponentType }>
) => {
  const LazyComponent = lazy(importComponent);

  return (props: any) => (
    <Suspense fallback={<LoadingScreen />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default withLazyLoading;
