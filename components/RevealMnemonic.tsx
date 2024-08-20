// components/RevealMnemonic.tsx
import { useState } from 'react';
import { Eye, EyeOff } from 'react-feather'; // Or use any other icon library you prefer
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface RevealMnemonicProps {
    mnemonic: string;
  }
  
  const RevealMnemonic: React.FC<RevealMnemonicProps> = ({ mnemonic }) => {
    const [isRevealed, setIsRevealed] = useState(true);
  
    return (
      <div className="relative flex items-center">
        <Input
          type={isRevealed ? 'text' : 'password'}
          value={mnemonic}
          readOnly
          className={`w-full p-3 text-lg font-mono border rounded-lg shadow-sm transition-all duration-300 ${
            isRevealed ? 'bg-white text-gray-900 border-gray-300' : 'bg-gray-200 text-gray-600 border-gray-400'
          }`}
          style={{
            textShadow: isRevealed ? 'none' : '0 0 10px rgba(0, 0, 0, 0.3)',
          }}
        />
        <Button
          onClick={() => setIsRevealed(!isRevealed)}
          className="absolute inset-y-0 right-0 px-4 flex items-center bg-gray-100 border-l border-gray-300 rounded-r-lg hover:bg-gray-200 focus:outline-none"
          aria-label={isRevealed ? 'Hide mnemonic' : 'Show mnemonic'}
          variant="ghost" // Use a ghost variant for a minimal look
        >
          {isRevealed ? <EyeOff size={24} className="text-gray-600" /> : <Eye size={24} className="text-gray-600" />}
        </Button>
      </div>
    );
  };
  
  export default RevealMnemonic;
  
  