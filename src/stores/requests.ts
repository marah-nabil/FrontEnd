import { defineStore } from 'pinia'

export type RequestType = 'add' | 'edit' | 'delete'
export type RequestStatus = 'pending' | 'approved' | 'rejected'

export type RequestItem  = {
  id: number
  type: RequestType
  title: string
  date: string
  status: RequestStatus
  payload: any
}


export const useRequestsStore = defineStore('requests', {
  state: () => ({
    requests: [] as RequestItem[]
  }),

  actions: {
    addRequest(request: Omit<RequestItem, 'id' | 'date' | 'status'>) {
      this.requests.push({
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        ...request
      })
    },


    approveRequest(id: number) {
      const req = this.requests.find(r => r.id === id)
      if (req) req.status = 'approved'
    },

    rejectRequest(id: number) {
      const req = this.requests.find(r => r.id === id)
      if (req) req.status = 'rejected'
    }
  }
})
