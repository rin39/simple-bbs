import Head from "next/head";

interface AppHeadProps {
  title: string;
}

export default function AppHead({ title }: AppHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
