"use client";

import Link from "next/link";
import { ArrowLeft, Volume2, Vibrate, Zap, Save } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ScannerSettings } from "@/types";
import { KEYS } from "@/lib/storage";
import { useState } from "react";
import { cn } from "@/lib/utils";

const defaultSettings: ScannerSettings = {
  autoCheckIn: true,
  soundEnabled: true,
  vibrationEnabled: false,
  successSound: "beep",
  errorSound: "buzz",
};

function Toggle({
  checked,
  onChange,
  label,
  description,
  icon,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 text-gray-400">{icon}</div>
        )}
        <div>
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0",
          checked ? "bg-primary" : "bg-gray-200"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200",
            checked && "translate-x-5"
          )}
        />
      </button>
    </div>
  );
}

export default function ScannerSettingsPage() {
  const [settings, setSettings] = useLocalStorage<ScannerSettings>(
    KEYS.SCANNER_SETTINGS,
    defaultSettings
  );
  const [saved, setSaved] = useState(false);

  function update(key: keyof ScannerSettings, value: unknown) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/scanner">
          <button className="p-2 rounded-xl hover:bg-gray-100 transition text-gray-500">
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-primary">Scanner Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Configure how the scanner behaves during check-in
          </p>
        </div>
      </div>

      <div className="max-w-xl space-y-5">
        {/* Behaviour */}
        <Card>
          <h2 className="font-semibold text-gray-900 mb-1">Behaviour</h2>
          <p className="text-xs text-gray-500 mb-3">
            Configure automatic actions when a QR code is scanned
          </p>
          <Toggle
            checked={settings.autoCheckIn}
            onChange={(v) => update("autoCheckIn", v)}
            label="Auto Check-in"
            description="Automatically mark guests as checked-in on scan (no confirmation required)"
            icon={<Zap size={16} />}
          />
        </Card>

        {/* Feedback */}
        <Card>
          <h2 className="font-semibold text-gray-900 mb-1">Feedback</h2>
          <p className="text-xs text-gray-500 mb-3">
            Control sound and haptic feedback during scanning
          </p>
          <Toggle
            checked={settings.soundEnabled}
            onChange={(v) => update("soundEnabled", v)}
            label="Sound Feedback"
            description="Play a sound when a QR code is successfully or unsuccessfully scanned"
            icon={<Volume2 size={16} />}
          />
          <Toggle
            checked={settings.vibrationEnabled}
            onChange={(v) => update("vibrationEnabled", v)}
            label="Vibration Feedback"
            description="Vibrate the device on scan (only works on supported mobile devices)"
            icon={<Vibrate size={16} />}
          />
        </Card>

        {/* Sound options */}
        {settings.soundEnabled && (
          <Card>
            <h2 className="font-semibold text-gray-900 mb-3">Sound Options</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Success Sound
                </label>
                <select
                  value={settings.successSound}
                  onChange={(e) => update("successSound", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                >
                  <option value="beep">Beep</option>
                  <option value="chime">Chime</option>
                  <option value="ding">Ding</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Error Sound
                </label>
                <select
                  value={settings.errorSound}
                  onChange={(e) => update("errorSound", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                >
                  <option value="buzz">Buzz</option>
                  <option value="error">Error Tone</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          </Card>
        )}

        <Button onClick={handleSave} size="lg">
          <Save size={16} />
          {saved ? "Settings Saved!" : "Save Settings"}
        </Button>
      </div>
    </>
  );
}
