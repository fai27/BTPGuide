// Helper SVG icon generator menggunakan lucide icon definitions
import {
  Barcode,
  Camera,
  Search,
  History,
  Info,
  BookOpen,
  Home,
  User,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  ArrowLeft,
  X,
  Check,
  AlertTriangle,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Palette,
  Candy,
  Droplets,
  Layers,
  Zap,
  Smile,
  Copy,
  Upload,
  RefreshCw,
  Trash2,
  Filter,
  Eye,
  ExternalLink,
  Flashlight,
  FileText,
  SlidersHorizontal,
  Bookmark,
  Share2,
  Smartphone,
  Tablet,
  Database,
  Settings,
  Globe,
  FlaskConical,
  Leaf,
  Apple
} from 'lucide';

const ICON_MAP = {
  'barcode': Barcode,
  'camera': Camera,
  'search': Search,
  'history': History,
  'info': Info,
  'book-open': BookOpen,
  'home': Home,
  'user': User,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-up': ChevronUp,
  'arrow-left': ArrowLeft,
  'x': X,
  'check': Check,
  'alert-triangle': AlertTriangle,
  'alert-circle': AlertCircle,
  'sparkles': Sparkles,
  'shield-check': ShieldCheck,
  'palette': Palette,
  'candy': Candy,
  'droplets': Droplets,
  'layers': Layers,
  'zap': Zap,
  'smile': Smile,
  'copy': Copy,
  'upload': Upload,
  'refresh-cw': RefreshCw,
  'trash-2': Trash2,
  'filter': Filter,
  'eye': Eye,
  'external-link': ExternalLink,
  'flashlight': Flashlight,
  'file-text': FileText,
  'sliders': SlidersHorizontal,
  'bookmark': Bookmark,
  'share-2': Share2,
  'smartphone': Smartphone,
  'tablet': Tablet,
  'database': Database,
  'settings': Settings,
  'globe': Globe,
  'flask': FlaskConical,
  'leaf': Leaf,
  'apple': Apple
};

// Official BTPGuide Vector Monogram Logo
export function getBrandLogo(size = 24, className = '', color = '#FFFFFF') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}" fill="none" class="btp-logo-mark ${className}" aria-label="BTPGuide Logo">
    <!-- Letter B -->
    <path d="M4.5 8h4.6a3.2 3.2 0 0 1 2.3 5.4A3.4 3.4 0 0 1 9.2 24H4.5V8zm2.6 5.3h2a1.3 1.3 0 0 0 0-2.6h-2v2.6zm0 7.7h2.2a1.5 1.5 0 0 0 0-3H7.1v3z" fill="${color}"/>
    <!-- Letter T -->
    <path d="M12.8 8h7.4v2.7h-2.3V24H15V10.7h-2.2V8z" fill="${color}"/>
    <!-- Letter P -->
    <path d="M21.2 8h4.8a3.8 3.8 0 0 1 0 7.6h-2V24h-2.8V8zm2.8 5h2a1.4 1.4 0 0 0 0-2.8h-2V13z" fill="${color}"/>
    <!-- Molecule / Leaf Node Accent (Pangan Sehat) -->
    <circle cx="28.2" cy="6.2" r="2.2" fill="#8CE0A8"/>
  </svg>`;
}

export function getIcon(name, size = 20, className = '', color = 'currentColor') {
  if (name === 'btp' || name === 'btp-logo' || name === 'brand-logo') {
    return getBrandLogo(size, className, color);
  }

  // Prevent Gemini star appearance anywhere if 'sparkles' is requested
  const iconDef = name === 'sparkles' ? FlaskConical : (ICON_MAP[name] || Info);
  
  // iconDef adalah array dari [tag, attrs], contoh: [ ['path', { d: '...' }] ]
  const children = Array.isArray(iconDef) ? iconDef : [];
  
  const innerHtml = children.map(([childTag, childAttrs]) => {
    const attrStr = Object.entries(childAttrs || {})
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ');
    return `<${childTag} ${attrStr}></${childTag}>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${name} ${className}">${innerHtml}</svg>`;
}


