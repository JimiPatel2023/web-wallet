import { useState } from 'react';
import { Eye, EyeOff, Copy } from 'react-feather';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";


interface WalletInfoCardProps {
    walletName: string;
    publicKey: string;
    privateKey: string;
  }
  
  const WalletInfoCard: React.FC<WalletInfoCardProps> = ({ walletName, publicKey, privateKey }) => {
    const [isPrivateKeyRevealed, setIsPrivateKeyRevealed] = useState(false);
    const { toast } = useToast();
  
    const handleCopy = (text: string, label: string) => {
      navigator.clipboard.writeText(text);
      toast({
        title: `${label} copied to clipboard!`,
    });
    };
  
    return (
      <Card className="bg-white shadow-lg rounded-lg ">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-900">{walletName}</h2>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Public Key</label>
            <div className="flex items-center bg-gray-100 py-1 px-3 rounded-lg border border-gray-200">
              <span className="font-mono text-sm text-gray-900 truncate">{publicKey}</span>
              <Button
                onClick={() => handleCopy(publicKey, 'Public key')}
                className="ml-auto bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded-lg"
                variant="ghost"
              >
                <Copy size={16} />
              </Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Private Key</label>
            <div className="flex items-center justify-between bg-gray-100 py-1 px-3 rounded-lg border border-gray-200 gap-1">
              <span
                className={`font-mono text-sm text-gray-900 ${
                  isPrivateKeyRevealed ? 'truncate' : 'truncate'
                } overflow-hidden`}
              >
                {isPrivateKeyRevealed ? privateKey : '*********************************************'}
              </span>
              <div className="flex justify-center items-center gap-1">
              <Button
                onClick={() => setIsPrivateKeyRevealed(!isPrivateKeyRevealed)}
                className="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded-lg"
                variant="ghost"
                aria-label={isPrivateKeyRevealed ? 'Hide private key' : 'Show private key'}
              >
                {isPrivateKeyRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
              <Button
                onClick={() => handleCopy(privateKey, 'Private key')}
                className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded-lg"
                variant="ghost"
              >
                <Copy size={16} />
              </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  export default WalletInfoCard;
  