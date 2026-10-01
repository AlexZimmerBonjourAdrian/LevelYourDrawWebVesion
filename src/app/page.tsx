'use client';

import { useState } from 'react';
import { useBriefs } from '@/features/brief/useBriefs';
import { useStudySpin } from '@/features/study/useStudySpin';
import { STR } from '@/features/brief/strings';
import type { BriefLang } from '@/features/brief/types';
import { THEMES } from '@/tokens/themes';
import DatumCard from '@/components/DatumCard';

const th = THEMES.dark;

export default function Home() {
  const b = useBriefs();
  const t = STR[b.lang];
  const [tab, setTab] = useState<'brief' | 'study'>('brief');
  const s = useStudySpin(b.lang);

  const switchLang = (l: BriefLang) => {
    const prev = b.lang;
    b.switchLang(l);
    s.translateTo(l, prev);
  };

  return (
    <div className={`min-h-screen flex flex-col ${th.page}`}>
      <header className={`border-b ${th.bar}`}>
        <div className="max-w-2xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <p className="font-serif font-bold text-[18px]">{t.brand}</p>
          <div className={`flex rounded-full border overflow-hidden ${th.chip}`} role="group" aria-label={t.lang}>
            {(['es', 'en'] as BriefLang[]).map((l) => (
              <button
                key={l}
                onClick={() => switchLang(l)}
                aria-pressed={b.lang === l}
                className={`px-4 min-h-[44px] min-w-[44px] text-[13px] font-medium ${b.lang === l ? th.activeSeg : ''}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <nav className="max-w-2xl mx-auto px-5 pb-3 flex gap-2" aria-label="Tabs">
          {(['brief', 'study'] as const).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              aria-pressed={tab === k}
              className={`px-4 min-h-[44px] rounded-full border text-[13px] font-medium ${th.chip} ${tab === k ? th.activeSeg : ''}`}
            >
              {k === 'brief' ? t.tabBrief : t.tabStudy}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-8">
        {tab === 'brief' ? (
          <>
            {b.loadError && <p className="font-mono text-[13px] text-[#C0392B]">ERR-DECKS · {b.loadError}</p>}

            {b.draft ? (
              <>
                <p className={`text-[12px] mb-3 ${th.faint}`}>{b.spinning ? t.lockHint : t.unlockHint}</p>
                <div className="grid grid-cols-2 gap-3 mb-3" aria-live="off">
                  <DatumCard label={t.rol} value={b.draft.v.rol}
                    onActivate={() => b.lockField('rol')} actionLabel={b.spinning ? t.lockHint : t.unlockHint}
                    th={th} spinning={b.spinning} locked={b.draft.locked.rol} spinDelayMs={0}
                    gloss={b.glossFor('roles', b.draft.v.rol)} glossLabel={t.glossWhat}
                    extra={b.guideFor(b.draft.v.rol)} />
                  <DatumCard label={t.prof} value={b.draft.v.prof}
                    onActivate={() => b.lockField('prof')} actionLabel={b.spinning ? t.lockHint : t.unlockHint}
                    th={th} spinning={b.spinning} locked={b.draft.locked.prof} spinDelayMs={60}
                    gloss={b.glossFor('professions', b.draft.v.prof)} glossLabel={t.glossWhat} />
                  <DatumCard label={t.inner} value={b.draft.v.interno}
                    onActivate={() => b.lockField('interno')} actionLabel={b.spinning ? t.lockHint : t.unlockHint}
                    th={th} spinning={b.spinning} locked={b.draft.locked.interno} spinDelayMs={120}
                    gloss={b.glossFor('inner', b.draft.v.interno)} glossLabel={t.glossWhat} />
                  <DatumCard label={t.outer} value={b.draft.v.externo}
                    onActivate={() => b.lockField('externo')} actionLabel={b.spinning ? t.lockHint : t.unlockHint}
                    th={th} spinning={b.spinning} locked={b.draft.locked.externo} spinDelayMs={180}
                    gloss={b.glossFor('outer', b.draft.v.externo)} glossLabel={t.glossWhat} />
                </div>
              </>
            ) : !b.current ? (
              <p className={`text-[15px] py-10 text-center ${th.muted}`}>{t.empty}</p>
            ) : (
              <>
                <p className={`text-[12px] mb-3 ${th.faint}`}>{t.tapToChange}</p>
                <div key={b.current.id} className="grid grid-cols-2 gap-3 mb-3">
                  <DatumCard label={t.rol} value={b.current.rol}
                    onActivate={() => b.reroll('rol')} actionLabel={t.changeRol} th={th}
                    gloss={b.glossFor('roles', b.current.rol)} glossLabel={t.glossWhat}
                    extra={b.guideFor(b.current.rol)} />
                  <DatumCard label={t.prof} value={b.current.profesiones[0]}
                    onActivate={() => b.reroll('profesion')} actionLabel={t.changeProf} th={th} fadeDelay={0.07}
                    gloss={b.glossFor('professions', b.current.profesiones[0])} glossLabel={t.glossWhat} />
                  <DatumCard label={t.inner} value={b.current.interno}
                    onActivate={() => b.reroll('interno')} actionLabel={t.changeInner} th={th} fadeDelay={0.14}
                    gloss={b.glossFor('inner', b.current.interno)} glossLabel={t.glossWhat} />
                  <DatumCard label={t.outer} value={b.current.externo}
                    onActivate={() => b.reroll('externo')} actionLabel={t.changeOuter} th={th} fadeDelay={0.21}
                    gloss={b.glossFor('outer', b.current.externo)} glossLabel={t.glossWhat} />
                </div>
              </>
            )}

            <button
              onClick={b.spinning ? b.stopSpin : b.startSpin}
              disabled={!b.decksReady}
              className="w-full min-h-[44px] bg-[#C0392B] hover:bg-[#A93226] disabled:opacity-50 text-white rounded-[10px] font-medium text-[15px]"
            >
              {b.spinning ? t.stop : t.new}
            </button>

            {b.legend.length > 0 && (
              <section aria-label={t.legendTitle} className="mt-6">
                <h2 className={`text-[11px] uppercase tracking-[0.12em] mb-2 ${th.faint}`}>{t.legendTitle}</h2>
                <ul className="space-y-2">
                  {b.legend.map((item) => (
                    <li key={`${item.cat}-${item.value}`} className={`border rounded-[10px] px-4 py-3 ${th.card}`}>
                      <p className="font-serif text-[15px]">{item.value}</p>
                      <p className={`text-[12px] leading-snug ${th.muted}`}>{item.gloss}</p>
                      {item.guide && <p className={`text-[12px] leading-snug mt-1 italic ${th.muted}`}>{item.guide}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        ) : (
          <>
            {s.loadError && <p className="font-mono text-[13px] text-[#C0392B]">ERR-STUDY · {s.loadError}</p>}
            <p className={`text-[12px] mb-3 ${th.faint}`}>{t.studyHint}</p>

            {s.draft ? (
              <>
                <p className={`text-[12px] mb-3 ${th.faint}`}>{s.spinning ? t.lockHint : t.unlockHint}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3" aria-live="off">
                  <DatumCard label={t.studyEstilo} value={s.draft.v.estilo}
                    onActivate={() => s.lockField('estilo')} actionLabel={s.spinning ? t.lockHint : t.unlockHint}
                    th={th} spinning={s.spinning} locked={s.draft.locked.estilo} spinDelayMs={0}
                    gloss={s.glossFor('estilos', s.draft.v.estilo)} glossLabel={t.glossWhat}
                    extra={s.guideFor('estilos', s.draft.v.estilo)} />
                  <DatumCard label={t.studyArtista} value={s.draft.v.artista}
                    onActivate={() => s.lockField('artista')} actionLabel={s.spinning ? t.lockHint : t.unlockHint}
                    th={th} spinning={s.spinning} locked={s.draft.locked.artista} spinDelayMs={80}
                    gloss={s.glossFor('artistas', s.draft.v.artista)} glossLabel={t.glossWhat}
                    extra={s.guideFor('artistas', s.draft.v.artista)} />
                </div>
              </>
            ) : !s.current ? (
              <p className={`text-[15px] py-10 text-center ${th.muted}`}>{t.studyEmpty}</p>
            ) : (
              <>
                <p className={`text-[12px] mb-3 ${th.faint}`}>{t.tapToChange}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <DatumCard label={t.studyEstilo} value={s.current.estilo}
                    onActivate={() => s.reroll('estilo')} actionLabel={t.studyChangeEstilo} th={th}
                    gloss={s.glossFor('estilos', s.current.estilo)} glossLabel={t.glossWhat}
                    extra={s.guideFor('estilos', s.current.estilo)} />
                  <DatumCard label={t.studyArtista} value={s.current.artista}
                    onActivate={() => s.reroll('artista')} actionLabel={t.studyChangeArtista} th={th} fadeDelay={0.07}
                    gloss={s.glossFor('artistas', s.current.artista)} glossLabel={t.glossWhat}
                    extra={s.guideFor('artistas', s.current.artista)} />
                </div>
              </>
            )}

            <button
              onClick={s.spinning ? s.stop : s.start}
              disabled={!s.ready}
              className="w-full min-h-[44px] bg-[#C0392B] hover:bg-[#A93226] disabled:opacity-50 text-white rounded-[10px] font-medium text-[15px]"
            >
              {s.spinning ? t.studyStop : t.studyNew}
            </button>

            {s.legend.length > 0 && (
              <section aria-label={t.legendTitle} className="mt-6">
                <h2 className={`text-[11px] uppercase tracking-[0.12em] mb-2 ${th.faint}`}>{t.legendTitle}</h2>
                <ul className="space-y-2">
                  {s.legend.map((item) => (
                    <li key={`${item.cat}-${item.value}`} className={`border rounded-[10px] px-4 py-3 ${th.card}`}>
                      <p className="font-serif text-[15px]">{item.value}</p>
                      <p className={`text-[12px] leading-snug ${th.muted}`}>{item.gloss}</p>
                      {item.guide && <p className={`text-[12px] leading-snug mt-1 italic ${th.muted}`}>{item.guide}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
