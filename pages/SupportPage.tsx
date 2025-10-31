import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const SupportPage: React.FC = () => {
    const [donationType, setDonationType] = useState<'lightning' | 'onchain'>('lightning');

    const onChainAddress = 'bc1q8u0t2fwxl3ml3amz5urce9rnmkfpfgg4tatjw3';
    const lightningInvoice = 'lnbc1p5sxqnspp5q7es4c4d9ajrxy5qsqnhczke90fk2lfq5zqh0jnn2mlvga9tc22qdp82pshjgr5dusyymrfde4jq4mpd3kx2apq24ek2uscqzpuxqr8pqsp55fxa93y0lqch3q9jyfgkvra6qvh98m65qh50kvm05s6x0x5sk7aq9qxpqysgqrqkdpg3knm2d7x9hg9fhenf8528jyp597jxgnqx5307wyvkujpgq5464pprwgsp9rdhnjm34mpklxt74669u97lrepvdf0k60c4mjgqp3jd8ch';

    const onChainQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=bitcoin:${onChainAddress}`;
    const lightningQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=lightning:${lightningInvoice}`;

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        alert(`${type} copied to clipboard!`);
    };

  return (
    <div className="bg-light-grey py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-poppins text-4xl font-bold text-deep-navy">Support Our Mission</h1>
          <p className="mt-4 text-lg text-gray-600">
            Your contribution helps us make Bitcoin education accessible to every student in Africa. Fuel the next wave of decentralized innovation.
          </p>
        </div>

        <div className="mt-12 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl text-center">
            <h2 className="font-poppins text-2xl font-bold text-bitcoin-orange mb-4">Donate with Bitcoin</h2>
            <p className="mb-6">Choose your preferred donation method below. Lightning is fast and low-cost!</p>
            
            {/* Tabs */}
            <div className="flex justify-center border-b-2 mb-8">
              <button
                onClick={() => setDonationType('lightning')}
                className={`px-6 py-3 font-poppins font-bold text-lg transition-colors ${donationType === 'lightning' ? 'border-b-4 border-bitcoin-orange text-bitcoin-orange' : 'text-gray-500'}`}
              >
                Lightning
              </button>
              <button
                onClick={() => setDonationType('onchain')}
                className={`px-6 py-3 font-poppins font-bold text-lg transition-colors ${donationType === 'onchain' ? 'border-b-4 border-bitcoin-orange text-bitcoin-orange' : 'text-gray-500'}`}
              >
                On-Chain
              </button>
            </div>

            {/* Conditional Content */}
            {donationType === 'lightning' && (
                <div>
                    <p className="mb-4 text-gray-600">Scan the QR code with a Lightning-enabled wallet.</p>
                    <div className="flex justify-center mb-6">
                        <img src={lightningQRUrl} alt="Lightning QR Code" className="w-64 h-64 rounded-lg shadow-md" />
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Or copy the invoice</p>
                    <div className="relative bg-gray-100 p-4 rounded-lg">
                        <p className="font-mono text-sm md:text-base break-all text-deep-navy">{lightningInvoice}</p>
                        <button onClick={() => copyToClipboard(lightningInvoice, 'Lightning Invoice')} className="absolute top-2 right-2 p-2 text-gray-500 hover:text-bitcoin-orange transition-colors" aria-label="Copy invoice">
                            <FaCopy size={20}/>
                        </button>
                    </div>
                </div>
            )}

            {donationType === 'onchain' && (
                <div>
                    <p className="mb-4 text-gray-600">Send BTC to the address below. Please note on-chain fees may be higher.</p>
                     <div className="flex justify-center mb-6">
                        <img src={onChainQRUrl} alt="On-Chain Bitcoin QR Code" className="w-64 h-64 rounded-lg shadow-md" />
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Or copy the address</p>
                     <div className="relative bg-gray-100 p-4 rounded-lg">
                        <p className="font-mono text-sm md:text-base break-all text-deep-navy">{onChainAddress}</p>
                        <button onClick={() => copyToClipboard(onChainAddress, 'Bitcoin address')} className="absolute top-2 right-2 p-2 text-gray-500 hover:text-bitcoin-orange transition-colors" aria-label="Copy address">
                            <FaCopy size={20}/>
                        </button>
                    </div>
                </div>
            )}
        </div>

        <div className="mt-16">
            <h2 className="text-center font-poppins text-3xl font-bold text-deep-navy mb-8">Where Your Support Goes</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-poppins text-xl font-bold text-deep-navy mb-2">General Support</h3>
                    <p className="text-gray-600">Funds our daily operations, web hosting, and community outreach.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-poppins text-xl font-bold text-deep-navy mb-2">Research Fund</h3>
                    <p className="text-gray-600">Provides grants and resources for student-led Bitcoin research.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-poppins text-xl font-bold text-deep-navy mb-2">Mining Project</h3>
                    <p className="text-gray-600">Helps us acquire and maintain hardware for our hands-on mining initiative.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-poppins text-xl font-bold text-deep-navy mb-2">Event Sponsorship</h3>
                    <p className="text-gray-600">Allows us to host larger bootcamps, workshops, and invite guest speakers.</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default SupportPage;