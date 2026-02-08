import { useState, useEffect, useRef, useCallback } from "react";

/* ━━━━━━━━━━━━━━━━━━━ DATA ━━━━━━━━━━━━━━━━━━━ */
const HIYORI = {
  name:"吉川 ひより", en:"HIYORI YOSHIKAWA", nick:"ひよりん",
  color:"#43B86A", colorLight:"#E6F9ED", emoji:"🌿",
  birth:"2001.8.12", from:"千葉県", height:"154cm",
  photo:"https://cdn.stardust.co.jp/wp-content/uploads/2024/06/yoshikawahiyori_sen002.jpg",
  desc:"超ときめき♡グリーン担当。千葉県出身。結成初期からグループを支える10年選手。FM FUJI冠番組『吉川ひよりの超♡まっ茶りタイム!』MC。即興モノマネ・一発ギャグで会場を沸かせるムードメーカー。透き通る歌声と弾ける笑顔が魅力♡",
  hobby:"料理", skill:"一発ギャグ・即興ソング",
};

const MEMBERS = [
  { name:"辻野 かなみ", en:"KANAMI", nick:"かなみん", color:"#4A9FE5", colorLight:"#E5F1FC", emoji:"💙", colorName:"ブルー", role:"宣伝部長(リーダー)", birth:"1999.6.2", from:"埼玉県", photo:"https://toki-sen.com/s3/skiyaki/uploads/artist_photo/image/25550/kanami.png" },
  { name:"杏 ジュリア", en:"JULIA", nick:"ジュリ", color:"#9B6DC6", colorLight:"#F0E8F8", emoji:"💜", colorName:"パープル", role:"表現力のバレエ担当", birth:"2004.1.15", from:"東京都", photo:"https://toki-sen.com/s3/skiyaki/uploads/artist_photo/image/25556/julia.png" },
  { name:"坂井 仁香", en:"HITOKA", nick:"ひとちゃん", color:"#E83858", colorLight:"#FCE8EC", emoji:"❤️", colorName:"レッド", role:"センター / モデル", birth:"2001.7.25", from:"神奈川県", photo:"https://toki-sen.com/s3/skiyaki/uploads/artist_photo/image/25552/hitoka.png" },
  { name:"小泉 遥香", en:"HARUKA", nick:"はるるん", color:"#E87DA8", colorLight:"#FCE8F0", emoji:"💗", colorName:"ピンク", role:"歌姫 / ギター", birth:"2001.6.13", from:"神奈川県", photo:"https://toki-sen.com/s3/skiyaki/uploads/artist_photo/image/25558/haruka.png" },
  { name:"菅田 愛貴", en:"AKI", nick:"あきちゃん", color:"#D4B000", colorLight:"#FDF8E0", emoji:"💛", colorName:"レモン", role:"最年少 / TikTok女王", birth:"2004.12.20", from:"東京都", photo:"https://toki-sen.com/s3/skiyaki/uploads/artist_photo/image/25554/aki.png" },
];

const NEWS = [
  { date:"2026.02.06", cat:"MEDIA", color:"#4A9FE5", title:"「映画ひみつのアイプリ まんかいバズリウムライブ！」公開初日舞台挨拶出演決定！", src:"toki-sen.com" },
  { date:"2026.02.03", cat:"PHOTO", color:"#E87DA8", title:"「吉川ひより1st写真集」3月18日発売！お渡し会イベント発売スタート！", src:"toki-sen.com" },
  { date:"2026.03.04", cat:"RELEASE", color:"#9B6DC6", title:"ニューアルバム「ときめきえがお」発売！「あっち向いてキュン」「開花宣言！」収録", src:"avex" },
  { date:"2026.03.28", cat:"LIVE", color:"#E83858", title:"「超ときめき♡春の晴れ舞台2026」ぴあアリーナMM 2days開催！", src:"toki-sen.com" },
  { date:"2025.12", cat:"EVENT", color:"#43B86A", title:"「どきどきクリスマスパーティー 2025」TOYOTA ARENA TOKYO — SOLD OUT!!", src:"toki-sen.com" },
  { date:"2025", cat:"AWARD", color:"#D4B000", title:"「超最強」TikTokトレンド大賞2025 インパクト・ソング部門賞受賞！🏆", src:"TikTok" },
];

const EVENTS = [
  { m:"FEB", d:"2026", title:"映画ひみつのアイプリ 舞台挨拶", venue:"📍 詳細後日発表", st:"UPCOMING", stc:"#4A9FE5" },
  { m:"MAR", d:"4", title:"アルバム「ときめきえがお」発売", venue:"💿 全形態", st:"RELEASE", stc:"#9B6DC6" },
  { m:"MAR", d:"18", title:"吉川ひより 1st写真集 発売日", venue:"📸 お渡し会あり", st:"ON SALE", stc:"#43B86A" },
  { m:"MAR", d:"28-29", title:"超ときめき♡春の晴れ舞台2026", venue:"📍 ぴあアリーナMM 2days", st:"TICKET", stc:"#43B86A" },
];

const TICKER = [
  "✨ 「超最強」TikTok総再生25億回突破",
  "📸 吉川ひより1st写真集 3/18発売",
  "🎵 ニューアルバム「ときめきえがお」3/4",
  "🏟️ 春の晴れ舞台 ぴあアリーナMM 3/28-29",
  "🎬 映画ひみつのアイプリ 舞台挨拶決定",
  "🏆 TikTokトレンド大賞2025 受賞",
];

const LINKS = [
  { icon:"🌐", name:"公式サイト", desc:"toki-sen.com", url:"https://toki-sen.com/", bg:"#FFF0E6" },
  { icon:"𝕏", name:"公式 X", desc:"@sendenbu_staff", url:"https://x.com/sendenbu_staff", bg:"#F0F0F0" },
  { icon:"📷", name:"Instagram", desc:"@tokisen_sd", url:"https://www.instagram.com/tokisen_sd/", bg:"#FCE8F2" },
  { icon:"▶️", name:"YouTube", desc:"公式チャンネル", url:"https://www.youtube.com/channel/UCPO-HYS3fdDIKlMMgpcCzdg", bg:"#FCE8E8" },
  { icon:"♫", name:"TikTok", desc:"@tokisen_official", url:"https://www.tiktok.com/@tokisen_official", bg:"#E6F9ED" },
  { icon:"🛒", name:"グッズ通販", desc:"MAILIVIS SHOP", url:"https://mailivis.jp/shop/r/r3-tokisen", bg:"#FDF8E0" },
  { icon:"⭐", name:"スターダスト", desc:"事務所ページ", url:"https://www.stardust.co.jp/talent/section3/sendenbu/", bg:"#F0E8F8" },
  { icon:"🌿", name:"ひよりん", desc:"個人ページ", url:"https://www.stardust.co.jp/talent/section3/yoshikawahiyori/", bg:"#E6F9ED" },
];

/* ━━━ PHOTO COMPONENT ━━━ */
function Photo({ src, alt, color, emoji, style, className }) {
  const [ok, setOk] = useState(true);
  if (!ok) return (
    <div className={className} style={{ ...style, background:`linear-gradient(160deg, ${color}30, ${color}15)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10 }}>
      <span style={{ fontSize:"3.4rem" }}>{emoji}</span>
      <span style={{ fontSize:"0.7rem", fontWeight:800, color, opacity:0.5 }}>{alt}</span>
    </div>
  );
  return <img src={src} alt={alt} className={className} style={style} onError={() => setOk(false)} loading="lazy" />;
}

/* ━━━ SCROLL REVEAL HOOK ━━━ */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Reveal({ children, delay = 0, style, className }) {
  const [ref, vis] = useReveal(0.08);
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ${delay}s cubic-bezier(.4,0,.2,1), transform 0.7s ${delay}s cubic-bezier(.4,0,.2,1)`
    }}>{children}</div>
  );
}

/* ━━━━━━━━━━━━━━━ MAIN COMPONENT ━━━━━━━━━━━━━━━ */
export default function TokisenHub() {
  const [hoverM, setHoverM] = useState(null);
  const [hoverL, setHoverL] = useState(null);
  const [selectedM, setSelectedM] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700;900&family=Outfit:wght@400;600;700;800;900&display=swap');
    
    * { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    
    :root {
      --orange: #FF7B3A;
      --bg: #FFFAF7;
      --card: #FFFFFF;
      --text: #2A1F3D;
      --sub: #6B5F80;
      --muted: #B0A4C4;
      --shadow: 0 4px 24px rgba(80,40,120,0.07);
      --shadow-up: 0 8px 36px rgba(80,40,120,0.13);
    }
    
    body { font-family:'Zen Maru Gothic','Hiragino Maru Gothic Pro',sans-serif; background:var(--bg); color:var(--text); }
    
    @keyframes tickerSlide { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes heartPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.25)} }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.25} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes sparkleRise {
      0% { transform:translateY(0) scale(.5) rotate(0deg); opacity:0; }
      12% { opacity:.55; }
      88% { opacity:.18; }
      100% { transform:translateY(-105vh) scale(1) rotate(360deg); opacity:0; }
    }
    @keyframes heroPhotoIn {
      0% { opacity:0; transform:scale(.92) rotate(-2deg); }
      100% { opacity:1; transform:scale(1) rotate(0deg); }
    }
    @keyframes heroTextIn {
      0% { opacity:0; transform:translateX(30px); }
      100% { opacity:1; transform:translateX(0); }
    }
    @keyframes badgeDrop {
      0% { opacity:0; transform:scale(0) rotate(-15deg); }
      60% { transform:scale(1.12) rotate(3deg); }
      100% { opacity:1; transform:scale(1) rotate(0); }
    }
    @keyframes borderRotate {
      0% { filter:hue-rotate(0deg); }
      100% { filter:hue-rotate(20deg); }
    }
    @keyframes slideInLeft {
      0% { opacity:0; transform:translateX(-24px); }
      100% { opacity:1; transform:translateX(0); }
    }
    
    .member-card:hover .member-photo-inner { transform:scale(1.07); }
    .member-card:hover { transform:translateY(-8px) scale(1.015); }
    .news-row:hover { border-left-color: var(--orange) !important; transform:translateX(4px); }
    .event-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-up); }
    .link-tile:hover { transform:translateY(-6px); box-shadow:var(--shadow-up); }
    
    ::-webkit-scrollbar { width:6px; }
    ::-webkit-scrollbar-thumb { background:rgba(255,123,58,.25); border-radius:8px; }
  `;

  return (
    <>
      <style>{css}</style>

      {/* ━━━ SPARKLES ━━━ */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        {Array.from({ length:22 }).map((_, i) => {
          const chars = ["✨","⭐","💖","♡","🌟","✦","💫","♪","🧡"];
          return (
            <span key={i} style={{
              position:"absolute",
              left: `${(i * 4.7 + 2) % 100}%`,
              bottom: "-30px",
              fontSize: `${0.55 + (i % 5) * 0.2}rem`,
              opacity: 0,
              animation: `sparkleRise ${17 + (i % 7) * 3}s ${(i * 1.3) % 14}s linear infinite`,
            }}>{chars[i % chars.length]}</span>
          );
        })}
      </div>

      {/* ━━━ TICKER ━━━ */}
      <div style={{
        position:"relative", zIndex:20,
        background:"linear-gradient(90deg, #FF6B2B, #FF9E6D, #FF6B2B)",
        padding:"9px 0", overflow:"hidden",
        boxShadow:"0 2px 16px rgba(255,107,43,.35)"
      }}>
        <div style={{ display:"flex", whiteSpace:"nowrap", animation:"tickerSlide 32s linear infinite" }}>
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} style={{
              color:"#fff", fontSize:".72rem", fontWeight:700,
              padding:"0 30px", letterSpacing:".03em",
              textShadow:"0 1px 3px rgba(0,0,0,.12)"
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ━━━ HEADER ━━━ */}
      <header style={{
        position:"sticky", top:0, zIndex:100,
        background: scrollY > 40 ? "rgba(255,250,247,.92)" : "rgba(255,250,247,.7)",
        backdropFilter:"blur(22px)", WebkitBackdropFilter:"blur(22px)",
        borderBottom: scrollY > 40 ? "2px solid rgba(255,107,43,.1)" : "2px solid transparent",
        padding:"11px 0", transition:"all .35s"
      }}>
        <div style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:3, fontWeight:900, fontSize:"1.05rem" }}>
            超ときめき
            <span style={{ color:"var(--orange)", display:"inline-block", animation:"heartPulse 2s ease-in-out infinite" }}>♡</span>
            宣伝部
            <span style={{
              fontSize:".48rem", color:"var(--muted)", fontWeight:600,
              background:"rgba(255,107,43,.07)", padding:"2px 9px",
              borderRadius:10, marginLeft:7, letterSpacing:".08em"
            }}>INFO HUB</span>
          </div>
          <nav style={{ display:"flex", gap:3 }}>
            {[{l:"MEMBERS",h:"#members"},{l:"NEWS",h:"#news"},{l:"EVENTS",h:"#events"},{l:"LINKS",h:"#links"}].map(n => (
              <a key={n.l} href={n.h} style={{
                textDecoration:"none", color:"var(--sub)", fontSize:".67rem", fontWeight:700,
                padding:"6px 13px", borderRadius:16, transition:"all .25s", letterSpacing:".04em"
              }}
              onMouseEnter={e => { e.target.style.background="var(--orange)"; e.target.style.color="#fff"; e.target.style.boxShadow="0 3px 14px rgba(255,107,43,.3)"; }}
              onMouseLeave={e => { e.target.style.background="transparent"; e.target.style.color="var(--sub)"; e.target.style.boxShadow="none"; }}
              >{n.l}</a>
            ))}
          </nav>
          <div style={{ display:"flex", gap:6 }}>
            {[{t:"🌐 公式サイト",u:"https://toki-sen.com/"},{t:"𝕏 公式",u:"https://x.com/sendenbu_staff"}].map((l,i) => (
              <a key={i} href={l.u} target="_blank" rel="noopener" style={{
                display:"flex", alignItems:"center", gap:4, textDecoration:"none",
                color:"var(--sub)", fontSize:".63rem", fontWeight:600,
                padding:"5px 11px", borderRadius:12, background:"rgba(0,0,0,.025)", transition:"all .25s"
              }}
              onMouseEnter={e => { e.target.style.background="var(--orange)"; e.target.style.color="#fff"; }}
              onMouseLeave={e => { e.target.style.background="rgba(0,0,0,.025)"; e.target.style.color="var(--sub)"; }}
              >{l.t}</a>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth:1140, margin:"0 auto", padding:"0 24px", position:"relative", zIndex:5 }}>

        {/* ━━━━━ HERO: HIYORI ━━━━━ */}
        <section style={{
          padding:"52px 0 44px",
          display:"grid", gridTemplateColumns:"420px 1fr", gap:44, alignItems:"center",
          minHeight:"72vh"
        }}>
          {/* Photo */}
          <div style={{ animation:"heroPhotoIn .9s cubic-bezier(.4,0,.2,1) both" }}>
            <div style={{ position:"relative", maxWidth:400 }}>
              {/* Glow ring */}
              <div style={{
                position:"absolute", inset:-9,
                background:`linear-gradient(135deg, ${HIYORI.color}, #A8F0C0, ${HIYORI.color}, #70E898)`,
                borderRadius:26, zIndex:0,
                animation:"borderRotate 4s ease-in-out infinite alternate",
                opacity:.85
              }} />
              <Photo
                src={HIYORI.photo} alt="吉川ひより" color={HIYORI.color} emoji="🌿"
                style={{
                  position:"relative", zIndex:1,
                  width:"100%", aspectRatio:"3/4",
                  objectFit:"cover", objectPosition:"top center",
                  borderRadius:20, display:"block",
                  boxShadow:`0 16px 48px ${HIYORI.color}35`
                }}
              />
              {/* FEATURED badge */}
              <div style={{
                position:"absolute", top:-12, right:-14, zIndex:3,
                background:`linear-gradient(135deg, ${HIYORI.color}, #2EA05A)`,
                color:"#fff", fontSize:".58rem", fontWeight:900,
                padding:"7px 15px", borderRadius:13, letterSpacing:".08em",
                boxShadow:`0 4px 18px ${HIYORI.color}55`,
                animation:"badgeDrop .6s .4s cubic-bezier(.4,0,.2,1) both"
              }}>✨ FEATURED MEMBER</div>
              {/* Green sticker */}
              <div style={{
                position:"absolute", bottom:22, left:-18, zIndex:3,
                background:"#fff", border:`3px solid ${HIYORI.color}`,
                borderRadius:15, padding:"9px 16px",
                fontSize:".68rem", fontWeight:700, color:HIYORI.color,
                boxShadow:"var(--shadow)", transform:"rotate(-3deg)",
                animation:"slideInLeft .7s .6s cubic-bezier(.4,0,.2,1) both"
              }}>🌿 超ときめき♡グリーン</div>
              {/* Floating hearts */}
              {["💚","🌿","✨"].map((e,i) => (
                <span key={i} style={{
                  position:"absolute", zIndex:3,
                  top: ["-8px","40%","75%"][i],
                  left: ["20%","-14px","85%"][i],
                  fontSize:["1.1rem",".9rem","1rem"][i],
                  animation:`float ${2.5 + i * .6}s ${i * .4}s ease-in-out infinite`,
                  opacity:.7
                }}>{e}</span>
              ))}
            </div>
          </div>

          {/* Text side */}
          <div style={{ animation:"heroTextIn .8s .2s cubic-bezier(.4,0,.2,1) both" }}>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:7,
              background:`linear-gradient(135deg, ${HIYORI.color}14, ${HIYORI.color}06)`,
              border:`1.5px solid ${HIYORI.color}35`,
              color:HIYORI.color, fontSize:".63rem", fontWeight:800,
              padding:"5px 15px", borderRadius:18, marginBottom:16, letterSpacing:".1em"
            }}>
              <span style={{ width:7, height:7, background:HIYORI.color, borderRadius:"50%", animation:"blink 1.5s ease-in-out infinite" }} />
              PICK UP MEMBER
            </div>

            <div style={{
              fontFamily:"'Outfit',sans-serif", fontSize:"3.8rem", fontWeight:900,
              letterSpacing:"-.03em", lineHeight:.95,
              background:`linear-gradient(135deg, ${HIYORI.color}, #228A48)`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              marginBottom:5
            }}>HIYORI</div>
            <div style={{
              fontSize:"1.55rem", fontWeight:900, marginBottom:4, letterSpacing:".07em",
              background:`linear-gradient(90deg, ${HIYORI.color}, #2EAA5C, ${HIYORI.color})`,
              backgroundSize:"200% auto",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              animation:"shimmer 3s linear infinite"
            }}>吉川 ひより</div>
            <div style={{ fontSize:".7rem", color:"var(--muted)", fontWeight:600, marginBottom:16 }}>
              Yoshikawa Hiyori ♡ No.6 / Since 2015
            </div>

            <p style={{ color:"var(--sub)", fontSize:".83rem", lineHeight:2, marginBottom:20 }}>{HIYORI.desc}</p>

            <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:20 }}>
              {[
                { i:<span style={{width:9,height:9,borderRadius:"50%",background:HIYORI.color,display:"inline-block"}} />, t:"GREEN" },
                { i:"🎂", t:HIYORI.birth },
                { i:"📍", t:HIYORI.from },
                { i:"📏", t:HIYORI.height },
                { i:"📻", t:"FM FUJI MC" },
                { i:"🎤", t:"出席番号 6" },
              ].map((c,idx) => (
                <span key={idx} style={{
                  display:"inline-flex", alignItems:"center", gap:5,
                  background:"#fff", border:"1.5px solid rgba(0,0,0,.05)",
                  borderRadius:11, padding:"5px 13px", fontSize:".66rem", fontWeight:700,
                  boxShadow:"0 2px 8px rgba(0,0,0,.03)"
                }}>{c.i} {c.t}</span>
              ))}
            </div>

            <div style={{
              background:`linear-gradient(135deg, ${HIYORI.colorLight}, #F0FFF5)`,
              border:`1.5px solid ${HIYORI.color}22`,
              borderRadius:16, padding:"17px 20px"
            }}>
              <div style={{ fontSize:".6rem", color:HIYORI.color, fontWeight:800, letterSpacing:".12em", marginBottom:7 }}>
                🔥 LATEST
              </div>
              <p style={{ fontSize:".82rem", lineHeight:1.8, fontWeight:500 }}>
                <strong>📸 1st写真集</strong> 2026年3月18日発売決定！<br/>
                お渡し会イベントも開催 → <span style={{ color:"var(--orange)", fontWeight:700, cursor:"pointer" }}>詳細を見る</span>
              </p>
            </div>
          </div>
        </section>

        {/* ━━━━━ GROUP PHOTO ━━━━━ */}
        <Reveal>
          <div style={{
            margin:"0 -24px", padding:"40px 24px",
            background:"linear-gradient(135deg, #FFF3E8, #FFEEE0, #FFF8F0)",
            textAlign:"center", position:"relative", overflow:"hidden"
          }}>
            <span style={{ position:"absolute", top:-10, left:"5%", fontSize:"5rem", opacity:.035, fontWeight:900 }}>♡</span>
            <span style={{ position:"absolute", bottom:-18, right:"5%", fontSize:"6rem", opacity:.03, fontWeight:900, transform:"rotate(15deg)" }}>♡</span>
            <div style={{
              maxWidth:860, margin:"0 auto 18px", borderRadius:20,
              overflow:"hidden", boxShadow:"0 10px 44px rgba(255,107,43,.16)",
              border:"4px solid #fff"
            }}>
              <Photo
                src="https://toki-sen.com/s3/skiyaki/uploads/artist_photo/image/25548/syugo_profile.jpg"
                alt="超ときめき♡宣伝部" color="#FF7B3A" emoji="🧡"
                style={{ width:"100%", height:"auto", display:"block", minHeight:180 }}
              />
            </div>
            <p style={{ fontSize:".78rem", color:"var(--sub)", fontWeight:600 }}>
              きみのハートにロックオンっ！♡ <strong style={{ color:"var(--orange)" }}>超ときめき♡宣伝部</strong> — 結成10周年 🎉
            </p>
          </div>
        </Reveal>

        {/* ━━━━━ MEMBERS ━━━━━ */}
        <Reveal>
          <section id="members" style={{ padding:"50px 0 40px" }}>
            <div style={{ fontSize:".6rem", fontWeight:800, letterSpacing:".2em", color:"var(--orange)", marginBottom:5 }}>♡ MEMBERS</div>
            <h2 style={{ fontSize:"1.6rem", fontWeight:900, marginBottom:6 }}>メンバー紹介</h2>
            <p style={{ fontSize:".76rem", color:"var(--muted)", marginBottom:28 }}>きみのハートにロックオンっ！6人のときめきをお届け♡</p>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:14 }}>
              {MEMBERS.map((m, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div
                    className="member-card"
                    onMouseEnter={() => setHoverM(i)}
                    onMouseLeave={() => setHoverM(null)}
                    onClick={() => setSelectedM(selectedM === i ? null : i)}
                    style={{
                      background:"var(--card)", borderRadius:20, overflow:"hidden",
                      boxShadow: hoverM === i ? `0 10px 36px ${m.color}28` : "var(--shadow)",
                      transition:"all .4s cubic-bezier(.4,0,.2,1)",
                      cursor:"pointer", position:"relative"
                    }}
                  >
                    <div style={{ position:"relative", overflow:"hidden" }}>
                      <Photo
                        src={m.photo} alt={m.name} color={m.color} emoji={m.emoji}
                        className="member-photo-inner"
                        style={{
                          width:"100%", aspectRatio:"3/4",
                          objectFit:"cover", objectPosition:"top center",
                          display:"block", transition:"transform .5s"
                        }}
                      />
                      <div style={{
                        position:"absolute", bottom:0, left:0, width:"100%", height:"55%",
                        background:"linear-gradient(transparent, rgba(255,255,255,.92))",
                        pointerEvents:"none"
                      }} />
                      {/* Role tag on hover */}
                      {hoverM === i && (
                        <div style={{
                          position:"absolute", top:10, left:10,
                          background:"rgba(255,255,255,.9)", backdropFilter:"blur(8px)",
                          padding:"4px 10px", borderRadius:8,
                          fontSize:".5rem", fontWeight:700, color:m.color,
                          animation:"slideInLeft .3s ease-out"
                        }}>{m.role}</div>
                      )}
                    </div>
                    <div style={{ height:4, background:m.color }} />
                    <div style={{ padding:"13px 10px 16px", textAlign:"center", marginTop:-32, position:"relative", zIndex:2 }}>
                      <div style={{
                        width:15, height:15, borderRadius:"50%", background:m.color,
                        margin:"0 auto 5px",
                        boxShadow:`0 0 0 3px #fff, 0 0 0 5px ${m.color}30, 0 2px 8px rgba(0,0,0,.08)`
                      }} />
                      <div style={{ fontSize:".92rem", fontWeight:800 }}>{m.name}</div>
                      <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:".5rem", fontWeight:600, color:"var(--muted)", letterSpacing:".07em", marginBottom:4 }}>{m.en}</div>
                      <span style={{
                        display:"inline-block", fontSize:".5rem", fontWeight:700,
                        color:m.color, background:`${m.color}10`, padding:"3px 10px",
                        borderRadius:9, border:`1px solid ${m.color}22`
                      }}>超ときめき♡{m.colorName}</span>
                    </div>
                    {/* Expand detail */}
                    {selectedM === i && (
                      <div style={{
                        padding:"0 12px 14px", fontSize:".62rem", color:"var(--sub)",
                        lineHeight:1.7, textAlign:"center",
                        animation:"slideInLeft .3s ease-out"
                      }}>
                        <div style={{ display:"flex", justifyContent:"center", gap:6, flexWrap:"wrap" }}>
                          <span>🎂 {m.birth}</span>
                          <span>📍 {m.from}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ━━━━━ NEWS ━━━━━ */}
        <Reveal>
          <section id="news" style={{ padding:"40px 0 48px" }}>
            <div style={{ fontSize:".6rem", fontWeight:800, letterSpacing:".2em", color:"var(--orange)", marginBottom:5 }}>♡ LATEST NEWS</div>
            <h2 style={{ fontSize:"1.6rem", fontWeight:900, marginBottom:6 }}>最新ニュース</h2>
            <p style={{ fontSize:".76rem", color:"var(--muted)", marginBottom:28 }}>公式サイト・公式Xから最新情報をお届け✨</p>

            <div style={{ display:"grid", gridTemplateColumns:"1.35fr 1fr", gap:22 }}>
              {/* News feed */}
              <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                {NEWS.map((n, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <div className="news-row" style={{
                      background:"var(--card)", borderRadius:14, padding:"15px 17px",
                      boxShadow:"var(--shadow)", borderLeft:"4px solid transparent",
                      transition:"all .3s", cursor:"pointer"
                    }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:".58rem", fontWeight:700, color:"var(--muted)" }}>{n.date}</span>
                        <span style={{
                          fontSize:".48rem", fontWeight:800, padding:"2px 8px", borderRadius:7,
                          background:`${n.color}12`, color:n.color, letterSpacing:".03em"
                        }}>{n.cat}</span>
                      </div>
                      <div style={{ fontSize:".82rem", fontWeight:700, lineHeight:1.55 }}>{n.title}</div>
                      <div style={{ fontSize:".54rem", color:"var(--muted)", marginTop:4 }}>📌 {n.src}</div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* X Sidebar */}
              <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
                {/* Official posts */}
                <div style={{ background:"var(--card)", borderRadius:16, padding:17, boxShadow:"var(--shadow)" }}>
                  <div style={{
                    fontSize:".64rem", fontWeight:800, color:"var(--sub)",
                    letterSpacing:".07em", marginBottom:11,
                    display:"flex", alignItems:"center", gap:7
                  }}>
                    <span style={{
                      background:"var(--text)", color:"#fff", width:18, height:18,
                      borderRadius:5, display:"inline-flex", alignItems:"center",
                      justifyContent:"center", fontSize:".55rem", fontWeight:900
                    }}>𝕏</span>
                    公式Xポスト
                    <span style={{
                      marginLeft:"auto", display:"flex", alignItems:"center", gap:4,
                      fontSize:".5rem", color:"#43B86A", fontWeight:800
                    }}>
                      <span style={{width:5,height:5,background:"#43B86A",borderRadius:"50%",animation:"blink 1.5s ease-in-out infinite"}} />
                      LIVE
                    </span>
                  </div>
                  {[
                    { t:"📸 吉川ひより1st写真集 3月18日発売決定！🌿✨", d:"最新" },
                    { t:"🎬 映画ひみつのアイプリ 舞台挨拶出演決定！♡", d:"2日前" },
                    { t:"🌸 春の晴れ舞台2026 ぴあアリーナMM 3/28-29!", d:"1週前" },
                  ].map((p,i) => (
                    <div key={i} style={{ padding:"9px 0", borderBottom: i<2 ? "1px solid rgba(0,0,0,.035)" : "none" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4 }}>
                        <div style={{
                          width:24, height:24, borderRadius:"50%", background:"var(--orange)",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:".48rem", color:"#fff", fontWeight:800
                        }}>♡</div>
                        <span style={{ fontSize:".66rem", fontWeight:700 }}>超ときめき♡宣伝部</span>
                        <span style={{ fontSize:".48rem", color:"var(--muted)", marginLeft:"auto" }}>{p.d}</span>
                      </div>
                      <div style={{ fontSize:".72rem", color:"var(--sub)", lineHeight:1.65, paddingLeft:31 }}>{p.t}</div>
                    </div>
                  ))}
                </div>
                {/* Fan posts */}
                <div style={{ background:"var(--card)", borderRadius:16, padding:17, boxShadow:"var(--shadow)" }}>
                  <div style={{ fontSize:".64rem", fontWeight:800, color:"var(--sub)", letterSpacing:".07em", marginBottom:11, display:"flex", alignItems:"center", gap:7 }}>
                    <span style={{ background:"var(--text)", color:"#fff", width:18, height:18, borderRadius:5, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:".55rem", fontWeight:900 }}>𝕏</span>
                    ファンの声 ♡
                  </div>
                  {[
                    { e:"🌿", c:"#43B86A", t:"ひよりんの写真集楽しみすぎる😭✨ 10年応援してきて本当によかった…!" },
                    { e:"❤️", c:"#E83858", t:"春の晴れ舞台チケット当選！ぴあアリーナで会えるの楽しみ🧡" },
                  ].map((p,i) => (
                    <div key={i} style={{ padding:"8px 0", borderBottom: i===0 ? "1px solid rgba(0,0,0,.035)" : "none" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4 }}>
                        <div style={{width:24,height:24,borderRadius:"50%",background:p.c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".48rem",color:"#fff"}}>{p.e}</div>
                        <span style={{ fontSize:".66rem", fontWeight:700 }}>宣伝部員</span>
                      </div>
                      <div style={{ fontSize:".72rem", color:"var(--sub)", lineHeight:1.65, paddingLeft:31 }}>{p.t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ━━━━━ EVENTS ━━━━━ */}
        <Reveal>
          <section id="events" style={{ padding:"40px 0 48px" }}>
            <div style={{ fontSize:".6rem", fontWeight:800, letterSpacing:".2em", color:"var(--orange)", marginBottom:5 }}>♡ UPCOMING</div>
            <h2 style={{ fontSize:"1.6rem", fontWeight:900, marginBottom:6 }}>イベントスケジュール</h2>
            <p style={{ fontSize:".76rem", color:"var(--muted)", marginBottom:28 }}>今後のイベント・リリース情報✨</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:13 }}>
              {EVENTS.map((e, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="event-card" style={{
                    background:"var(--card)", borderRadius:16, padding:"19px 20px",
                    boxShadow:"var(--shadow)", display:"flex", gap:15, alignItems:"flex-start",
                    transition:"all .3s", cursor:"pointer"
                  }}>
                    <div style={{
                      minWidth:54, textAlign:"center",
                      background:"linear-gradient(135deg, var(--orange), #FF9E6D)",
                      borderRadius:12, padding:"10px 8px", color:"#fff",
                      boxShadow:"0 3px 12px rgba(255,107,43,.2)"
                    }}>
                      <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:".5rem", fontWeight:700, letterSpacing:".1em" }}>{e.m}</div>
                      <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"1.35rem", fontWeight:900, lineHeight:1 }}>{e.d}</div>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:".86rem", fontWeight:700, marginBottom:3, lineHeight:1.4 }}>{e.title}</div>
                      <div style={{ fontSize:".66rem", color:"var(--sub)" }}>{e.venue}</div>
                      <span style={{
                        display:"inline-block", fontSize:".48rem", fontWeight:800,
                        padding:"3px 10px", borderRadius:7, marginTop:6,
                        background:`${e.stc}12`, color:e.stc, letterSpacing:".04em"
                      }}>{e.st}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ━━━━━ LINKS ━━━━━ */}
        <Reveal>
          <section id="links" style={{ padding:"40px 0 56px" }}>
            <div style={{ fontSize:".6rem", fontWeight:800, letterSpacing:".2em", color:"var(--orange)", marginBottom:5 }}>♡ OFFICIAL LINKS</div>
            <h2 style={{ fontSize:"1.6rem", fontWeight:900, marginBottom:6 }}>公式リンク集</h2>
            <p style={{ fontSize:".76rem", color:"var(--muted)", marginBottom:28 }}>超ときめき♡宣伝部の公式アカウント&サービス</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:11 }}>
              {LINKS.map((l, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <a href={l.url} target="_blank" rel="noopener"
                    className="link-tile"
                    onMouseEnter={() => setHoverL(i)}
                    onMouseLeave={() => setHoverL(null)}
                    style={{
                      display:"flex", flexDirection:"column", alignItems:"center", gap:8,
                      background:"var(--card)", borderRadius:16, padding:"20px 14px",
                      textDecoration:"none", color:"var(--text)", textAlign:"center",
                      boxShadow:"var(--shadow)", transition:"all .3s", cursor:"pointer"
                    }}
                  >
                    <div style={{
                      width:48, height:48, borderRadius:14,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"1.3rem", background:l.bg,
                      transition:"transform .3s",
                      transform: hoverL === i ? "scale(1.15) rotate(-5deg)" : "none"
                    }}>{l.icon}</div>
                    <div style={{ fontSize:".76rem", fontWeight:700 }}>{l.name}</div>
                    <div style={{ fontSize:".54rem", color:"var(--muted)" }}>{l.desc}</div>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>
      </main>

      {/* ━━━ FOOTER ━━━ */}
      <footer style={{
        background:"linear-gradient(135deg, #FFF3E8, #FFFAF7)",
        borderTop:"2px solid rgba(255,107,43,.06)",
        padding:"28px 24px", textAlign:"center"
      }}>
        <div style={{ display:"flex", justifyContent:"center", gap:5, marginBottom:13 }}>
          {["#4A9FE5","#9B6DC6","#E83858","#E87DA8","#D4B000","#43B86A"].map((c,i) => (
            <span key={i} style={{ width:24, height:5, borderRadius:3, background:c, transition:"width .3s" }} />
          ))}
        </div>
        <p style={{ fontSize:".64rem", color:"var(--muted)", lineHeight:1.9 }}>
          超ときめき♡宣伝部 INFO HUB — ファン制作の非公式情報サイト ♡<br/>
          きみのハートにロックオンっ！<br/>
          <span style={{ fontSize:".55rem" }}>※公式サイトは <a href="https://toki-sen.com" target="_blank" rel="noopener" style={{ color:"var(--orange)", textDecoration:"none", fontWeight:600 }}>toki-sen.com</a> をご覧ください</span>
        </p>
      </footer>
    </>
  );
}
