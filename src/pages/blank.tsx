// next
import Head from 'next/head';
// @mui
import { Container, Typography } from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard';
import { useSettingsContext } from 'src/components/settings';
// layouts
// components

// ----------------------------------------------------------------------

BlankPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
export default function BlankPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Blank Page | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h6"> Blank </Typography>
      </Container>
    </>
  );
}
