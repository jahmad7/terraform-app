import { join } from 'path';
import { getServerSideSitemap } from 'next-sitemap';
import { allPosts, allDocumentationPages } from 'contentlayer/generated';
import configuration from '~/configuration';

const siteUrl = configuration.site.siteUrl as string;

if (!siteUrl) {
  throw new Error(`Invalid "siteUrl", please fix in configuration.ts`);
}

export async function GET() {
  const urls = getSiteUrls();
  const posts = getPostsSitemap();
  const docs = getDocsSitemap();

  return getServerSideSitemap([...urls, ...posts, ...docs]);
}

function getSiteUrls() {
  const urls = ['', 'faq', 'pricing'];

  return urls.map((url) => {
    return {
      loc: join(siteUrl, url),
      lastmod: new Date().toISOString(),
    };
  });
}

function getPostsSitemap() {
  return allPosts.map((post) => {
    return {
      loc: join(siteUrl, post.url),
      lastmod: new Date().toISOString(),
    };
  });
}

function getDocsSitemap() {
  return allDocumentationPages.map((page) => {
    return {
      loc: join(siteUrl, page.url),
      lastmod: new Date().toISOString(),
    };
  });
}
