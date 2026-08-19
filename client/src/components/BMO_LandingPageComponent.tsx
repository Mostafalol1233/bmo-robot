import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import adventureBackground from '@assets/1_1757441992148.jfif';

interface BMO_LandingPageComponentProps {
  onStart: () => void;
  isScreenZooming?: boolean;
}

type ScreenMessage = 'none' | 'away' | 'dance' | 'skate';

const cornerFaces = Array.from({ length: 8 });
const buttonEdges = Array.from({ length: 20 });

export default function BMO_LandingPageComponent({
  onStart,
  isScreenZooming = false,
}: BMO_LandingPageComponentProps) {
  const [rotation, setRotation] = useState(28);
  const [message, setMessage] = useState<ScreenMessage>('none');
  const [isDragging, setIsDragging] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const dragRef = useRef({ startX: 0, startRotation: 28 });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsBlinking(true);
      window.setTimeout(() => setIsBlinking(false), 180);
    }, 3600);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (message !== 'away') return;
    const timeout = window.setTimeout(() => setMessage('none'), 5000);
    return () => window.clearTimeout(timeout);
  }, [message]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) return;
    dragRef.current = { startX: event.clientX, startRotation: rotation };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const delta = event.clientX - dragRef.current.startX;
    setRotation(dragRef.current.startRotation + delta * 0.55);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  const handleDpad = () => setMessage(message === 'away' ? 'none' : 'away');
  const handleSmallButton = () => setMessage(message === 'skate' ? 'none' : 'skate');
  const handleBigButton = () => {
    setMessage('none');
    onStart();
  };

  return (
    <main
      className="zip-bmo-page"
      style={{ '--zip-bmo-background': `url(${adventureBackground})` } as CSSProperties}
    >
      <div className="zip-bmo-controls">
        <button type="button" onClick={() => setRotation(28)}>
          RESET ROTATION
        </button>
      </div>
      <div className="zip-bmo-instruction">
        <em>{isDragging ? 'ALGEBRAIC!' : 'CLICK & DRAG LEFT OR RIGHT TO ROTATE'}</em>
      </div>

      <div
        className="zip-bmo-stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-testid="bmo-landing-component"
      >
        <div
          className={`zip-bmo-positioning ${isScreenZooming ? 'zip-bmo-positioning--zooming' : ''}`}
          style={{ transform: `rotateY(${rotation}deg) rotateX(2deg)` }}
        >
          <div className="zip-bmo">
            <figure className="zip-bmo-back" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => <span className="zip-bmo-slit" key={index} />)}
              <div className="zip-bmo-backpanel">
                {Array.from({ length: 4 }).map((_, index) => <span className="zip-bmo-screw" key={index} />)}
              </div>
              <div className="zip-bmo-tapeslot" />
            </figure>

            <figure className="zip-bmo-front">
              <button
                type="button"
                className={`zip-bmo-face ${message !== 'none' ? 'zip-bmo-face--message' : ''}`}
                onClick={handleBigButton}
                aria-label="Start BMO portfolio"
              >
                {message === 'away' && <strong>BACK<br />IN<br />5 MINUTES</strong>}
                {message === 'dance' && <strong>WOOHOO!</strong>}
                {message === 'skate' && <strong>LET&apos;S GO!</strong>}
                {message === 'none' && (
                  <>
                    <span className={`zip-bmo-eye zip-bmo-eye--left ${isBlinking ? 'zip-bmo-eye--blink' : ''}`} />
                    <span className={`zip-bmo-eye zip-bmo-eye--right ${isBlinking ? 'zip-bmo-eye--blink' : ''}`} />
                    <span className="zip-bmo-smile" />
                  </>
                )}
              </button>

              <div className="zip-bmo-frontbuttons-flat" aria-hidden="true">
                <span className="zip-bmo-slot" />
                <span className="zip-bmo-port zip-bmo-port--left" />
                <span className="zip-bmo-port zip-bmo-port--right" />
                <span className="zip-bmo-port zip-bmo-port--tiny" />
              </div>

              <div className="zip-bmo-frontbuttons">
                <button type="button" className="zip-bmo-dpad" onClick={handleDpad} aria-label="Show BMO message">
                  {Array.from({ length: 5 }).map((_, index) => <span className="zip-bmo-dpad-square" key={index} />)}
                </button>
                <button type="button" className="zip-bmo-circle zip-bmo-circle--big" onClick={handleBigButton} aria-label="Start portfolio">
                  <span className="zip-bmo-button-edges">
                    {buttonEdges.map((_, index) => <i key={index} style={{ transform: `rotate(${index * 18}deg)` }} />)}
                  </span>
                </button>
                <button type="button" className="zip-bmo-circle zip-bmo-circle--small" onClick={handleSmallButton} aria-label="Show BMO skate message">
                  <span className="zip-bmo-button-edges">
                    {Array.from({ length: 16 }).map((_, index) => <i key={index} style={{ transform: `rotate(${index * 22.5}deg)` }} />)}
                  </span>
                </button>
                <button type="button" className="zip-bmo-triangle" onClick={() => setMessage('dance')} aria-label="Show BMO celebration">
                  <span />
                  <span />
                </button>
              </div>
            </figure>

            <figure className="zip-bmo-side zip-bmo-side--left">
              <div className="zip-bmo-speaker"><i /><i /><i /><i /><i /><i /><i /></div>
              <h1>BMO</h1>
              <div className="zip-bmo-arm" />
            </figure>
            <figure className="zip-bmo-side zip-bmo-side--right" aria-hidden="true">
              <div className="zip-bmo-speaker"><i /><i /><i /><i /><i /><i /><i /></div>
              <h1>BMO</h1>
              <div className="zip-bmo-arm" />
            </figure>
            <figure className="zip-bmo-top" aria-hidden="true" />
            <figure className="zip-bmo-bottom" aria-hidden="true">
              <div className="zip-bmo-leg" />
              <div className="zip-bmo-leg zip-bmo-leg--left" />
            </figure>

            <div className="zip-bmo-corner zip-bmo-corner--tl" aria-hidden="true">
              {cornerFaces.map((_, index) => <i key={index} />)}
            </div>
            <div className="zip-bmo-corner zip-bmo-corner--tr" aria-hidden="true">
              {cornerFaces.map((_, index) => <i key={index} />)}
            </div>
            <div className="zip-bmo-corner zip-bmo-corner--bl" aria-hidden="true">
              {cornerFaces.map((_, index) => <i key={index} />)}
            </div>
            <div className="zip-bmo-corner zip-bmo-corner--br" aria-hidden="true">
              {cornerFaces.map((_, index) => <i key={index} />)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}