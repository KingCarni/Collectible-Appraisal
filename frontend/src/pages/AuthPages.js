import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input, Label } from '../components/ui/Input';
import { signIn, signUp } from '../services/auth.service';

function AuthShell({ children, title, subtitle }) {
  return (
    <div className="min-h-[80vh] grid lg:grid-cols-2 gap-0" data-testid="auth-page">
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1600&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-bg via-ink-bg/40 to-transparent" />
        <div className="relative p-14 h-full flex flex-col justify-between">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-blue text-white">
              <Sparkles size={14} />
            </span>
            <span className="font-display text-[15px] tracking-tight">Collectible Appraisal</span>
          </Link>
          <div className="max-w-md">
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              A marketplace worthy of what you own.
            </h2>
            <p className="text-sm text-ink-muted mt-4 leading-relaxed">
              Join 40,000 collectors who trust our AI curator and human review process.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <h1 className="font-display text-3xl tracking-tight">{title}</h1>
            <p className="text-sm text-ink-muted mt-2">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function SignInPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: 'alex@collectible.example', password: 'demo123' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(form);
      nav('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to your account.">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            leftIcon={<Mail size={14} />}
            data-testid="signin-email"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="block text-xs uppercase tracking-widest text-ink-muted font-medium">Password</span>
            <a href="#" className="text-xs text-brand-blue hover:underline">Forgot?</a>
          </div>
          <Input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            leftIcon={<Lock size={14} />}
            data-testid="signin-password"
          />
        </div>
        {error && <div className="text-xs text-status-error">{error}</div>}
        <Button type="submit" className="w-full" loading={loading} rightIcon={<ArrowRight size={14} />} data-testid="signin-submit">
          Sign in
        </Button>
      </form>
      <p className="text-sm text-ink-muted mt-8 text-center">
        No account? <Link to="/signup" className="text-brand-blue hover:underline">Create one</Link>
      </p>
    </AuthShell>
  );
}

export function SignUpPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signUp(form);
      nav('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Create your account" subtitle="Free to appraise. Free to browse.">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label>Full name</Label>
          <Input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            leftIcon={<User size={14} />}
            data-testid="signup-name"
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            leftIcon={<Mail size={14} />}
            data-testid="signup-email"
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            leftIcon={<Lock size={14} />}
            data-testid="signup-password"
          />
        </div>
        {error && <div className="text-xs text-status-error">{error}</div>}
        <Button type="submit" className="w-full" loading={loading} rightIcon={<ArrowRight size={14} />} data-testid="signup-submit">
          Create account
        </Button>
        <p className="text-[11px] text-ink-muted text-center pt-2">
          By continuing you agree to our Terms and Privacy Policy.
        </p>
      </form>
      <p className="text-sm text-ink-muted mt-8 text-center">
        Already have an account? <Link to="/signin" className="text-brand-blue hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}
