import { useState } from 'react';

interface BMO3DCharacterProps {
  compact?: boolean;
  onAction?: (action: string) => void;
}

export default function BMO3DCharacter({ compact = false, onAction }: BMO3DCharacterProps) {
  const [mood, setMood] = useState<'happy' | 'surprised' | 'sleepy'>('happy');
  const [isPressed, setIsPressed] = useState(false);

  const trigger = (action: string, nextMood: 'happy' | 'surprised' | 'sleepy' = 'happy') => {
    setMood(nextMood);
    setIsPressed(true);
    window.setTimeout(() => setIsPressed(false), 180);
    onAction?.(action);
  };

  return (
    <section className={`bmo-3d-stage ${compact ? 'bmo-3d-stage-compact' : ''}`} aria-label="شخصية BMO ثلاثية الأبعاد">
      <div className="bmo-stage-glow" aria-hidden="true" />
      <div className="bmo-stage-label">
        <span className="bmo-stage-dot" />
        <span>وحدة BMO النشطة</span>
        <span className="bmo-stage-code">03D / ONLINE</span>
      </div>

      <div className={`bmo-3d-character mood-${mood} ${isPressed ? 'is-pressed' : ''}`}>
        <div className="bmo-shadow" aria-hidden="true" />
        <div className="bmo-arm bmo-arm-left" aria-hidden="true"><span className="bmo-hand"><i /><i /><i /></span></div>
        <div className="bmo-arm bmo-arm-right" aria-hidden="true"><span className="bmo-hand"><i /><i /><i /></span></div>
        <div className="bmo-leg bmo-leg-left" aria-hidden="true" />
        <div className="bmo-leg bmo-leg-right" aria-hidden="true" />

        <div className="bmo-body">
          <div className="bmo-side-panel bmo-side-panel-left" aria-hidden="true"><span /><span /><span /><b>BMO</b></div>
          <div className="bmo-side-panel bmo-side-panel-right" aria-hidden="true"><b>O</b><span /><span /></div>
          <div className="bmo-top-highlight" aria-hidden="true" />

          <div className="bmo-screen-bezel">
            <div className="bmo-screen">
              <div className="bmo-screen-reflection" aria-hidden="true" />
              <div className="bmo-eyes" aria-hidden="true">
                <span className="bmo-eye"><i /></span>
                <span className="bmo-eye"><i /></span>
              </div>
              <div className="bmo-mouth" aria-hidden="true"><span /></div>
              <span className="bmo-screen-status">BMO</span>
            </div>
          </div>

          <div className="bmo-floppy-slot" aria-label="فتحة القرص المرن"><span /></div>
          <button className="bmo-action-button bmo-action-blue" aria-label="تغيير تعبير BMO" onClick={() => trigger('تعبير مندهش', 'surprised')} />
          <button className="bmo-action-button bmo-action-green" aria-label="إيقاظ BMO" onClick={() => trigger('إيقاظ BMO', 'happy')} />
          <button className="bmo-action-button bmo-action-red" aria-label="وضع السكون" onClick={() => trigger('وضع السكون', 'sleepy')} />
          <button className="bmo-dpad" aria-label="لوحة الاتجاهات" onClick={() => trigger('لوحة الاتجاهات', 'happy')}>
            <span className="bmo-dpad-horizontal" /><span className="bmo-dpad-vertical" />
          </button>
          <div className="bmo-controller-ports" aria-hidden="true"><span /><span /></div>
          <div className="bmo-speaker-grille" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
          <div className="bmo-led" aria-hidden="true" />
        </div>
      </div>

      <div className="bmo-3d-caption">
        <strong>{mood === 'surprised' ? 'أوه!' : mood === 'sleepy' ? 'تصبح على خير' : 'مرحباً، أنا BMO'}</strong>
        <span>اضغط الأزرار لتغيير تعبير الشخصية</span>
      </div>
    </section>
  );
}
