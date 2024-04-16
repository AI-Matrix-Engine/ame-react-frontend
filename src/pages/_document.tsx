import type { DocumentContext, DocumentInitialProps } from "next/document";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* meta tags for SEO */}
          <meta httpEquiv="Cache-control" content="max-age=3153600" />
          <meta name="title" content="Weather Dashboard" />
          <meta
            name="description"
            content="Aimatrix-frontend using Next.js and Tailwind CSS"
            key="desc"
          />
          <meta name="keywords" content="weather" />
          <meta property="og:url" content="" />
          <meta property="og:type" content="weather dashboard" />
          <meta property="og:site_name" content="Weather Dashboard" />

          <link rel="publisher" href="" />
          <meta name="robots" content="index,follow" />
          <meta name="GOOGLEBOT" content="index,follow" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
          <title>AIDRM</title>
          {/* icon */}
          <link rel="icon" href="/favicon.png" type="image/png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
