'use client'

import classNames from "classnames";

import styles 		from "./LangMenu.module.scss";
import { 
	FRFlag, 
	USFlag, 
	VNFlag 
} 								from "@/components/Icon/Icons";
import { useState } from "react";
import Button from "@/components/Button";

const cx 				= classNames.bind(styles);
const styleObj 	= {
	wrapper				: [
		styles.wrapper
	],
	list					: {
		wrapper: [
			"absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
		],
		content: [
			"py-1"
		]
	}
}
const langs 		= [
  {
    key: "vi",
    icon: <VNFlag width={25} height={25} />,
    title: "cms.Lang.vietnamese",
    type: "row",
    style: {
      title: "ms-2 mb-0.5",
    },
  },
  {
    key: "en",
    icon: <USFlag width={25} height={25} />,
    title: "cms.Lang.english",
    type: "row",
    style: {
      title: "ms-2 mb-0.5",
    },
  },
  {
    key: "fr",
    icon: <FRFlag width={25} height={25} />,
    title: "cms.Lang.french",
    type: "row",
    style: {
      title: "ms-2 mb-0.5",
    },
  },
]

function LangMenu() {
	const [keyChecked	, setKeyChecked] 	= useState('vi')
	const [isOpen			, setIsOpen] 			= useState(false)
	let 	checkedItem 		= langs.find(item => item.key == keyChecked);
	const unCheckedItems 	= langs.filter(item => item.key != keyChecked);

	const handleChangeLanguage = (key: string) => {
		setKeyChecked(key)
	}

	const handleOpen = () => {
		if(isOpen) {
			setIsOpen(false)
			return;
		}
		setIsOpen(true)
	}

  return (
		<div className={cx(...styleObj.wrapper)}>
			<div>
				<Button 
					IconComp={checkedItem?.icon}
					title		={checkedItem?.title}
					style		={checkedItem?.style}
					type		={checkedItem?.type}
					onClick={() => handleOpen()}
				/>
			</div>
			<div className={cx(...styleObj.list.wrapper)}>
  	  	<div className={cx(...styleObj.list.content)}>
					{unCheckedItems.map(item => 
						<div 
							key				={item.key} 
							className	="px-2 py-2">
							<Button 
								IconComp={item.icon}
								title		={item.title}
								style		={item.style}
								type		={item.type}
								onClick	={() => handleChangeLanguage(item.key)}
							/>
						</div>
					)}
  	  	</div>
  		</div>
		</div>
	);
}

export default LangMenu;
