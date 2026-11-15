import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";

import {
  Meta,
} from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers } from "@/components";
import { baseURL, fonts, style, dataStyle, home, person } from "@/resources";
import { PortfolioEnvProvider } from "@/context/PortfolioEnvContext";
import { AsciiBackground } from "@/components/ascii/AsciiBackground";
import { AnimalSelector } from "@/components/ascii/AnimalSelector";

export async function generateMetadata() {
  const meta = await Meta.generate({
    title: `${person.name} — Software Engineer`,
    description: `Portfolio website of Bramha Bajannavar, CSE Undergrad & Software Engineer specializing in Mobile, Backend & AI Systems.`,
    baseURL: baseURL,
    path: home.path,
    image: "/images/og.png",
  });

  const ogUrl = `${baseURL}/images/og.png`;

  return {
    ...meta,
    metadataBase: new URL(baseURL),
    openGraph: {
      title: `${person.name} — Software Engineer Portfolio`,
      description: `Bramha Bajannavar's engineering portfolio. Mobile apps, scalable backends, and local-first AI systems.`,
      url: baseURL,
      siteName: `${person.name} Portfolio`,
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: `${person.name} — Software Engineer Portfolio`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${person.name} — Software Engineer Portfolio`,
      description: `Bramha Bajannavar's engineering portfolio. Mobile apps, scalable backends, and local-first AI systems.`,
      images: [ogUrl],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `if (/Chrome\\//.test(navigator.userAgent)) document.documentElement.classList.add("liquid");`,
          }}
        />
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const defaultTheme = '${style.theme}';
                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    "solid-style": style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    "viz-style": dataStyle.variant,
                  })};
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  document.documentElement.setAttribute('data-theme', 'dark');
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        {/* Liquid-glass displacement map filter for Chromium */}
        <svg
          width="0"
          height="0"
          style={{ position: "absolute", pointerEvents: "none" }}
          aria-hidden="true"
        >
          <filter
            id="liquid-glass"
            x="0"
            y="0"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.007 0.011"
              numOctaves={2}
              seed={11}
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation={2} result="map" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale={12}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>

        <Providers>
          <PortfolioEnvProvider>
            {/* Fixed full-screen ASCII animals canvas */}
            <AsciiBackground />

            {/* Bottom-right Animal Selector */}
            <AnimalSelector />

            <div
              style={{
                minHeight: "100vh",
                position: "relative",
                zIndex: 1,
                background: "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Header />
              <main
                style={{
                  width: "100%",
                  maxWidth: "1120px",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  padding: "0 16px",
                  boxSizing: "border-box",
                }}
              >
                <RouteGuard>{children}</RouteGuard>
              </main>
              <Footer />
            </div>
          </PortfolioEnvProvider>
        </Providers>
      </body>
    </html>
  );
}
