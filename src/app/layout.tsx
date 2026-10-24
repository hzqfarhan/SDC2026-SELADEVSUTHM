import type { Metadata } from 'next';
import './globals.css';
import './refinement.css';
import './palette.css';
import './motion.css';
import './artwork.css';
import './experience.css';
import './studio.css';
import './quest-promo.css';
import './quest.css';
export const metadata: Metadata = { icons:{icon:'/brand/shiftatlas-icon.png',apple:'/brand/shiftatlas-icon.png'}, title: 'SHIFTATLAS — Navigate your next chapter', description: 'An evidence-led 3D skills and career atlas for Malaysia. SDC Hackathon 2026, Domain 1.' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
