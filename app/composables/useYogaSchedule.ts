// Hämta yoga-schema från Zoezi API - alla platser
const ZOEZI_API = 'https://coregymclub.zoezi.se/api/public/workout/get/all'

// Site IDs
const SITES = {
  vegastaden: 1,
  tungelsta: 2,
  vasterhaninge: 3,
  egym: 4
} as const

type SiteKey = keyof typeof SITES

// Plats-info
export const LOCATIONS = {
  tungelsta: {
    id: 2,
    name: 'Tungelsta',
    shortName: 'Tungelsta',
    description: 'Gamla Café Medmig - en vacker röd träkyrka',
    address: 'Rosvägen 2, Tungelsta',
    image: '/images/yoga-tungelsta-ylva.avif',
    mapsUrl: 'https://maps.apple.com/?address=Rosvagen%202,%20137%2091%20Tungelsta,%20Sweden'
  },
  vegastaden: {
    id: 1,
    name: 'Core Vegastaden',
    shortName: 'Vega',
    description: 'Ljudisolerad yogasal på Core Gym Vegastaden',
    address: 'Vega Allé 2, 136 57 Vega',
    image: '/images/yoga-angela-movement.avif',
    mapsUrl: 'https://maps.apple.com/?address=Vega%20Alle%202,%20136%2057%20Vega,%20Sweden'
  }
} as const

interface WorkoutType {
  id: number
  name: string
  description: string
  color: string
  category_id: number
}

interface Staff {
  id: number
  firstname: string | null
  lastname: string | null
  imagekey?: string | null
}

interface Workout {
  id: number
  workoutType: WorkoutType
  startTime: string
  endTime: string
  space: number
  numBooked: number
  site_id: number
  extra_title: string | null
  description: string | null
  staffs: Staff[]
  bookableForCustomer: boolean
}

export interface YogaClass {
  id: number
  time: string
  endTime: string
  duration: number // minutes
  name: string
  description: string
  date: string
  dayName: string
  instructor: string | null
  instructorImage: string | null
  spotsLeft: number
  isKundalini: boolean
  isYin: boolean
  isAshtanga: boolean
  siteId: number
  siteName: string
  siteKey: SiteKey | null
}

interface DaySchedule {
  date: string
  dayName: string
  classes: YogaClass[]
}

const DAY_NAMES = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag']

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function cleanText(text: string): string {
  if (!text) return ''
  return text
    .replace(/[\u200B-\u200D\u2060\u034F\u061C\u115F\u180E\u2000-\u206F\uFEFF\u00AD\u034F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function stripHtml(html: string): string {
  if (!html) return ''
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

// Category ID 2 = Yoga/Mind&Body in Zoezi
const YOGA_CATEGORY_ID = 2

function isYogaClass(categoryId: number): boolean {
  return categoryId === YOGA_CATEGORY_ID
}

function isKundalini(name: string): boolean {
  return name.toLowerCase().includes('kundalini')
}

function isYinYoga(name: string): boolean {
  const lower = name.toLowerCase()
  return lower.includes('yin') || lower.includes('yinyoga')
}

function isAshtangaYoga(name: string): boolean {
  return name.toLowerCase().includes('ashtanga')
}

function isVinyasa(name: string): boolean {
  return name.toLowerCase().includes('vinyasa')
}

function getSiteKey(siteId: number): SiteKey | null {
  for (const [key, id] of Object.entries(SITES)) {
    if (id === siteId) return key as SiteKey
  }
  return null
}

function getSiteName(siteId: number): string {
  const key = getSiteKey(siteId)
  if (key && key in LOCATIONS) {
    return LOCATIONS[key as keyof typeof LOCATIONS].name
  }
  return 'Okänd plats'
}

function getInstructorName(staffs: Staff[]): string | null {
  if (!staffs || staffs.length === 0) return null
  const staff = staffs[0]
  const firstName = cleanText(staff.firstname || '')
  const lastName = cleanText(staff.lastname || '')
  if (firstName && lastName) return `${firstName} ${lastName}`
  return firstName || lastName || null
}

function getInstructorImage(staffs: Staff[]): string | null {
  if (!staffs || staffs.length === 0) return null
  const staff = staffs[0]
  if (!staff.imagekey) return null
  return `https://coregymclub.zoezi.se/api/utils/file/download?key=${staff.imagekey}`
}

export function useYogaSchedule() {
  const schedule = ref<DaySchedule[]>([])
  const allClasses = ref<YogaClass[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchSchedule(daysAhead: number = 14) {
    loading.value = true
    error.value = null

    try {
      const today = new Date()
      const endDate = new Date()
      endDate.setDate(today.getDate() + daysAhead)

      const url = `${ZOEZI_API}?fromDate=${formatDate(today)}&toDate=${formatDate(endDate)}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Kunde inte hämta schemat')
      }

      const data = await response.json()

      // Filter: Tungelsta + Vegastaden, only yoga classes
      const yogaClasses: YogaClass[] = []
      const yogaSiteIds = [SITES.tungelsta, SITES.vegastaden]

      for (const workout of data.workouts || []) {
        // Only yoga locations
        if (!yogaSiteIds.includes(workout.site_id)) continue

        // Only yoga classes (category_id 2)
        const categoryId = workout.workoutType?.category_id
        if (!isYogaClass(categoryId)) continue

        const name = workout.workoutType?.name || ''

        const dateMatch = workout.startTime.match(/^(\d{4}-\d{2}-\d{2})/)
        if (!dateMatch) continue

        const date = dateMatch[1]
        const [year, month, day] = date.split('-').map(Number)
        const d = new Date(year, month - 1, day)
        const dayName = DAY_NAMES[d.getDay()]

        const time = workout.startTime.substring(11, 16)
        const endTime = workout.endTime?.substring(11, 16) || ''

        // Calculate duration in minutes
        let duration = 60 // default
        if (time && endTime) {
          const [startH, startM] = time.split(':').map(Number)
          const [endH, endM] = endTime.split(':').map(Number)
          duration = (endH * 60 + endM) - (startH * 60 + startM)
        }

        yogaClasses.push({
          id: workout.id,
          time,
          endTime,
          duration,
          name: cleanText(name),
          description: stripHtml(workout.workoutType?.description || ''),
          date,
          dayName,
          instructor: getInstructorName(workout.staffs),
          instructorImage: getInstructorImage(workout.staffs),
          spotsLeft: (workout.space || 0) - (workout.numBooked || 0),
          isKundalini: isKundalini(name),
          isYin: isYinYoga(name),
          isAshtanga: isAshtangaYoga(name),
          siteId: workout.site_id,
          siteName: getSiteName(workout.site_id),
          siteKey: getSiteKey(workout.site_id)
        })
      }

      // Sort by date and time
      yogaClasses.sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date)
        return a.time.localeCompare(b.time)
      })

      allClasses.value = yogaClasses

      // Group by date
      const byDate: Record<string, YogaClass[]> = {}
      for (const cls of yogaClasses) {
        if (!byDate[cls.date]) {
          byDate[cls.date] = []
        }
        byDate[cls.date].push(cls)
      }

      schedule.value = Object.entries(byDate)
        .map(([date, classes]) => ({
          date,
          dayName: classes[0]?.dayName || '',
          classes
        }))
        .sort((a, b) => a.date.localeCompare(b.date))

    } catch (e) {
      console.error('Failed to fetch yoga schedule:', e)
      error.value = 'Kunde inte hämta schemat'
    } finally {
      loading.value = false
    }
  }

  // Get upcoming classes (next 5)
  const upcomingClasses = computed(() => allClasses.value.slice(0, 5))

  // Filter by yoga type
  const kundaliniClasses = computed(() => allClasses.value.filter(c => c.isKundalini))
  const yinClasses = computed(() => allClasses.value.filter(c => c.isYin))
  const ashtangaClasses = computed(() => allClasses.value.filter(c => c.isAshtanga))

  // Filter by location
  const tungelstaClasses = computed(() => allClasses.value.filter(c => c.siteId === SITES.tungelsta))
  const vegastadenClasses = computed(() => allClasses.value.filter(c => c.siteId === SITES.vegastaden))

  // Get classes by site
  const getClassesBySite = (siteKey: SiteKey) => {
    const siteId = SITES[siteKey]
    return computed(() => allClasses.value.filter(c => c.siteId === siteId))
  }

  // Get unique yoga types with descriptions
  interface YogaType {
    name: string
    description: string
    isKundalini: boolean
    isYin: boolean
    isAshtanga: boolean
  }

  const yogaTypes = computed(() => {
    const types = new Map<string, YogaType>()

    for (const cls of allClasses.value) {
      const cleanName = cls.name.trim()
      if (!types.has(cleanName) && cls.description) {
        types.set(cleanName, {
          name: cleanName,
          description: cls.description,
          isKundalini: cls.isKundalini,
          isYin: cls.isYin,
          isAshtanga: cleanName.toLowerCase().includes('ashtanga')
        })
      }
    }

    return Array.from(types.values())
  })

  return {
    schedule,
    allClasses,
    upcomingClasses,
    kundaliniClasses,
    yinClasses,
    ashtangaClasses,
    tungelstaClasses,
    vegastadenClasses,
    getClassesBySite,
    yogaTypes,
    loading,
    error,
    fetchSchedule,
    LOCATIONS,
    SITES
  }
}
