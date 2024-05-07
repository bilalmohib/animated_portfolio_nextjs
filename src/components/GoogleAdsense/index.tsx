import Script from "next/script";

type GoogleAdsenseProps = {
    pId: string;
};

const GoogleAdsense = ({ pId }: GoogleAdsenseProps) => {
    if (process.env.NODE_ENV !== "production") {
        return null;
    }
    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
};

export default GoogleAdsense;