import Document, { Head, Html, Main, NextScript } from 'next/document'

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
          <link rel="icon" type="image/png" href="/favicon/favicon.png" />

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
            content="Mormedi | Making tomorrow tangible"
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
            content="Mormedi | Making tomorrow tangible"
          />
          <meta name="twitter:image:alt" content="Mormedi" />

          {/* Meta robots */}
          <meta name="robots" content={process.env.NEXT_ROBOOT_IDEX} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
