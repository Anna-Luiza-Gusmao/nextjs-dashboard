import { GlobeAltIcon } from "@heroicons/react/24/outline"
import { inter } from "./fonts"

export default function AcmeLogo() {
	return (
		<div className={`${inter.className} flex flex-row items-center leading-none text-white`}>
			<GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
			<p className="text-[38px] md:text-[44px] font-medium">Acme</p>
		</div>
	)
}
