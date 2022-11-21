import { CssBaseline, ThemeProvider } from "@mui/material";
import { type AppType } from "next/app";
import Head from "next/head";
import { SnackbarProvider } from 'notistack';
import { theme } from "../utils/theme";

import { trpc } from "../utils/trpc";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
