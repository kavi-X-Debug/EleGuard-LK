import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  Mail,
  Phone,
  UserCircle2,
  Languages,
  MapPinned,
  Home,
  Sprout,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { authApi } from "@/lib/api";
import LocationPicker, { type PickedLocation } from "./LocationPicker";

/* ---------- shared helpers ---------- */

const inputClass =
  "w-full rounded-xl border border-input bg-card/70 py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

const selectClass =
  "w-full appearance-none rounded-xl border border-input bg-card/70 py-2.5 pl-10 pr-8 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
      <AlertCircle className="h-3 w-3" /> {msg}
    </p>
  );
}

/* ---------- LOGIN ---------- */

function LoginForm() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState<{ ok: boolean; text: string } | null>(
    null
  );
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>(
    {}
  );
  const [showForgot, setShowForgot] = useState(false);

  if (showForgot) {
    return <ForgotPasswordFlow onBack={() => setShowForgot(false)} />;
  }

  const validate = () => {
    const e: typeof errors = {};
    if (!form.username.trim()) e.username = "Username is required";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerMsg(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await authApi.login(form);
      if (data.error) {
        setServerMsg({ ok: false, text: data.message || "Login failed" });
      } else {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data));
        setServerMsg({ ok: true, text: data.message || "Login success" });
        // Redirect after success — adjust route as needed
        setTimeout(() => navigate({ to: "/" }), 600);
      }
    } catch (err: any) {
      setServerMsg({
        ok: false,
        text:
          err?.response?.data?.message ||
          "Unable to reach server. Check your connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <label className="mb-1 block text-xs font-medium text-foreground/80">
          Username
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            autoComplete="username"
            className={inputClass}
            placeholder="your.username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>
        <FieldError msg={errors.username} />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-foreground/80">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showPwd ? "text" : "password"}
            autoComplete="current-password"
            className={inputClass + " pr-10"}
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <FieldError msg={errors.password} />
      </div>

      {serverMsg && (
        <div
          className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${
            serverMsg.ok
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          {serverMsg.ok ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <span>{serverMsg.text}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group relative w-full overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition active:scale-[0.98] disabled:opacity-60"
        style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-elegant)" }}
      >
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Signing in…" : "Login"}
        </span>
      </button>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowForgot(true)}
          className="text-xs font-medium text-primary transition hover:underline"
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
}

/* ---------- FORGOT PASSWORD ---------- */

type ForgotStep = "email" | "otp" | "reset" | "done";

function ForgotPasswordFlow({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<ForgotStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState<string | undefined>(undefined);
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const sendEmail = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError(null);
    setInfo(null);
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setLoading(true);
    try {
      const { data } = await authApi.forgotPassword({ email });
      if (data?.error) {
        setError(data.message || "Could not send reset code");
      } else {
        setInfo(data?.message || `We've sent a 6-digit code to ${email}`);
        setStep("otp");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Unable to reach server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError(null);
    if (!/^\d{4,8}$/.test(otp)) {
      setError("Enter the code from your email");
      return;
    }
    setLoading(true);
    try {
      const { data } = await authApi.verifyOtp({ email, otp });
      if (data?.error) {
        setError(data.message || "Invalid or expired code");
      } else {
        setResetToken(data?.reset_token);
        setInfo(null);
        setStep("reset");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Verification failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const submitReset = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError(null);
    if (pwd.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (pwd !== confirmPwd) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { data } = await authApi.resetPassword({
        email,
        otp,
        reset_token: resetToken,
        password: pwd,
      });
      if (data?.error) {
        setError(data.message || "Could not reset password");
      } else {
        setStep("done");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Could not reset password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      await authApi.forgotPassword({ email });
      setInfo(`A new code was sent to ${email}`);
    } catch {
      setError("Couldn't resend the code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const stepIndex = step === "email" ? 1 : step === "otp" ? 2 : 3;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to login
      </button>

      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground shadow"
          style={{ background: "var(--gradient-brand)" }}
        >
          {step === "done" ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : step === "reset" ? (
            <KeyRound className="h-5 w-5" />
          ) : (
            <ShieldCheck className="h-5 w-5" />
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {step === "email" && "Reset your password"}
            {step === "otp" && "Enter verification code"}
            {step === "reset" && "Choose a new password"}
            {step === "done" && "Password updated"}
          </h3>
          {step !== "done" && (
            <p className="text-xs text-muted-foreground">Step {stepIndex} of 3</p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {step !== "done" && (
        <div className="mb-5 flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i <= stepIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      )}

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      {info && !error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
          <CheckCircle2 className="h-4 w-4" />
          <span>{info}</span>
        </div>
      )}

      {step === "email" && (
        <form onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground/80">
              Email address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              We'll send a 6-digit verification code to this address.
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="relative w-full overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition active:scale-[0.98] disabled:opacity-60"
            style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-elegant)" }}
          >
            <span className="inline-flex items-center justify-center gap-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Sending…" : "Send reset code"}
            </span>
          </button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={verifyOtp} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground/80">
              6-digit code
            </label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={8}
              className="w-full rounded-xl border border-input bg-card/70 py-3 text-center text-lg font-semibold tracking-[0.5em] text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Sent to <span className="font-medium text-foreground">{email}</span>
              </span>
              <button
                type="button"
                onClick={resend}
                disabled={loading}
                className="font-medium text-primary transition hover:underline disabled:opacity-60"
              >
                Resend
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="relative w-full overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition active:scale-[0.98] disabled:opacity-60"
            style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-elegant)" }}
          >
            <span className="inline-flex items-center justify-center gap-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Verifying…" : "Verify code"}
            </span>
          </button>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={submitReset} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground/80">
              New password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPwd ? "text" : "password"}
                autoComplete="new-password"
                className={inputClass + " pr-10"}
                placeholder="At least 6 characters"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground/80">
              Confirm new password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPwd ? "text" : "password"}
                autoComplete="new-password"
                className={inputClass}
                placeholder="Repeat password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="relative w-full overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition active:scale-[0.98] disabled:opacity-60"
            style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-elegant)" }}
          >
            <span className="inline-flex items-center justify-center gap-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Updating…" : "Update password"}
            </span>
          </button>
        </form>
      )}

      {step === "done" && (
        <div className="space-y-4 text-center">
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-primary-foreground shadow"
            style={{ background: "var(--gradient-brand)" }}
          >
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <p className="text-sm text-muted-foreground">
            Your password has been updated. You can now sign in with your new password.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="relative w-full overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition active:scale-[0.98]"
            style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-elegant)" }}
          >
            Continue to login
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- REGISTER ---------- */

const LANGUAGES = ["Sinhala", "Tamil", "English"];
const PROVINCES = [
  "Western",
  "Central",
  "Southern",
  "Northern",
  "Eastern",
  "North Western",
  "North Central",
  "Uva",
  "Sabaragamuwa",
];
const CROPS = [
  "Paddy",
  "Banana",
  "Corn",
  "Coconut",
  "Vegetables",
  "Fruits",
  "Tea",
  "Rubber",
];
const LAND_TYPES = ["Paddy Field", "Land"];

const initialRegister = {
  fullName: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  language: "",
  province: "",
  village: "",
  landType: "",
};

type RegisterFormData = typeof initialRegister;

function RegisterField({
  name,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  autoComplete,
  value,
  onChange,
  error,
}: {
  name: keyof RegisterFormData;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-foreground/80">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type={type}
          autoComplete={autoComplete}
          className={inputClass}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <FieldError msg={error} />
    </div>
  );
}

function RegisterForm() {
  const [form, setForm] = useState(initialRegister);
  const [crops, setCrops] = useState<string[]>([]);
  const [location, setLocation] = useState<PickedLocation | null>(null);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMsg, setServerMsg] = useState<{ ok: boolean; text: string } | null>(
    null
  );

  const update = <K extends keyof typeof form>(k: K, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleCrop = (c: string) =>
    setCrops((curr) => (curr.includes(c) ? curr.filter((x) => x !== c) : [...curr, c]));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.username.trim()) e.username = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
    if (!/^[+\d\s-]{7,}$/.test(form.phone)) e.phone = "Invalid phone";
    if (form.password.length < 6) e.password = "Min 6 characters";
    if (!form.language) e.language = "Select a language";
    if (!form.province) e.province = "Select a province";
    if (!location) e.location = "Pick your location on the map";
    if (!form.village.trim()) e.village = "Required";
    if (crops.length === 0) e.crops = "Select at least one crop";
    if (!form.landType) e.landType = "Select land type";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleClear = () => {
    setForm(initialRegister);
    setCrops([]);
    setLocation(null);
    setErrors({});
    setServerMsg(null);
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerMsg(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        ...form,
        crops,
        latitude: location?.lat,
        longitude: location?.lng,
        address: location?.address,
      };
      const { data } = await authApi.register(payload);
      setServerMsg({
        ok: true,
        text: (data as any)?.message || "Registration successful! You can now log in.",
      });
      handleClear();
    } catch (err: any) {
      setServerMsg({
        ok: false,
        text:
          err?.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const Field = ({
    name,
    label,
    icon: Icon,
    type = "text",
    placeholder,
    autoComplete,
  }: {
    name: keyof typeof form;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    type?: string;
    placeholder?: string;
    autoComplete?: string;
  }) => (
    <div>
      <label className="mb-1 block text-xs font-medium text-foreground/80">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type={type}
          autoComplete={autoComplete}
          className={inputClass}
          placeholder={placeholder}
          value={form[name]}
          onChange={(e) => update(name, e.target.value)}
        />
      </div>
      <FieldError msg={errors[name]} />
    </div>
  );

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <RegisterField
          name="fullName"
          label="Full Name"
          icon={UserCircle2}
          placeholder="Kamal Perera"
          value={form.fullName}
          onChange={(value) => update("fullName", value)}
          error={errors.fullName}
        />
        <RegisterField
          name="username"
          label="Username"
          icon={User}
          placeholder="kamal.p"
          autoComplete="username"
          value={form.username}
          onChange={(value) => update("username", value)}
          error={errors.username}
        />
        <RegisterField
          name="email"
          label="Email"
          icon={Mail}
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={(value) => update("email", value)}
          error={errors.email}
        />
        <RegisterField
          name="phone"
          label="Phone Number"
          icon={Phone}
          type="tel"
          placeholder="+94 77 123 4567"
          autoComplete="tel"
          value={form.phone}
          onChange={(value) => update("phone", value)}
          error={errors.phone}
        />
      </div>

      {/* Password */}
      <div>
        <label className="mb-1 block text-xs font-medium text-foreground/80">Password</label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type={showPwd ? "text" : "password"}
            autoComplete="new-password"
            className={inputClass + " pr-10"}
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <FieldError msg={errors.password} />
      </div>

      {/* Language + Province */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-foreground/80">Language</label>
          <div className="relative">
            <Languages className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              className={selectClass}
              value={form.language}
              onChange={(e) => update("language", e.target.value)}
            >
              <option value="">Select language</option>
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <FieldError msg={errors.language} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-foreground/80">Province</label>
          <div className="relative">
            <MapPinned className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              className={selectClass}
              value={form.province}
              onChange={(e) => update("province", e.target.value)}
            >
              <option value="">Select province</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <FieldError msg={errors.province} />
        </div>
      </div>

      {/* Map */}
      <div>
        <label className="mb-1 block text-xs font-medium text-foreground/80">
          Exact Location (click on the map)
        </label>
        <LocationPicker value={location} onChange={setLocation} />
        <FieldError msg={errors.location} />
      </div>

      {/* Village + Land Type */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <RegisterField
          name="village"
          label="Village"
          icon={Home}
          placeholder="Walapane"
          value={form.village}
          onChange={(value) => update("village", value)}
          error={errors.village}
        />
        <div>
          <label className="mb-1 block text-xs font-medium text-foreground/80">Type of Land</label>
          <div className="relative">
            <Sprout className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              className={selectClass}
              value={form.landType}
              onChange={(e) => update("landType", e.target.value)}
            >
              <option value="">Select land type</option>
              {LAND_TYPES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <FieldError msg={errors.landType} />
        </div>
      </div>

      {/* Crops multi-select chips */}
      <div>
        <label className="mb-2 block text-xs font-medium text-foreground/80">Crops</label>
        <div className="flex flex-wrap gap-2">
          {CROPS.map((c) => {
            const active = crops.includes(c);
            return (
              <button
                type="button"
                key={c}
                onClick={() => toggleCrop(c)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition active:scale-95 ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow"
                    : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
        <FieldError msg={errors.crops} />
      </div>

      {serverMsg && (
        <div
          className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${
            serverMsg.ok
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          {serverMsg.ok ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <span>{serverMsg.text}</span>
        </div>
      )}

      <div className="flex flex-col gap-2 pt-1 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition active:scale-[0.98] disabled:opacity-60"
          style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-elegant)" }}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Creating account…" : "Register"}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted active:scale-[0.98]"
        >
          Clear
        </button>
      </div>
    </form>
  );
}

/* ---------- AuthCard with tabs ---------- */

export default function AuthCard() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <div className="w-full">
      {/* Tab switcher */}
      <div className="relative mb-6 grid grid-cols-2 rounded-2xl border border-border bg-muted/40 p-1">
        <span
          className="absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-xl shadow-sm transition-all duration-300 ease-out"
          style={{
            background: "var(--gradient-brand)",
            transform: tab === "login" ? "translateX(0%)" : "translateX(100%)",
            left: "0.25rem",
          }}
          aria-hidden
        />
        {(["login", "register"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`relative z-10 rounded-xl py-2 text-sm font-semibold capitalize transition-colors ${
              tab === t ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div key={tab}>{tab === "login" ? <LoginForm /> : <RegisterForm />}</div>
    </div>
  );
}