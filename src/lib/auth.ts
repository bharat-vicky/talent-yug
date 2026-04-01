import { User, Session, UserRole } from "@/types";
import { KEYS, readJson, writeJson, removeKey } from "./storage";
import { hashPassword, isValidEmail, generateId } from "./utils";

// ─── User CRUD ────────────────────────────────────────────────────────────
export function getUsers(): User[] {
  const data = readJson<User[]>(KEYS.USERS, []);
  return Array.isArray(data) ? data : [];
}

function saveUsers(users: User[]): void {
  writeJson(KEYS.USERS, users);
}

// ─── Session ──────────────────────────────────────────────────────────────
export function getSession(): Session | null {
  return readJson<Session | null>(KEYS.SESSION, null);
}

export function setSession(user: User | Session): void {
  const session: Session = {
    name: user.name ?? user.email ?? "User",
    email: user.email,
    role: (user.role as UserRole) ?? "guest",
    provider: user.provider ?? "local",
  };
  writeJson(KEYS.SESSION, session);
}

export function clearSession(): void {
  removeKey(KEYS.SESSION);
}

// ─── Auth Actions ─────────────────────────────────────────────────────────
export interface AuthResult {
  success: boolean;
  error?: string;
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: UserRole
): Promise<AuthResult> {
  if (!name || !email || !password || !role) {
    return { success: false, error: "All fields are required." };
  }
  if (!isValidEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }
  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters." };
  }

  const users = getUsers();
  const normalizedEmail = email.toLowerCase().trim();

  if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
    return {
      success: false,
      error: "Email already registered. Please log in instead.",
    };
  }

  const passwordHash = await hashPassword(password);
  const newUser: User = {
    id: generateId(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role,
    provider: "local",
    createdAt: Date.now(),
  };

  saveUsers([...users, newUser]);
  return { success: true };
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResult> {
  if (!email || !password) {
    return { success: false, error: "Enter your email and password." };
  }

  const users = getUsers();
  const normalizedEmail = email.toLowerCase().trim();
  const user = users.find((u) => u.email === normalizedEmail);

  if (!user) {
    return {
      success: false,
      error: "No account found with this email. Please register first.",
    };
  }

  const passwordHash = await hashPassword(password);

  // Support both hashed and legacy plain-text passwords
  if (user.passwordHash !== passwordHash) {
    if (user.passwordHash === password) {
      // Upgrade plain-text to hashed
      const updated = users.map((u) =>
        u.email === normalizedEmail ? { ...u, passwordHash } : u
      );
      saveUsers(updated);
    } else {
      return {
        success: false,
        error: "Invalid credentials. Please check your email and password.",
      };
    }
  }

  setSession(user);
  return { success: true };
}

export async function resetPassword(
  email: string,
  newPassword: string,
  confirmPassword: string
): Promise<AuthResult> {
  if (!email || !newPassword || !confirmPassword) {
    return { success: false, error: "Please fill in all fields." };
  }
  if (!isValidEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }
  if (newPassword.length < 6) {
    return {
      success: false,
      error: "New password must be at least 6 characters.",
    };
  }
  if (newPassword !== confirmPassword) {
    return { success: false, error: "Passwords do not match." };
  }

  const users = getUsers();
  const idx = users.findIndex(
    (u) => u.email === email.toLowerCase().trim()
  );

  if (idx === -1) {
    return { success: false, error: "No account found with that email." };
  }

  const passwordHash = await hashPassword(newPassword);
  users[idx] = { ...users[idx], passwordHash };
  saveUsers(users);
  return { success: true };
}

export function loginWithGoogle(): void {
  const users = getUsers();
  const mockUser: User = {
    id: generateId(),
    name: "Google User",
    email: "user@gmail.com",
    role: "student",
    provider: "google",
    createdAt: Date.now(),
  };

  if (!users.some((u) => u.email === mockUser.email)) {
    saveUsers([...users, mockUser]);
  }

  setSession(mockUser);
}
