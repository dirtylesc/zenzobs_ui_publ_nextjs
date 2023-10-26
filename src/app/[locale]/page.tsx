import { Metadata } from "next";

type Props = {
  params: {locale: string};
};

const metadata: Metadata = {
  title: "ZenZobs Manager",
};

function Dashboard({params: {locale}}: Props) {
  return (
    <main className=""></main>
  );
}

export default Dashboard;
export { metadata };
