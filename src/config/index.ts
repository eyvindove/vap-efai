interface ActiveStatus {
  [key: number]: ActiveItem
}

interface ActiveItem {
  label: string
}

export const activeStatusConfig: ActiveStatus = {
  1: {
    label: '啟用',
  },
  2: {
    label: '停用',
  },
}
