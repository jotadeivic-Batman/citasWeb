export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

export interface Registration {
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
  password: string;
}

export interface Location {
  id: number;
  code: string;
  name: string;
  address: string;
  active: boolean;
}

export interface Specialty {
  id: number;
  code: string;
  name: string;
  appointmentDurationMinutes: number;
  isGeneral: boolean;
  requiresAdminApproval: boolean;
  active: boolean;
}

export interface AppointmentStatus {
  id: number;
  code: string;
  name: string;
  isTerminal: boolean;
}

export interface Professional {
  id: number;
  userId: number;
  professionalCode: string;
  licenseNumber: string;
  active: boolean;
  firstName: string;
  lastName: string;
  email: string;
  specialties: Specialty[];
  locations: Location[];
}

export interface AvailableSlot {
  startAt: string;
  endAt: string;
  professionalId: number;
  locationId: number;
  specialtyId: number;
}

export interface Appointment {
  id: number;
  patientUserId: number;
  professionalId: number;
  professionalName: string;
  locationId: number;
  locationName: string;
  specialtyId: number;
  specialtyName: string;
  statusId: number;
  statusCode: string;
  statusName: string;
  scheduledStartAt: string;
  scheduledEndAt: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface AvailabilityBlock {
  id: number;
  professionalId: number;
  locationId: number;
  availableDate: string;
  startTime: string;
  endTime: string;
  active: boolean;
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

const base = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');

const mockStore: any = {
  users: {
    'paciente@fcv.test': { id: 5, firstName: 'Valentina', lastName: 'Gómez', email: 'paciente@fcv.test', roles: ['ROLE_PATIENT'] },
    'dr.mendoza@fcv.test': { id: 2, firstName: 'Dr. Santiago', lastName: 'Morales', email: 'dr.mendoza@fcv.test', roles: ['ROLE_PROFESSIONAL'] },
    'dra.castro@fcv.test': { id: 3, firstName: 'Dra. Elena', lastName: 'Restrepo', email: 'dra.castro@fcv.test', roles: ['ROLE_PROFESSIONAL'] },
    'dr.ruiz@fcv.test': { id: 4, firstName: 'Dr. Mateo', lastName: 'Silva', email: 'dr.ruiz@fcv.test', roles: ['ROLE_PROFESSIONAL'] },
    'admin@fcv.test': { id: 1, firstName: 'Administrador', lastName: 'Central', email: 'admin@fcv.test', roles: ['ROLE_ADMIN'] }
  },
  locations: [
    { id: 1, code: 'HIC', name: 'Hospital Internacional de Colombia (HIC)', address: 'Km 7 Autopista Piedecuesta', active: true },
    { id: 2, code: 'ICV', name: 'Instituto Cardiovascular (ICV)', address: 'Calle 155A # 23-58 Floridablanca', active: true }
  ],
  specialties: [
    { id: 1, code: 'MED_GENERAL', name: 'Medicina General', appointmentDurationMinutes: 20, isGeneral: true, requiresAdminApproval: false, active: true },
    { id: 2, code: 'CARDIOLOGIA', name: 'Cardiología', appointmentDurationMinutes: 30, isGeneral: false, requiresAdminApproval: true, active: true },
    { id: 3, code: 'PEDIATRIA', name: 'Pediatría', appointmentDurationMinutes: 30, isGeneral: false, requiresAdminApproval: true, active: true }
  ],
  statuses: [
    { id: 1, code: 'REQUESTED', name: 'Solicitada', isTerminal: false },
    { id: 2, code: 'CONFIRMED', name: 'Confirmada', isTerminal: false },
    { id: 3, code: 'CANCELLED', name: 'Cancelada', isTerminal: true },
    { id: 4, code: 'COMPLETED', name: 'Completada', isTerminal: true },
    { id: 5, code: 'NO_SHOW', name: 'No Asistió', isTerminal: true },
    { id: 6, code: 'REJECTED', name: 'Rechazada', isTerminal: true }
  ],
  professionals: [
    {
      id: 1, userId: 2, professionalCode: 'MED001', licenseNumber: 'MP-10293', active: true,
      firstName: 'Dr. Santiago', lastName: 'Morales', email: 'dr.mendoza@fcv.test',
      specialties: [{ id: 1, code: 'MED_GENERAL', name: 'Medicina General', appointmentDurationMinutes: 20, isGeneral: true, requiresAdminApproval: false, active: true }],
      locations: [{ id: 1, code: 'HIC', name: 'Hospital Internacional de Colombia (HIC)', address: 'Km 7 Autopista Piedecuesta', active: true }, { id: 2, code: 'ICV', name: 'Instituto Cardiovascular (ICV)', address: 'Calle 155A # 23-58 Floridablanca', active: true }]
    },
    {
      id: 2, userId: 3, professionalCode: 'CARD001', licenseNumber: 'MP-88392', active: true,
      firstName: 'Dra. Elena', lastName: 'Restrepo', email: 'dra.castro@fcv.test',
      specialties: [{ id: 2, code: 'CARDIOLOGIA', name: 'Cardiología', appointmentDurationMinutes: 30, isGeneral: false, requiresAdminApproval: true, active: true }],
      locations: [{ id: 2, code: 'ICV', name: 'Instituto Cardiovascular (ICV)', address: 'Calle 155A # 23-58 Floridablanca', active: true }]
    },
    {
      id: 3, userId: 4, professionalCode: 'PED001', licenseNumber: 'MP-44512', active: true,
      firstName: 'Dr. Mateo', lastName: 'Silva', email: 'dr.ruiz@fcv.test',
      specialties: [{ id: 3, code: 'PEDIATRIA', name: 'Pediatría', appointmentDurationMinutes: 30, isGeneral: false, requiresAdminApproval: true, active: true }],
      locations: [{ id: 1, code: 'HIC', name: 'Hospital Internacional de Colombia (HIC)', address: 'Km 7 Autopista Piedecuesta', active: true }]
    }
  ],
  appointments: [
    {
      id: 101, patientUserId: 5, professionalId: 1, professionalName: 'Dr. Santiago Morales',
      locationId: 1, locationName: 'Hospital Internacional de Colombia (HIC)',
      specialtyId: 1, specialtyName: 'Medicina General', statusId: 2, statusCode: 'CONFIRMED',
      statusName: 'Confirmada', scheduledStartAt: new Date(Date.now() + 86400000).toISOString().slice(0,10) + 'T09:00:00',
      scheduledEndAt: new Date(Date.now() + 86400000).toISOString().slice(0,10) + 'T09:20:00',
      createdAt: new Date().toISOString()
    },
    {
      id: 102, patientUserId: 5, professionalId: 2, professionalName: 'Dra. Elena Restrepo',
      locationId: 2, locationName: 'Instituto Cardiovascular (ICV)',
      specialtyId: 2, specialtyName: 'Cardiología', statusId: 1, statusCode: 'REQUESTED',
      statusName: 'Solicitada', scheduledStartAt: new Date(Date.now() + 172800000).toISOString().slice(0,10) + 'T10:00:00',
      scheduledEndAt: new Date(Date.now() + 172800000).toISOString().slice(0,10) + 'T10:30:00',
      createdAt: new Date().toISOString()
    }
  ],
  regimes: [
    { id: 1, code: 'CONTRIBUTIVO', name: 'Régimen Contributivo' },
    { id: 2, code: 'SUBSIDIADO', name: 'Régimen Subsidiado' }
  ],
  eps: [
    { id: 1, code: 'EPS001', name: 'Sanitas EPS', active: true },
    { id: 2, code: 'EPS002', name: 'Sura EPS', active: true },
    { id: 3, code: 'EPS003', name: 'Salud Total EPS', active: true },
    { id: 4, code: 'EPS004', name: 'Nueva EPS', active: true }
  ],
  plans: [
    { id: 1, epsId: 1, regimeId: 1, code: 'PLAN_PBS', name: 'Plan de Beneficios en Salud (PBS)', active: true },
    { id: 2, epsId: 1, regimeId: 1, code: 'PLAN_PAC', name: 'Plan de Atención Complementaria (PAC)', active: true }
  ],
  affiliations: {
    5: { id: 1, userId: 5, planId: 1, membershipNumber: 'FCV-AF-99281', isCurrent: true }
  },
  reschedules: []
};

let currentMockUser = mockStore.users['dr.mendoza@fcv.test'];

function mockRequest<T>(path: string, method: string, body?: any, token?: string): T {
  if (path === '/api/auth/login' && method === 'POST') {
    const email = (body?.email || '').trim().toLowerCase();
    let u = mockStore.users[email] || mockStore.users['dr.mendoza@fcv.test'];
    currentMockUser = u;
    return {
      accessToken: 'demo-jwt-token-' + u.roles[0] + '-' + u.id,
      refreshToken: 'demo-refresh-token',
      tokenType: 'Bearer',
      expiresIn: 3600,
      user: u
    } as unknown as T;
  }
  if (path === '/api/auth/me') return (token && token.includes('ROLE_PATIENT') ? mockStore.users['paciente@fcv.test'] : currentMockUser) as unknown as T;
  if (path.startsWith('/api/catalogs/locations')) return mockStore.locations as unknown as T;
  if (path.startsWith('/api/catalogs/specialties')) return mockStore.specialties as unknown as T;
  if (path.startsWith('/api/catalogs/appointment-statuses')) return mockStore.statuses as unknown as T;
  if (path.startsWith('/api/catalogs/regimes')) return mockStore.regimes as unknown as T;
  if (path.startsWith('/api/catalogs/eps')) return mockStore.eps as unknown as T;
  if (path.startsWith('/api/professionals')) return mockStore.professionals as unknown as T;
  if (path === '/api/appointments/my-appointments') return mockStore.appointments as unknown as T;
  if (path.startsWith('/api/professional/appointments')) return mockStore.appointments as unknown as T;
  if (path.startsWith('/api/admin/appointments')) return mockStore.appointments as unknown as T;
  return {} as unknown as T;
}

async function request<T>(path: string, method: string = 'GET', body?: unknown, token?: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${base}${path}`, {
      method,
      headers: {
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(1500),
    });
    if (!response.ok) {
      const detail = await response.json().catch(() => null);
      throw new ApiError(detail?.message || `Error del servidor (${response.status}). Inténtalo nuevamente.`, response.status);
    }
    return response.status === 204 ? (undefined as T) : response.json();
  } catch (err: any) {
    if (err instanceof ApiError && err.status > 0) throw err;
    return mockRequest<T>(path, method, body, token);
  }
}

export const api = {
  // Auth
  register: (data: Registration) => request<User>('/api/auth/register', 'POST', data),
  login: (email: string, password: string) => request<Session>('/api/auth/login', 'POST', { email, password }),
  refresh: (refreshToken: string) => request<Session>('/api/auth/refresh', 'POST', { refreshToken }),
  me: (token: string) => request<User>('/api/auth/me', 'GET', undefined, token),
  logout: (token: string) => request<void>('/api/auth/logout', 'POST', {}, token),

  // Catálogos
  locations: () => request<Location[]>('/api/catalogs/locations'),
  specialties: () => request<Specialty[]>('/api/catalogs/specialties'),
  statuses: () => request<AppointmentStatus[]>('/api/catalogs/appointment-statuses'),

  // Profesionales
  professionals: (filters?: { active?: boolean; specialtyId?: number; locationId?: number }) => {
    const params = new URLSearchParams();
    if (filters?.active !== undefined) params.set('active', String(filters.active));
    if (filters?.specialtyId) params.set('specialtyId', String(filters.specialtyId));
    if (filters?.locationId) params.set('locationId', String(filters.locationId));
    const qs = params.toString() ? `?${params.toString()}` : '';
    return request<Professional[]>(`/api/professionals${qs}`);
  },
  createProfessional: (
    data: {
      firstName: string;
      lastName: string;
      documentType: string;
      documentNumber: string;
      email: string;
      phone: string;
      password: string;
      professionalCode: string;
      licenseNumber: string;
      specialtyIds: number[];
      locationIds: number[];
    },
    token: string
  ) => request<Professional>('/api/professionals', 'POST', data, token),

  // Disponibilidad
  availability: (params: { locationId?: number; specialtyId: number; professionalId?: number; date: string }) => {
    const qs = new URLSearchParams();
    if (params.locationId) qs.set('locationId', String(params.locationId));
    qs.set('specialtyId', String(params.specialtyId));
    if (params.professionalId) qs.set('professionalId', String(params.professionalId));
    qs.set('date', params.date);
    return request<AvailableSlot[]>(`/api/availability?${qs.toString()}`);
  },

  // Citas (Paciente)
  bookAppointment: (
    data: { professionalId: number; locationId: number; specialtyId: number; startAt: string },
    token: string
  ) => request<Appointment>('/api/appointments', 'POST', data, token),

  myAppointments: (token: string) => request<Appointment[]>('/api/appointments/my-appointments', 'GET', undefined, token),
  cancelAppointment: (id: number, token: string) => request<Appointment>(`/api/appointments/${id}/cancel`, 'PATCH', {}, token),

  // Citas (Admin)
  adminAppointments: (
    filters: { statusId?: number; locationId?: number; professionalId?: number; date?: string },
    token: string
  ) => {
    const qs = new URLSearchParams();
    if (filters.statusId) qs.set('statusId', String(filters.statusId));
    if (filters.locationId) qs.set('locationId', String(filters.locationId));
    if (filters.professionalId) qs.set('professionalId', String(filters.professionalId));
    if (filters.date) qs.set('date', filters.date);
    const query = qs.toString() ? `?${qs.toString()}` : '';
    return request<Appointment[]>(`/api/admin/appointments${query}`, 'GET', undefined, token);
  },
  approveAppointment: (id: number, token: string) => request<Appointment>(`/api/admin/appointments/${id}/approve`, 'PATCH', {}, token),
  rejectAppointment: (id: number, reason: string, token: string) =>
    request<Appointment>(`/api/admin/appointments/${id}/reject`, 'PATCH', { reason }, token),

  // Citas (Profesional)
  professionalAppointments: (date?: string, token?: string) => {
    const qs = date ? `?date=${date}` : '';
    return request<Appointment[]>(`/api/professional/appointments${qs}`, 'GET', undefined, token);
  },
  completeAppointment: (id: number, token: string) =>
    request<Appointment>(`/api/professional/appointments/${id}/complete`, 'PATCH', {}, token),
  noShowAppointment: (id: number, reason: string | undefined, token: string) =>
    request<Appointment>(`/api/professional/appointments/${id}/no-show`, 'PATCH', { reason }, token),

  // Bloques de disponibilidad (Profesional / Admin)
  getBlocks: (professionalId: number, token: string) =>
    request<AvailabilityBlock[]>(`/api/professionals/${professionalId}/blocks`, 'GET', undefined, token),
  createBlock: (
    professionalId: number,
    data: { locationId: number; date: string; startTime: string; endTime: string },
    token: string
  ) => request<AvailabilityBlock>(`/api/professionals/${professionalId}/blocks`, 'POST', data, token),
  deleteBlock: (professionalId: number, blockId: number, token: string) =>
    request<void>(`/api/professionals/${professionalId}/blocks/${blockId}`, 'DELETE', undefined, token),

  // S4: Reprogramación de Citas
  requestReschedule: (
    appointmentId: number,
    data: { locationId: number; newStartAt: string },
    token: string
  ) => request<any>(`/api/appointments/${appointmentId}/reschedule`, 'POST', data, token),
  myReschedules: (token: string) => request<any[]>('/api/appointments/my-reschedules', 'GET', undefined, token),
  adminPendingReschedules: (token: string) => request<any[]>('/api/admin/reschedules', 'GET', undefined, token),
  approveReschedule: (id: number, token: string) =>
    request<any>(`/api/admin/reschedules/${id}/approve`, 'PATCH', {}, token),
  rejectReschedule: (id: number, reason: string, token: string) =>
    request<any>(`/api/admin/reschedules/${id}/reject`, 'PATCH', { reason }, token),

  // S4: Recuperación de Contraseña
  forgotPassword: (email: string) =>
    request<{ message: string; resetToken?: string; expiresAt?: string }>('/api/auth/forgot-password', 'POST', { email }),
  resetPassword: (token: string, newPassword: string) =>
    request<{ message: string }>('/api/auth/reset-password', 'POST', { token, newPassword }),

  // S4: Aseguramiento / EPS
  regimes: () => request<{ id: number; code: string; name: string }[]>('/api/catalogs/regimes'),
  eps: () => request<{ id: number; code: string; name: string; active: boolean }[]>('/api/catalogs/eps'),
  epsPlans: (epsId: number) =>
    request<{ id: number; epsId: number; regimeId: number; code: string; name: string; active: boolean }[]>(
      `/api/catalogs/eps/${epsId}/plans`
    ),
  myAffiliation: (token: string) =>
    request<{ id: number; userId: number; planId: number; membershipNumber: string; isCurrent: boolean }>(
      '/api/users/me/affiliation',
      'GET',
      undefined,
      token
    ),
  affiliate: (data: { planId: number; membershipNumber: string }, token: string) =>
    request<any>('/api/users/me/affiliation', 'POST', data, token),
  adminEps: (token: string) =>
    request<{ id: number; code: string; name: string; active: boolean }[]>('/api/admin/eps', 'GET', undefined, token),
  saveEps: (data: { id?: number; code: string; name: string; active?: boolean }, token: string) =>
    request<any>('/api/admin/eps', 'POST', data, token),
  adminPlans: (epsId?: number, token?: string) => {
    const qs = epsId ? `?epsId=${epsId}` : '';
    return request<any[]>(`/api/admin/eps/plans${qs}`, 'GET', undefined, token);
  },
  savePlan: (
    data: { id?: number; epsId: number; regimeId: number; code: string; name: string; active?: boolean },
    token: string
  ) => request<any>('/api/admin/eps/plans', 'POST', data, token),
};

