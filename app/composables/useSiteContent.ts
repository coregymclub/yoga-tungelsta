// Composable för att hämta sidinnehåll från JSON-fil
// Detta gör det enkelt att uppdatera innehåll utan att röra Vue-koden

import siteContent from '~/content/site-content.json'

export interface Instructor {
  name: string
  description: string
  email: string
  phone: string
}

export interface Location {
  name: string
  address: string
  postalCode: string
  city: string
  mapUrl: string
}

export interface ScheduleItem {
  day: string
  time: string
  title: string
  description: string
  level: string
}

export interface Event {
  date: string
  title: string
  description: string
  price?: string
}

export interface SocialMedia {
  facebook: string
  instagram: string
}

export interface SiteContent {
  instructor: Instructor
  location: Location
  schedule: ScheduleItem[]
  upcomingEvents: Event[]
  socialMedia: SocialMedia
}

export const useSiteContent = () => {
  const content = siteContent as SiteContent

  return {
    instructor: content.instructor,
    location: content.location,
    schedule: content.schedule,
    upcomingEvents: content.upcomingEvents,
    socialMedia: content.socialMedia,

    // Hjälpfunktioner
    getFullAddress: () => {
      const loc = content.location
      return `${loc.address}, ${loc.postalCode} ${loc.city}`
    }
  }
}
