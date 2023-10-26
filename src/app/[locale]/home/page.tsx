import { 
    Metadata 
  }                   from "next";
  import classNames   from 'classnames';
  
  import styles       from '@/app/content.module.scss'
  
  const cx        = classNames.bind(styles);
  
  type Props = {
    params: {locale: string};
  };
  
  const metadata: Metadata = {
    title: "ZenZobs.com - Job everywhere - Trang tìm việc dành cho giới trẻ",
  };
  
  function AutUserPage({params: {locale}}: Props) {
    return (
      <div className="flex">
      </div>
    );
  }
  
  export default AutUserPage;
  export { metadata };
  