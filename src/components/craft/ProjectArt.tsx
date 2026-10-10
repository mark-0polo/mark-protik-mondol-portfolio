import {
  BrainCircuit,
  ScanText,
  LayoutDashboard,
  Sparkles,
  Leaf,
  Languages,
  ScanLine,
} from "lucide-react";
export function ProjectGlyph({ index }: { index: number }) {
  const Icon = [
    BrainCircuit,
    ScanText,
    LayoutDashboard,
    Sparkles,
    Leaf,
    Languages,
    ScanLine,
  ][index];
  return <Icon size={36} strokeWidth={1.4} aria-hidden="true" />;
}
export function ProjectArt({ index }: { index: number }) {
  return (
    <div className={`art-window art-${index}`} aria-hidden="true">
      <div className="art-toolbar">
        <span />
        <span />
        <span />
        <small>
          {
            [
              "NEURAL ARCHITECTURE",
              "DOCUMENT INTELLIGENCE",
              "ORGANET / WORKSPACE",
              "EID / CREATIVE STUDIO",
              "COMPUTE / ENERGY STUDY",
              "BENGALI / TYPE VISION",
              "HARDWARE / DETECTION",
            ][index]
          }
        </small>
        <b>◦ ◦ ◦</b>
      </div>
      <div className="art-canvas">
        {index === 0 && (
          <>
            <svg viewBox="0 0 400 220" className="neural-art">
              {[0, 1, 2, 3, 4].flatMap((col) =>
                [0, 1, 2, 3].map((row) => (
                  <g key={`${col}-${row}`}>
                    {col < 4 &&
                      [0, 1, 2, 3].map((next) => (
                        <path
                          key={next}
                          d={`M${55 + col * 72} ${42 + row * 45} L${127 + col * 72} ${42 + next * 45}`}
                          stroke="#f38b45"
                          opacity={next === row ? 0.8 : 0.12}
                        />
                      ))}
                    <circle
                      cx={55 + col * 72}
                      cy={42 + row * 45}
                      r={col === 2 ? 9 : 5}
                      fill={col === 2 ? "#f38b45" : "#4c2c19"}
                      stroke="#ffb17a"
                      strokeWidth="1"
                    />
                  </g>
                )),
              )}
              <path d="M30 206h340" stroke="#f38b45" opacity=".2" />
            </svg>
            <div className="art-bottom">
              <span>MAMBA × KAN</span>
              <span>ENCODER → SEGMENTATION</span>
            </div>
          </>
        )}
        {index === 1 && (
          <>
            <div className="document-paper">
              <div className="doc-region doc-title">DOCUMENT / 001</div>
              <div className="doc-columns">
                <div>
                  <div className="doc-region doc-lines">
                    {Array.from({ length: 5 }, (_, i) => (
                      <i key={i} />
                    ))}
                  </div>
                  <div className="doc-region doc-figure">
                    <span>Aa</span>
                  </div>
                </div>
                <div className="doc-region doc-lines">
                  {Array.from({ length: 10 }, (_, i) => (
                    <i key={i} />
                  ))}
                </div>
              </div>
            </div>
            <div className="ocr-sidebar">
              <b>LAYOUT PARSER</b>
              <span>▣ TEXT REGION</span>
              <span>▣ TYPOGRAPHY</span>
              <span>▣ FIGURE</span>
              <strong>
                YOLO
                <br />+ OCR
              </strong>
              <small>pixels → structure</small>
            </div>
          </>
        )}
        {index === 2 && (
          <>
            <div className="kanban-head">
              Organet <span>PROJECT OVERVIEW</span>
            </div>
            <div className="kanban">
              {["TO DO", "IN PROGRESS", "COMPLETE"].map((label, col) => (
                <div key={label}>
                  <span>
                    {label} / 0{col + 1}
                  </span>
                  {[0, 1, 2].slice(0, col === 1 ? 2 : 3).map((i) => (
                    <div className="kanban-note" key={i}>
                      <i />
                      <b>
                        {
                          [
                            "Plan the next step",
                            "Make it happen",
                            "Build together",
                          ][(i + col) % 3]
                        }
                      </b>
                      <small>PROJECT / TEAM</small>
                      <em />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
        {index === 3 && (
          <>
            <div className="eid-card">
              <div className="eid-moon" />
              <span>CREATED WITH A LITTLE JOY</span>
              <strong>
                Eid
                <br />
                <em>Mubarak.</em>
              </strong>
              <div className="eid-stars">✦ · ✧ · ✦</div>
              <small>WARM WISHES, MADE YOURS</small>
            </div>
            <div className="eid-controls">
              <span>TYPOGRAPHY</span>
              <b>Aa</b>
              <i />
              <i />
              <span>PALETTE</span>
              <div>● ● ●</div>
              <span>EXPORT / PNG ↗</span>
            </div>
          </>
        )}
        {index === 4 && (
          <>
            <div className="energy-label">
              Less energy.
              <br />
              <strong>More possibility.</strong>
            </div>
            <svg viewBox="0 0 400 180" className="energy-chart">
              {[35, 70, 105, 140].map((n) => (
                <path
                  key={n}
                  d={`M20 ${n} H380`}
                  stroke="#ffffff"
                  opacity=".08"
                />
              ))}
              <path
                d="M20 36C80 26 86 98 145 82S210 65 260 115 321 121 380 146"
                fill="none"
                stroke="#10a68a"
                strokeWidth="3"
              />
              <path
                d="M20 50C90 52 112 45 160 80S235 110 280 85 340 97 380 106"
                fill="none"
                stroke="#f0a600"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
            </svg>
            <div className="art-bottom">
              <span>● PYTHON</span>
              <span>● R / ENERGY EXPLORATION</span>
            </div>
          </>
        )}
        {index === 5 && (
          <>
            <div className="type-grid">
              <span>অ</span>
              <span>আ</span>
              <span>ক</span>
              <span>খ</span>
            </div>
            <div className="type-label">
              <strong>Bengali Type.</strong>
              <span>25 FONT FAMILIES</span>
            </div>
            <div className="type-scan" />
          </>
        )}
        {index === 6 && (
          <>
            <div className="hardware-grid">
              <div className="detection-box">
                <span>FASTENER</span>
                <svg viewBox="0 0 100 100">
                  <path
                    d="m30 18 20-9 20 9v22L50 51 30 40Zm20 33v37m-7-30h14m-14 9h14m-14 9h14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                  />
                </svg>
              </div>
              <div className="detection-box">
                <span>HAND TOOL</span>
                <svg viewBox="0 0 100 100">
                  <path
                    d="m65 15-10 20 13 10 16-17c7 18-4 33-20 32L37 86 23 73l29-27C43 32 49 20 65 15Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              </div>
            </div>
            <div className="art-bottom">
              <span>VISION / OBJECT DETECTION</span>
              <span>24 CLASSES</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
