import { useState } from 'react'
import {
  Home, BookOpen, ClipboardCheck, Brain, UserRound,
  Bell, Sun, Moon, Flame,
  FileText, Target, ChevronRight, Clock3, Bookmark,
  TrendingUp, Sparkles, CalendarDays
} from 'lucide-react'
import './App.css'

type Tab = 'Home' | 'Learn' | 'Mock' | 'Brain' | 'Profile'

const navItems = [
  { name: 'Home', icon: Home },
  { name: 'Learn', icon: BookOpen },
  { name: 'Mock', icon: ClipboardCheck },
  { name: 'Brain', icon: Brain },
  { name: 'Profile', icon: UserRound },
] as const

const shortcuts = [
  { title: 'Digital Books', subtitle: 'Explore your library', icon: BookOpen, color: 'blue', tab: 'Learn' as Tab },
  { title: 'Mock Tests', subtitle: 'Test your preparation', icon: ClipboardCheck, color: 'purple', tab: 'Mock' as Tab },
  { title: 'Brain Training', subtitle: 'Sharpen your mind', icon: Brain, color: 'orange', tab: 'Brain' as Tab },
  { title: 'My Notes', subtitle: 'Your personal notebook', icon: FileText, color: 'green', tab: 'Learn' as Tab },
  { title: 'Syllabus', subtitle: 'Track your progress', icon: Target, color: 'pink', tab: 'Learn' as Tab },
  { title: 'Previous Papers', subtitle: 'Practice with PYQs', icon: Bookmark, color: 'cyan', tab: 'Learn' as Tab },
]

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Home')
  const [dark, setDark] = useState(false)
  const [message, setMessage] = useState('')

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : hour < 21 ? 'Good Evening' : 'Good Night'

  const date = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  const showMessage = (text: string) => {
    setMessage(text)
    window.setTimeout(() => setMessage(''), 2500)
  }

  const changeTab = (tab: Tab) => {
    setActiveTab(tab)
    setMessage('')
  }

  return (
    <main className={dark ? 'app dark' : 'app'}>
      <header className="topbar">
        <div className="brand">
          <div className="brand-logo"><BookOpen size={22}/></div>
          <div>
            <div className="brand-name">Study<span>Verse</span></div>
            <div className="brand-tagline">YOUR LEARNING SPACE</div>
          </div>
        </div>
        <div className="top-actions">
          <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? <Sun size={19}/> : <Moon size={19}/>}
          </button>
          <button className="icon-btn notification" onClick={() => showMessage('You are all caught up!')} aria-label="Notifications">
            <Bell size={19}/>
            <i/>
          </button>
          <button className="avatar" onClick={() => changeTab('Profile')}>S</button>
        </div>
      </header>

      <div className="page-content">
        <section className="welcome-section">
          <div>
            <div className="date-line"><CalendarDays size={14}/>{date}</div>
            <h1>{greeting}, <span>Student!</span></h1>
            <p className="welcome-subtitle">Every small step takes you closer to your goals.</p>
          </div>
          <div className="welcome-decoration"><Sparkles size={32}/></div>
        </section>

        {activeTab === 'Home' ? (
          <>
            <section className="hero-card">
              <div className="hero-content">
                <div className="hero-label"><Sparkles size={14}/> YOUR LEARNING JOURNEY</div>
                <h2>Learn today.<br/>Lead tomorrow.</h2>
                <p>Build better habits, master concepts and achieve your goals.</p>
                <button className="hero-button" onClick={() => changeTab('Learn')}>
                  Start Learning <ChevronRight size={17}/>
                </button>
              </div>
              <div className="hero-art">
                <div className="orbit orbit-one"/>
                <div className="orbit orbit-two"/>
                <div className="book-art"><BookOpen size={55}/></div>
                <div className="floating-star"><Sparkles size={19}/></div>
              </div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div>
                  <h3>Your Overview</h3>
                  <p>A snapshot of your learning journey</p>
                </div>
                <button className="text-action" onClick={() => changeTab('Profile')}>View all <ChevronRight size={15}/></button>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon blue"><ClipboardCheck size={19}/></div>
                  <strong>0</strong><span>Tests Attempted</span>
                  <small>Start your first test</small>
                </div>
                <div className="stat-card">
                  <div className="stat-icon orange"><Flame size={19}/></div>
                  <strong>0 <small>days</small></strong><span>Current Streak</span>
                  <small>Build your consistency</small>
                </div>
                <div className="stat-card">
                  <div className="stat-icon green"><TrendingUp size={19}/></div>
                  <strong>0%</strong><span>Accuracy</span>
                  <small>Your progress will appear here</small>
                </div>
                <div className="stat-card">
                  <div className="stat-icon purple"><Clock3 size={19}/></div>
                  <strong>0h</strong><span>Study Time</span>
                  <small>Every minute counts</small>
                </div>
              </div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div>
                  <h3>Explore StudyVerse</h3>
                  <p>Everything you need, in one place</p>
                </div>
                <button className="text-action" onClick={() => changeTab('Learn')}>Explore <ChevronRight size={15}/></button>
              </div>

              <div className="shortcut-grid">
                {shortcuts.map((item) => {
                  const Icon = item.icon
                  return (
                    <button className="shortcut-card" key={item.title} onClick={() => {
                      changeTab(item.tab)
                      showMessage(`${item.title} section selected`)
                    }}>
                      <div className={`shortcut-icon ${item.color}`}><Icon size={22}/></div>
                      <div className="shortcut-text">
                        <strong>{item.title}</strong>
                        <span>{item.subtitle}</span>
                      </div>
                      <ChevronRight className="shortcut-arrow" size={17}/>
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div>
                  <h3>Daily Goals</h3>
                  <p>Small actions. Meaningful progress.</p>
                </div>
              </div>
              <div className="goal-card">
                <div className="goal-icon"><Target size={23}/></div>
                <div className="goal-info">
                  <strong>Your daily learning goal</strong>
                  <span>Complete your first learning activity to begin.</span>
                  <div className="progress-track"><div/></div>
                  <small>0% completed</small>
                </div>
                <span className="goal-percent">0%</span>
              </div>
            </section>

            <section className="section-block quote-card">
              <Sparkles size={20}/>
              <div>
                <strong>One step at a time.</strong>
                <p>Consistency is more powerful than occasional perfection.</p>
              </div>
            </section>
          </>
        ) : (
          <section className="empty-page">
            <div className="empty-icon">
              {activeTab === 'Learn' && <BookOpen size={35}/>}
              {activeTab === 'Mock' && <ClipboardCheck size={35}/>}
              {activeTab === 'Brain' && <Brain size={35}/>}
              {activeTab === 'Profile' && <UserRound size={35}/>}
            </div>
            <span className="eyebrow">STUDYVERSE / {activeTab.toUpperCase()}</span>
            <h2>{activeTab === 'Learn' ? 'Your Learning Space' : activeTab === 'Mock' ? 'Test Preparation' : activeTab === 'Brain' ? 'Brain Training' : 'Your Profile'}</h2>
            <p>{activeTab === 'Learn' ? 'Your books, notes, syllabus and study materials will live here.' : activeTab === 'Mock' ? 'Practice tests, exam results and performance analytics will appear here.' : activeTab === 'Brain' ? 'Challenge your thinking with interactive brain games.' : 'Manage your learning preferences and achievements.'}</p>
            <button className="back-home" onClick={() => changeTab('Home')}>Back to Home <ChevronRight size={17}/></button>
            <div className="coming-label"><Sparkles size={14}/> YOUR NEXT LEARNING DESTINATION</div>
          </section>
        )}
      </div>

      {message && <div className="toast">{message}</div>}

      <nav className="bottom-nav">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button key={item.name} className={activeTab === item.name ? 'nav-item active' : 'nav-item'} onClick={() => changeTab(item.name)}>
              <Icon size={21} strokeWidth={activeTab === item.name ? 2.4 : 1.8}/>
              <span>{item.name}</span>
              {activeTab === item.name && <i/>}
            </button>
          )
        })}
      </nav>
    </main>
  )
}

export default App
