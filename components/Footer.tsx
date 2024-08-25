import { DiscordIcon, TwitterIcon } from "./Icons";

type Props = {
    className?: string;
};

const navigation = [
    {
        name: "Twitter Icon",
        href: "https://portal.dymension.xyz/ibc",
        icon: TwitterIcon,
    },
    {
        name: "Discord Icon",
        href: "https://portal.dymension.xyz/ibc",
        icon: DiscordIcon,
    }
];

export default function Footer() {
    return (
        <footer className=" text-[#ffffff] font-qwitcher">
            <div className="mx-auto max-w-7xl py-6 px-5 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center space-x-6 md:order-2">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className=" hover:text-forest mt-5"
                            target="_blank"
                            rel="noopener noreferrer"

                        >
                            {item.icon()}
                        </a>

                    ))}


                </div>
                <p className="text-center mt-4 tracking-widest">Powered by <span className="underline"><a href="/">Zircuit</a></span></p>
            </div>
        </footer>
    );
}
