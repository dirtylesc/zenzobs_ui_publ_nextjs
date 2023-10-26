import { notFound } from "next/navigation";

async function reqMessages(path: string) {
  let messages = {};
  const locale = path.substring(0, 2);
  try {
    messages = {
      cms: (await import(`@/messages/${locale}/cms.json`)).default,
      grp: (await import(`@/messages/${path}/index.json`)).default,
    }
  } catch (error) {
    notFound();
  }

  return messages;
}

export default reqMessages;
