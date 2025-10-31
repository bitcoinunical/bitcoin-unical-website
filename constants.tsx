
import { FaTwitter, FaLinkedin, FaTelegram, FaWhatsapp, FaYoutube } from 'react-icons/fa';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Research', path: '/research' },
  { name: 'Projects', path: '/project' },
  { name: 'Blog', path: '/blog' },
  { name: 'Library', path: '/library' },
  { name: 'Events', path: '/events' },
  { name: 'Support Us', path: '/support' },
];

export const SOCIAL_LINKS = [
  { name: 'Telegram', icon: <FaTelegram />, url: 'https://t.me/bitcoinunical' },
  { name: 'WhatsApp', icon: <FaWhatsapp />, url: 'https://wa.me/yournumber' },
  { name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com/bitcoinunical' },
  { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://linkedin.com/company/bitcoinunical' },
  { name: 'YouTube', icon: <FaYoutube />, url: 'https://youtube.com/bitcoinunical' },
];
