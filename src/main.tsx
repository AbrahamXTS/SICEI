import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { theme } from "./configurations";
import { ProtectRoute } from "./components";
import { DashboardLayout } from "./layouts";
import { HomePage } from "./pages/dashboard";
import { LandingPage } from "./pages/landing-page";

import "dayjs/locale/es-mx";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "mantine-react-table/styles.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      authorizationParams={{
        redirect_uri: `${import.meta.env.VITE_APPLICATION_HOST}/dashboard`,
      }}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
    >
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="dashboard" element={<ProtectRoute />}>
                  <Route element={<DashboardLayout />}>
                    <Route index element={<HomePage />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
            <Notifications position="bottom-right" />
          </QueryClientProvider>
        </ModalsProvider>
      </MantineProvider>
    </Auth0Provider>
  </StrictMode>
);
