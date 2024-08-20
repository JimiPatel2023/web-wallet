"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { generate_mnemonic_phrase, get_wallets_from_mnemonic } from "@/utils/utils";
import RevealMnemonic from "@/components/RevealMnemonic";
import { Button } from "@/components/ui/button";
import { Clipboard, Plus, GitHub } from "react-feather";
import { Wallet } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import WalletInfoCard from "@/components/WalletInfoCard";

const Wallets = () => {
	const router = useRouter();
	const [mnemonic, setMnemonic] = useState<string | null>(null);
	const [number_of_wallets, set_number_of_wallets] = useState<number>(0)
	const [wallets, setWallets] = useState<{ public_key:string, private_key:string }[] | null>([]);
	const { toast } = useToast();

	useEffect(() => {
		const mnemonic1 = localStorage.getItem("mnemonic");
		console.log(mnemonic);
		if (!mnemonic1) {
			const mnemonic2 = generate_mnemonic_phrase();
			localStorage.setItem("mnemonic", generate_mnemonic_phrase());
			setMnemonic(mnemonic2);
		} else {
			setMnemonic(mnemonic1)
		}
		const number_of_wallets = localStorage.getItem("number_of_wallets");
		if(number_of_wallets === null) {
			localStorage.setItem("number_of_wallets", "0");
		} else {
			set_number_of_wallets(+number_of_wallets)
		}
	}, [router, mnemonic]);

	useEffect(() => {
		if(mnemonic) {
			const wallets = get_wallets_from_mnemonic(mnemonic, number_of_wallets);
			setWallets(wallets);
		}
	}, [number_of_wallets, mnemonic])

	const handleCopy = (mnemonic: string) => {
		navigator.clipboard.writeText(mnemonic);
		toast({
			title: "Mnemonic copied to clipboard!",
		});
	};

	const onCreateWallet = () => {
		set_number_of_wallets(val => val + 1);
		localStorage.setItem("number_of_wallets", `${number_of_wallets+1}`);
		toast({
			title: "New Wallet created!",
		});
	};

	const updateMnemonic = () => {
		const new_phrase = generate_mnemonic_phrase();
		localStorage.setItem("mnemonic", new_phrase);
		localStorage.setItem("number_of_wallets", "0");
		setMnemonic(new_phrase);
		setWallets([]);
		set_number_of_wallets(0)	
		toast({
			title: "New Mnemonic created!",
		});
	}

	return (
		<>
			{mnemonic && (
				<>
					<div className="mx-auto p-6 bg-white">
						<h1 className="text-3xl font-semibold mb-6 text-gray-900">Your Mnemonic Phrase</h1>
						<RevealMnemonic mnemonic={mnemonic} />
						<div className="flex gap-4 mt-2">
							<Button
								onClick={(e) => {
									handleCopy(mnemonic);
								}}
								className="flex-1 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg py-2">
								<Clipboard size={20} className="mr-2" />
								Copy Phrase
							</Button>
							<Button
								onClick={(e) => {
									onCreateWallet();
								}}
								className="flex-1 bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg py-2">
								<Wallet size={20} className="mr-2" />
								Create Wallet
							</Button>
						</div>
						<div className="flex gap-2 mt-2 flex-wrap">
						<Button
								onClick={(e) => {
									updateMnemonic();
								}}
								className="flex-1 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg py-2">
								<Plus size={20} className="mr-2" />
								Create New mnemonic
						</Button>
						<div className="flex gap-2 w-full">
							<a href="https://github.com/JimiPatel2023/web-wallet" target="_blank" className="w-full">
							<Button
								className="flex-1 bg-black text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black rounded-lg py-2 w-full">
								<GitHub size={20} className="mr-2" />
								GitHub Code
						</Button>
							</a>
							<a href="https://github.com/JimiPatel2023" target="_blank" className="w-full">
							<Button
								className="flex-1 bg-black text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black rounded-lg py-2 w-full">
								<GitHub size={20} className="mr-2" />
								Profile
						</Button>
							</a>
						</div>
						</div>
						{
							wallets && wallets.length > 0 && (
								wallets.map((val, index) => {
									return (
										<div key={val.public_key} className="my-4">
											<WalletInfoCard publicKey={val.public_key} privateKey={val.private_key} walletName={`Wallet ${index + 1}`} />
										</div>
									)
								})
							)
						}
					</div>
				</>
			)}
		</>
	);
};

export default Wallets;
