import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Sudarshan Notes",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "notes.sudarshandhakal.com.np",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
   theme: {
  fontOrigin: "googleFonts",
  cdnCaching: true,
 typography: {
  header: "Playfair Display",   // headings
  body: "Inter",                // body text
  code: "JetBrains Mono",       // code blocks
},
      colors: {
    lightMode: {
      light: "#f9f7f3",        // warm white background
      lightgray: "#e8e4dc",    // soft borders
      gray: "#a8a09a",         // muted elements
      darkgray: "#3d3530",     // body text (warm dark)
      dark: "#1e1a17",         // headings
      secondary: "#5c7a6e",    // links — muted teal/green
      tertiary: "#c97b4b",     // hover — warm amber
      highlight: "rgba(92, 122, 110, 0.1)",
      textHighlight: "#f5d76e88",
    },
         darkMode: {
      light: "#13111a",        // deep purple-black bg
      lightgray: "#2a2535",    // borders
      gray: "#605c6e",         // muted elements
      darkgray: "#ccc8d8",     // body text
      dark: "#edeaf5",         // headings
      secondary: "#a78bfa",    // links — soft violet
      tertiary: "#f472b6",     // hover — pink accent
      highlight: "rgba(167, 139, 250, 0.1)",
      textHighlight: "#7c3aed44",
    },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
