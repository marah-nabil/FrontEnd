export interface Beneficiary {
  phone: string
  address: string
  status?: string
  nationalId?: string
  fullName?: string
}
export const beneficiary = {
  id: 1,
  fullName: 'محمد أحمد يوسف',
  nationalId: '803873926',
  phone: '0599123456',
  address: 'غزة – الرمال',
  status: 'نشط',
}

export const family = [
  {
    id: 1,
    relation: 'زوجة',
    fullName: 'مي محمد عايش',
    birthDate: '1998-02-09',
    nationalId: '803873926',
  },
  {
    id: 2,
    relation: 'ابن',
    fullName: 'أحمد محمد يوسف',
    birthDate: '2016-08-09',
    nationalId: '803873926',
  },
]
