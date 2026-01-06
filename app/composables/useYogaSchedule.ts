// Hämta yoga-schema från Zoezi API - filtrerat på Tungelsta
const ZOEZI_API = 'https://coregymclub.zoezi.se/api/public/workout/get/all'

// Tungelsta site ID
const TUNGELSTA_SITE_ID = 2

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
  name: string
  description: string
  date: string
  dayName: string
  instructor: string | null
  instructorImage: string | null
  spotsLeft: number
  isKundalini: boolean
  isYin: boolean
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

function isYogaClass(name: string): boolean {
  const lower = name.toLowerCase()
  return lower.includes('yoga') ||
         lower.includes('kundalini') ||
         lower.includes('yin') ||
         lower.includes('meditation')
}

function isKundalini(name: string): boolean {
  return name.toLowerCase().includes('kundalini')
}

function isYinYoga(name: string): boolean {
  const lower = name.toLowerCase()
  return lower.includes('yin') || lower.includes('yinyoga')
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

      // Filter: Only Tungelsta (site_id 2) and yoga classes
      const yogaClasses: YogaClass[] = []

      for (const workout of data.workouts || []) {
        // Only Tungelsta
        if (workout.site_id !== TUNGELSTA_SITE_ID) continue

        // Only yoga classes
        const name = workout.workoutType?.name || ''
        if (!isYogaClass(name)) continue

        const dateMatch = workout.startTime.match(/^(\d{4}-\d{2}-\d{2})/)
        if (!dateMatch) continue

        const date = dateMatch[1]
        const [year, month, day] = date.split('-').map(Number)
        const d = new Date(year, month - 1, day)
        const dayName = DAY_NAMES[d.getDay()]

        const time = workout.startTime.substring(11, 16)
        const endTime = workout.endTime?.substring(11, 16) || ''

        yogaClasses.push({
          id: workout.id,
          time,
          endTime,
          name: cleanText(name),
          description: stripHtml(workout.workoutType?.description || ''),
          date,
          dayName,
          instructor: getInstructorName(workout.staffs),
          instructorImage: getInstructorImage(workout.staffs),
          spotsLeft: (workout.space || 0) - (workout.numBooked || 0),
          isKundalini: isKundalini(name),
          isYin: isYinYoga(name)
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

  // Get upcoming classes (next 3)
  const upcomingClasses = computed(() => allClasses.value.slice(0, 3))

  // Filter only kundalini
  const kundaliniClasses = computed(() => allClasses.value.filter(c => c.isKundalini))

  // Filter only yin
  const yinClasses = computed(() => allClasses.value.filter(c => c.isYin))

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
    yogaTypes,
    loading,
    error,
    fetchSchedule
  }
}
