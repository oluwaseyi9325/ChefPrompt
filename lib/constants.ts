import {
  BarChart,
  Building,
  Calendar,
  FileText,
  Home,
  LucideIcon,
  MessageSquare,
  RefreshCcw,
  Settings,
  User,
  Users,
} from 'lucide-react'
import { JSX, SVGProps } from 'react'

export const countries = [
  { value: 'ng', label: 'Nigeria', flag: '🇳🇬' },
  { value: 'eg', label: 'Egypt', flag: '🇪🇬' },
  { value: 'za', label: 'South Africa', flag: '🇿🇦' },
  { value: 'ke', label: 'Kenya', flag: '🇰🇪' },
  { value: 'gh', label: 'Ghana', flag: '🇬🇭' },
  { value: 'tz', label: 'Tanzania', flag: '🇹🇿' },
  { value: 'et', label: 'Ethiopia', flag: '🇪🇹' },
  { value: 'dz', label: 'Algeria', flag: '🇩🇿' },
  { value: 'ma', label: 'Morocco', flag: '🇲🇦' },
  { value: 'ug', label: 'Uganda', flag: '🇺🇬' },
]

export const operationDays = [
  { id: 'mon', label: 'Mon' },
  { id: 'tue', label: 'Tue' },
  { id: 'wed', label: 'Wed' },
  { id: 'thu', label: 'Thu' },
  { id: 'fri', label: 'Fri' },
  { id: 'sat', label: 'Sat' },
  { id: 'sun', label: 'Sun' },
]

export const OperationHours = [
  '6:00 am',
  '7:00 am',
  '8:00 am',
  '9:00 am',
  '10:00 am',
  '11:00 am',
  '12:00 pm',
  '1:00 pm',
  '2:00 pm',
  '3:00 pm',
  '4:00 pm',
  '5:00 pm',
  '6:00 pm',
  '7:00 pm',
  '8:00 pm',
  '9:00 pm',
  '10:00 pm',
  '11:00 pm',
]

export const nigeriaStates = [
  { value: 'ab', label: 'Abia' },
  { value: 'ad', label: 'Adamawa' },
  { value: 'ak', label: 'Akwa Ibom' },
  { value: 'an', label: 'Anambra' },
  { value: 'ba', label: 'Bauchi' },
  { value: 'by', label: 'Bayelsa' },
  { value: 'be', label: 'Benue' },
  { value: 'bo', label: 'Borno' },
  { value: 'cr', label: 'Cross River' },
  { value: 'de', label: 'Delta' },
  { value: 'eb', label: 'Ebonyi' },
  { value: 'ed', label: 'Edo' },
  { value: 'ek', label: 'Ekiti' },
  { value: 'en', label: 'Enugu' },
  { value: 'go', label: 'Gombe' },
  { value: 'im', label: 'Imo' },
  { value: 'ji', label: 'Jigawa' },
  { value: 'kd', label: 'Kaduna' },
  { value: 'kn', label: 'Kano' },
  { value: 'kt', label: 'Katsina' },
  { value: 'ke', label: 'Kebbi' },
  { value: 'ko', label: 'Kogi' },
  { value: 'kw', label: 'Kwara' },
  { value: 'la', label: 'Lagos' },
  { value: 'na', label: 'Nasarawa' },
  { value: 'ni', label: 'Niger' },
  { value: 'og', label: 'Ogun' },
  { value: 'on', label: 'Ondo' },
  { value: 'os', label: 'Osun' },
  { value: 'oj', label: 'Oyo' },
  { value: 'pl', label: 'Plateau' },
  { value: 'rv', label: 'Rivers' },
  { value: 'so', label: 'Sokoto' },
  { value: 'ta', label: 'Taraba' },
  { value: 'yo', label: 'Yobe' },
  { value: 'za', label: 'Zamfara' },
]

interface NavItem {
  name: string
  href: string
  icon: LucideIcon | ((props: SVGProps<SVGSVGElement>) => JSX.Element)
}

export const patientNav: NavItem[] = [
  { name: 'Dashboard', href: '/patient', icon: Home },
  { name: 'Appointments', href: '/patient/appointments', icon: Calendar },
  { name: 'Prescriptions', href: '/patient/prescriptions', icon: FileText },
  { name: 'Messages', href: '/patient/messages', icon: MessageSquare },
  { name: 'Settings', href: '/patient/settings', icon: Settings },
]

export const specialistNav: NavItem[] = [
  { name: 'Dashboard', href: '/specialist', icon: Home },
  { name: 'Referrals', href: '/specialist/referrals', icon: RefreshCcw },
  { name: 'Patients', href: '/specialist/patients', icon: Users },
  { name: 'Messages', href: '/specialist/messages', icon: MessageSquare },
  { name: 'Health Providers', href: '/specialist/health-providers', icon: Building },
  { name: 'Settings', href: '/specialist/settings', icon: Settings },
]

export const healthProviderNav: NavItem[] = [
  { name: 'Dashboard', href: '/health-provider', icon: Home },
  { name: 'Referrals', href: '/health-provider/referrals', icon: RefreshCcw },
  { name: 'Messages', href: '/health-provider/messages', icon: MessageSquare },
  { name: 'Patients', href: '/health-provider/patients', icon: Users },
  { name: 'Specialists', href: '/health-provider/specialists', icon: User },
  { name: 'Settings', href: '/health-provider/settings', icon: Settings },
]

export const adminNav: NavItem[] = [
  { name: 'Overview', href: '/admin', icon: BarChart },
  { name: 'Referrals', href: '/admin/referrals', icon: RefreshCcw },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Hospitals', href: '/admin/hospitals', icon: Building },
  { name: 'Specialists', href: '/admin/specialists', icon: User },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]
