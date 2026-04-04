// ─── User & Auth ────────────────────────────────────────────────────────────
export type UserRole = "student" | "company" | "college" | "admin" | "guest";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  role: UserRole;
  provider: "local" | "google";
  createdAt: number;
  approved: boolean;    // true = can access dashboard
  createdBy?: string;  // admin email who created this user
}

export interface Session {
  name: string;
  email: string;
  role: UserRole;
  provider: "local" | "google";
  approved: boolean;
}

// ─── Events ─────────────────────────────────────────────────────────────────
export type EventStatus = "active" | "closed" | "draft";

export interface TalentEvent {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: EventStatus;
  createdAt: number;
  createdBy: string; // user email
  location?: string;
  capacity?: number;
}

// ─── Guests ──────────────────────────────────────────────────────────────────
export type GuestStatus = "pending" | "checked-in" | "checked-out";

export interface Guest {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: GuestStatus;
  scans: number;
  registeredAt: number;
  checkedInAt?: number;
  qrToken: string;
  qrSerial?: string;    // linked batch QR serial
}

// ─── Pre-registration ────────────────────────────────────────────────────────
export type FieldType =
  | "text"
  | "email"
  | "phone"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // for select / radio / checkbox
}

export interface PreRegistrationForm {
  id: string;
  eventId: string;
  title: string;
  fields: FormField[];
  createdAt: number;
}

export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface Submission {
  id: string;
  formId: string;
  eventId: string;
  answers: Record<string, string | string[]>;
  status: SubmissionStatus;
  submittedAt: number;
  name?: string;
  email?: string;
}

// ─── Scanner ─────────────────────────────────────────────────────────────────
export interface ScanLog {
  id: string;
  eventId: string;
  guestId: string;
  guestName: string;
  timestamp: number;
  action: "check-in" | "check-out";
  device?: string;
}

export interface ScannerSettings {
  autoCheckIn: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  successSound: string;
  errorSound: string;
}

// ─── QR ──────────────────────────────────────────────────────────────────────
export type QRDotStyle = "square" | "dots" | "rounded" | "extra-rounded" | "classy";

export interface QROptions {
  data: string;
  size: number;
  dotStyle: QRDotStyle;
  fgColor: string;
  bgColor: string;
  margin: number;
  quantity: number;
}

// ─── Batch QR Codes (Idnetify-style) ────────────────────────────────────────
export type QRCodeStatus = "new" | "used";
export type QRDotPattern =
  | "square"
  | "dots"
  | "rounded"
  | "extra-rounded"
  | "classy"
  | "classy-rounded";
export type QRCornerFrame = "square" | "extra-rounded" | "dot";
export type QRCornerDot = "square" | "dot";
export type QRGenerationMode = "standard" | "circle";

export interface QRCodeRecord {
  id: string;
  serial: string;       // e.g. "XN480UR3RRM9"
  eventId: string;
  status: QRCodeStatus;
  generatedAt: number;
  usedAt?: number;
  usedBy?: string;      // guest.id when scanned
  mode: QRGenerationMode;
  dotPattern: QRDotPattern;
  cornerFrame: QRCornerFrame;
  cornerDot: QRCornerDot;
  fgColor: string;
  bgColor: string;
}

// ─── Guest Fields (extended) ─────────────────────────────────────────────────
// qrSerial links a guest to a batch QR code
// (qrToken remains for backwards-compat with scanner)

// ─── Analytics ───────────────────────────────────────────────────────────────
export interface PlacementDataPoint {
  month: string;
  placed: number;
  registered: number;
}

export interface DashboardStats {
  totalEvents: number;
  totalGuests: number;
  checkedIn: number;
  pending: number;
}
