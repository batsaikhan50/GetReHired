import type { LucideIcon } from 'lucide-react'
import {
  Briefcase, BarChart3, Users, TrendingUp, UserCog, PenTool, Truck,
  Palette, Code2, GraduationCap, ShieldCheck, CircleDollarSign, HeartPulse,
  Megaphone, Film, ShoppingCart, BadgeCheck, Home, PartyPopper, HandHeart,
} from 'lucide-react'

// Maps a career `field` to a representative lucide icon, so career cards and
// detail pages get a recognizable glyph instead of a generic emoji.
const FIELD_ICONS: Record<string, LucideIcon> = {
  Management: Briefcase,
  Operations: BarChart3,
  Analytics: TrendingUp,
  Technology: Code2,
  Design: Palette,
  Creative: PenTool,
  Media: Film,
  Marketing: Megaphone,
  'Digital Marketing': Megaphone,
  'Digital Commerce': ShoppingCart,
  Sales: TrendingUp,
  'Sales & Strategy': TrendingUp,
  'Customer Relations': Users,
  'Client Relations': Users,
  'Human Resources': UserCog,
  'Learning & Development': GraduationCap,
  Education: GraduationCap,
  Finance: CircleDollarSign,
  Healthcare: HeartPulse,
  'Quality Assurance': BadgeCheck,
  'Real Estate': Home,
  'Events & Hospitality': PartyPopper,
  'Non-profit & Social Work': HandHeart,
  Logistics: Truck,
  Security: ShieldCheck,
}

export function fieldIcon(field: string): LucideIcon {
  return FIELD_ICONS[field] ?? Briefcase
}
