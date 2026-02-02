// Global state for sheet visibility (to hide bottom nav when open)
const isSheetOpen = ref(false)

export function useSheetState() {
  function openSheet() {
    isSheetOpen.value = true
  }

  function closeSheet() {
    isSheetOpen.value = false
  }

  return {
    isSheetOpen: readonly(isSheetOpen),
    openSheet,
    closeSheet
  }
}
