import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Sparkles, Camera, ChevronDown } from 'lucide-react';
import { StepIndicator } from '../components/appraise/StepIndicator';
import { UploadDropzone } from '../components/appraise/UploadDropzone';
import { Button } from '../components/ui/Button';
import { Input, Textarea, Label, Select } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { CATEGORIES } from '../data/mock';
import { valuateItem } from '../services/valuation.service';

const STEPS = ['Photos', 'Details', 'Condition', 'Analyzing'];

export default function AppraisePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [details, setDetails] = useState({ category: '', title: '', year: '', notes: '' });
  const [condition, setCondition] = useState({ grade: '', gradedBy: '', damage: 'none' });

  const canNext = [
    files.length > 0,
    !!details.category,
    true, // condition optional
  ][step];

  const submit = async () => {
    setStep(3);
    try {
      const valuation = await valuateItem({
        files,
        notes: details.notes,
        categoryHint: details.category,
      });
      // TODO: persist to backend
      // Pass through in-memory via sessionStorage for simplicity
      sessionStorage.setItem('lastValuation', JSON.stringify({ ...valuation, images: undefined }));
      navigate(`/valuation/${valuation.id}`);
    } catch (e) {
      setStep(2);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 lg:px-12 py-16" data-testid="appraise-page">
      <div className="text-center mb-4">
        <div className="text-[11px] uppercase tracking-widest text-ink-muted mb-2">Free AI appraisal</div>
        <h1 className="font-display text-3xl md:text-4xl tracking-tightest">Value your collectible</h1>
        <p className="text-sm text-ink-muted mt-3 max-w-lg mx-auto">
          Under a minute. No sign-up required. We will show our work.
        </p>
      </div>

      <div className="mt-12 mb-10 flex justify-center">
        <StepIndicator steps={STEPS} current={step} />
      </div>

      {step === 0 && (
        <div className="animate-fade-up" data-testid="step-photos">
          <UploadDropzone files={files} onChange={setFiles} />
          <p className="text-xs text-ink-muted text-center mt-6">
            Your photos are analyzed instantly and never shared without your permission.
          </p>
        </div>
      )}

      {step === 1 && (
        <div className="animate-fade-up space-y-6" data-testid="step-details">
          <div>
            <Label>Category</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setDetails((d) => ({ ...d, category: c.id }))}
                  className={
                    'px-3 py-3 rounded-lg text-sm text-left border transition-all ' +
                    (details.category === c.id
                      ? 'border-brand-blue bg-brand-blue/10 text-ink-text'
                      : 'border-ink-border bg-ink-surface text-ink-muted hover:text-ink-text hover:border-ink-muted/60')
                  }
                  data-testid={`category-option-${c.id}`}
                >
                  <div className="font-medium text-ink-text">{c.name}</div>
                  <div className="text-[11px] text-ink-muted mt-0.5">{c.tagline}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Title (optional)</Label>
              <Input
                placeholder="e.g. Charizard 1st Ed. Base Set"
                value={details.title}
                onChange={(e) => setDetails((d) => ({ ...d, title: e.target.value }))}
                data-testid="detail-title"
              />
            </div>
            <div>
              <Label>Year (optional)</Label>
              <Input
                type="number"
                placeholder="1999"
                value={details.year}
                onChange={(e) => setDetails((d) => ({ ...d, year: e.target.value }))}
                data-testid="detail-year"
              />
            </div>
          </div>

          <div>
            <Label>Notes for our AI curator (optional)</Label>
            <Textarea
              rows={4}
              placeholder="Anything special about provenance, damage, or history…"
              value={details.notes}
              onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))}
              data-testid="detail-notes"
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-up space-y-6" data-testid="step-condition">
          <div>
            <Label>Grade (if any)</Label>
            <Input
              placeholder="e.g. PSA 9, CGC 6.0, BGS 8.5"
              value={condition.grade}
              onChange={(e) => setCondition((c) => ({ ...c, grade: e.target.value }))}
              data-testid="condition-grade"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Graded by</Label>
              <div className="relative">
                <Select
                  value={condition.gradedBy}
                  onChange={(e) => setCondition((c) => ({ ...c, gradedBy: e.target.value }))}
                  data-testid="condition-graded-by"
                >
                  <option value="">Ungraded / self-assessed</option>
                  <option value="PSA">PSA</option>
                  <option value="CGC">CGC</option>
                  <option value="BGS">BGS</option>
                  <option value="PCGS">PCGS</option>
                  <option value="NGC">NGC</option>
                </Select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
              </div>
            </div>
            <div>
              <Label>Visible damage</Label>
              <div className="relative">
                <Select
                  value={condition.damage}
                  onChange={(e) => setCondition((c) => ({ ...c, damage: e.target.value }))}
                  data-testid="condition-damage"
                >
                  <option value="none">None</option>
                  <option value="minor">Minor (edges, small marks)</option>
                  <option value="moderate">Moderate (creases, scratches)</option>
                  <option value="major">Major (tears, restoration)</option>
                </Select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-ink-border bg-ink-surface flex items-start gap-3">
            <Sparkles size={14} className="text-brand-gold mt-0.5 shrink-0" />
            <div className="text-xs text-ink-muted leading-relaxed">
              Our AI will independently assess condition from your photographs. This form
              helps us calibrate the confidence score.
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in" data-testid="step-analyzing">
          <div className="relative rounded-2xl border border-ink-border bg-ink-surface p-10 md:p-14 overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-gold/10" />
            <div className="relative flex flex-col items-center text-center">
              <div className="relative h-20 w-20">
                <div className="absolute inset-0 rounded-full border border-brand-blue/40 animate-ping" />
                <div className="absolute inset-2 rounded-full border border-brand-blue/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={22} className="text-brand-blue" />
                </div>
              </div>
              <h2 className="font-display text-2xl tracking-tight mt-8">Analyzing your item…</h2>
              <p className="text-sm text-ink-muted mt-3 max-w-md">
                Our AI curator is examining photographs, matching against recent verified
                sales, and calibrating confidence.
              </p>
              <ul className="mt-8 space-y-2 text-xs text-ink-muted">
                <li className="flex items-center gap-2 justify-center"><Camera size={12}/> Photos analyzed</li>
                <li className="flex items-center gap-2 justify-center"><Sparkles size={12}/> Matching comparables</li>
                <li className="flex items-center gap-2 justify-center opacity-60"><Sparkles size={12}/> Estimating range</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {step < 3 && (
        <div className="flex items-center justify-between mt-12">
          {step > 0 ? (
            <Button variant="ghost" leftIcon={<ArrowLeft size={14} />} onClick={() => setStep((s) => s - 1)} data-testid="step-back">
              Back
            </Button>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-3">
            {step === 0 && files.length > 0 && (
              <Badge tone="muted">{files.length} photo{files.length > 1 ? 's' : ''}</Badge>
            )}
            {step < 2 ? (
              <Button
                disabled={!canNext}
                onClick={() => setStep((s) => s + 1)}
                rightIcon={<ArrowRight size={14} />}
                data-testid="step-next"
              >
                Continue
              </Button>
            ) : (
              <Button onClick={submit} rightIcon={<Sparkles size={14} />} data-testid="submit-appraisal">
                Get valuation
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
