import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-17433216-1"
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-17433216-1');`,
            }}
          />

          {/* <!-- Metricool Analytics --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"dc70ca9b50723c5729577554bbfdfd3e"})});`,
            }}
          />

          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          {/* Favicons */}
          <meta
            name="viewport” content="
            width="device-width"
            initial-scale="1.0"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="https://mormedi.com/favicon/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="https://mormedi.com/favicon/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="https://mormedi.com/favicon/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="https://mormedi.com/favicon/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="https://mormedi.com/favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="https://mormedi.com/favicon/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="https://mormedi.com/favicon/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="https://mormedi.com/favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://mormedi.com/favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="https://mormedi.com/favicon/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://mormedi.com/favicon/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="https://mormedi.com/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="https://mormedi.com/favicon/favicon-96x96.png"
          />

          {/* Theme color */}
          <meta name="msapplication-TileColor" content="#ffffff" />

          <meta
            name="msapplication-TileImage"
            content="favicon/apple-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" />

          <meta name="url" content="https://mormedi.com" />

          {/* Og data */}
          <meta property="og:locale" content="en_EN" />
          <meta property="og:locale:alternate" content="es_ES" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Mormedi" />
          <meta
            property="og:description"
            content="Mormedi | The foresight and creation company"
          />
          <meta property="og:url" content="https://mormedi.com" />
          <meta property="og:site_name" content="Mormedi" />
          <meta
            property="og:image"
            itemProp="image"
            content="https://mormedi.com/og/921x518.png"
          />
          <meta
            property="og:image"
            itemProp="image"
            content="https://mormedi.com/og/1200x1200.png"
          />
          <meta
            property="og:image"
            itemProp="image"
            content="https://mormedi.com/og/400x400.png"
          />
          <meta
            property="og:image"
            itemProp="image"
            content="https://mormedi.com/og/256x256.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Mormedi" />
          <meta name="twitter:site" content="@mormedi" />
          <meta
            name="twitter:description"
            content="Mormedi | The foresight and creation company"
          />
          <meta name="twitter:image:alt" content="Mormedi" />

          {/* Meta robots */}
          <meta name="robots" content="index,follow" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
