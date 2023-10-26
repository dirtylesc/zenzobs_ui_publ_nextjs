import { 
  NextIntlClientProvider 
}                     from "next-intl";

import reqMessages    from "@/utils/i18n";
import paths          from "@/constants/paths";
import DefaultLayout  from "@/layouts/DefaultLayout";

type Props    = {
    children: React.ReactNode;
    params: {locale: string};
  };

async function AutUserLayout({children, params : { locale }}: Props) {
  let messages = await reqMessages(`${locale}/${paths.AUT_USER}`);
  
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <DefaultLayout>
        {children}
      </DefaultLayout>
    </NextIntlClientProvider>
  )
}

export default AutUserLayout;