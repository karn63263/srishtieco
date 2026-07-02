import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'

import Home from './pages/Home'
import { AuthProvider } from './portal/context/auth'
import { ProtectedRoute } from './portal/components/ProtectedRoute'
import Login from './portal/pages/Login'
import Dashboard from './portal/pages/Dashboard'
import Projects from './portal/pages/Projects'
import Reports from './portal/pages/Reports'
import Documents from './portal/pages/Documents'
import Tasks from './portal/pages/Tasks'
import Maps from './portal/pages/Maps'
import Invoices from './portal/pages/Invoices'
import Messages from './portal/pages/Messages'
import Calendar from './portal/pages/Calendar'
import Support from './portal/pages/Support'
import Settings from './portal/pages/Settings'
import Notifications from './portal/pages/Notifications'
import Overview from './portal/pages/Overview'

const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Industries = lazy(() => import('./pages/Industries'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#021C18] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#00E676] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/contact" element={<Contact />} />

          {/* Portal Routes - Auth */}
          <Route path="/portal/login" element={<Login />} />

          {/* Portal Routes - Protected Dashboard */}
          <Route
            path="/portal/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/overview"
            element={
              <ProtectedRoute>
                <Overview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/documents"
            element={
              <ProtectedRoute>
                <Documents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/maps"
            element={
              <ProtectedRoute>
                <Maps />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/invoices"
            element={
              <ProtectedRoute>
                <Invoices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/calendar"
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/support"
            element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  )
}
