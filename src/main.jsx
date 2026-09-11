import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, Check, ChevronLeft, ChevronRight, CircleUserRound, CreditCard, Fingerprint, LockKeyhole, Mail, Menu, ShieldCheck, Smartphone, UserRound, X } from 'lucide-react'
import jioLogo from './assets/operators/jio.svg'
import airtelLogo from './assets/operators/airtel.png'
import viLogo from './assets/operators/vi.svg'
import bsnlLogo from './assets/operators/bsnl.svg'
import { sendRegistrationEmail } from './emailService'
import './styles.css'

const plans = [
  { months: '1 Year', price: '₹999', sub: 'Monthly ₹399 Recharge', note: 'Unlimited Voice | 28GB/Day Data', tone: 'blue' },
  { months: '5 Months', price: '₹549', sub: 'Monthly Recharge Free', note: 'Unlimited Calling | High-Speed Data', tone: 'green' },
  { months: '2 Months', price: '₹299', sub: 'Recharge Benefits', note: 'Voice & Data Benefits', tone: 'orange' },
]

function Brand(){ return <a className="brand" href="#home">Hey<span>Siwy</span></a> }
function OperatorLogos(){return <div className="operator-row" aria-label="Supported operators">
  <img className="operator-logo jio-logo" src={jioLogo} alt="Jio"/>
  <img className="operator-logo airtel-logo" src={airtelLogo} alt="Airtel"/>
  <img className="operator-logo vi-logo" src={viLogo} alt="Vi"/>
  <img className="operator-logo bsnl-logo" src={bsnlLogo} alt="BSNL"/>
  <span>& More...</span>
</div>}

function Header({page, setPage}){
  const [open, setOpen] = useState(false)
  const navigate = (target) => { setPage(target); setOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}) }
  return <header><div className="nav-shell"><Brand/><nav className={open ? 'open' : ''}>
    <button onClick={() => navigate('home')}>Home</button><button onClick={() => document.getElementById('plans')?.scrollIntoView({behavior:'smooth'})}>Plans</button><button onClick={() => document.getElementById('why')?.scrollIntoView({behavior:'smooth'})}>About</button><button onClick={() => alert('Need help? Email support@heysiwy.com')}>FAQ</button><button className="join-top" onClick={() => navigate('register')}>Register</button>
  </nav><button className="menu" aria-label="Open navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div></header>
}

function Home({setPage}){
 return <><Header setPage={setPage}/><main id="home">
  <section className="hero"><div className="hero-copy"><p className="eyebrow">SIMPLE. SECURE. ALWAYS ON.</p><h1>Hey<em>Siwy</em><small>Recharge Made Easy!</small></h1><p className="hero-text">Get monthly mobile recharge with one-time payment.</p><OperatorLogos/></div>
  <div className="phone-mockup" aria-label="HeySiwy recharge plans preview"><div className="phone-speaker"></div><div className="phone-screen"><div className="screen-top"><span>9:41</span><span>● ● ●</span></div><div className="screen-brand">Hey<b>Siwy</b></div><div className="screen-copy"><span>Recharge your number</span><b>Choose a plan</b></div><div className="screen-operator"><img src={jioLogo} alt=""/><span>Jio prepaid</span><Check size={12}/></div><div className="hero-plan"><div className="plan-highlight"><span>BEST VALUE</span><p>1 YEAR PACK</p><strong>₹999</strong><small>12 months of benefits</small></div><i></i><div className="mini-plan"><p>5 MONTH PACK</p><strong>₹549</strong></div><i></i><div className="mini-plan"><p>2 MONTH PACK</p><strong>₹299</strong></div></div><button className="screen-cta">Recharge now <ArrowRight size={13}/></button><div className="screen-home"></div></div></div><ChevronLeft className="slide left"/><ChevronRight className="slide right"/></section>
  <section className="benefits" id="why"><div><Fingerprint/><span>Easy Registration</span></div><div><ShieldCheck/><span>Secure Payment</span></div><div><CreditCard/><span>Monthly Recharge</span></div><div><Smartphone/><span>All Major Networks</span></div></section>
  <section className="plans-section" id="plans"><p className="section-kicker">PICK WHAT FITS YOU</p><h2>Choose Your Plan</h2><div className="plan-grid">{plans.map(plan => <article className="plan-card" key={plan.months}><h3>{plan.months} Plan</h3><div className="price">{plan.price}</div><p>{plan.sub}</p><small>{plan.note}</small><button className={plan.tone} onClick={() => setPage('register')}>Join Now <ArrowRight size={16}/></button></article>)}</div></section>
  <section className="cta"><div><p>READY WHEN YOU ARE</p><h2>One payment. Recharge made simple.</h2></div><button onClick={() => setPage('register')}>Get started <ArrowRight size={17}/></button></section>
 </main><Footer/></>
}

function Field({icon, name, type='text', placeholder}){return <label className="field">{icon}<input name={name} type={type} placeholder={placeholder} required/></label>}
function Register({setPage}){
 const [status, setStatus] = useState('idle')
 const submit = async (e) => {e.preventDefault(); setStatus('sending'); const form = new FormData(e.currentTarget); try { const result = await sendRegistrationEmail({ name: form.get('name'), email: form.get('email'), mobile: form.get('mobile') }); setStatus(result.configured ? 'sent' : 'needs-setup') } catch (error) { console.error('EmailJS registration email failed:', error); setStatus('error') }}
 return <div className="auth-page"><Header setPage={setPage}/><main className="auth-main"><section className="auth-art"><div><p>RECHARGE WITH CONFIDENCE</p><h1>Simple plans.<br/><span>Zero hassle.</span></h1><p>Register once and get plan information delivered directly to your inbox.</p></div><div className="art-circle">₹</div></section><section className="form-zone"><form className="auth-card" onSubmit={submit}><Brand/><div className="auth-heading"><h1>Create Your Account</h1><p>Join now and start saving!</p></div>{status !== 'idle' && status !== 'sending' ? <div className="success-box"><Check/><h3>{status === 'sent' ? 'Check your inbox!' : status === 'needs-setup' ? 'Registration received' : 'Email could not be sent'}</h3><p>{status === 'sent' ? 'Your HeySiwy welcome email is on its way.' : ''}</p><button type="button" onClick={() => setPage('home')}>Go to home</button></div> : <>
 <Field name="name" icon={<UserRound/>} placeholder="Full Name"/><Field name="email" icon={<Mail/>} type="email" placeholder="Email Address"/><Field name="mobile" icon={<Smartphone/>} type="tel" placeholder="Mobile Number"/>
 <div className="options"><label><input type="checkbox" required/> I agree to <a href="#terms">Terms & Conditions</a></label></div><button className="primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Register'} <ArrowRight size={17}/></button><p className="privacy-note">We’ll only use these details to send your registration confirmation.</p></>}
 </form></section></main></div>
}
function Footer(){return <footer><Brand/><span>© 2026 HeySiwy. Recharge made easy.</span><span>Safe payments · Simple plans</span></footer>}
function App(){const [page, setPage] = useState('home'); return page === 'home' ? <Home setPage={setPage}/> : <Register setPage={setPage}/>}
createRoot(document.getElementById('root')).render(<App/>)
