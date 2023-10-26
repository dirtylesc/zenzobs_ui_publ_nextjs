import { getRequestConfig } from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => ({
  messages: {
    cms: (await import(`./src/messages/${locale.substring(0, 2)}/cms.json`)).default,
    grp: (await import(`./src/messages/${locale}/index.json`)).default
  },
}));