/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AcademicPrograms } from './components/AcademicPrograms';
import { CampusFacilities } from './components/CampusFacilities';
import { StudentLife } from './components/StudentLife';
import { PrincipalWelcome } from './components/PrincipalWelcome';
import { EventsAndAnnouncements } from './components/EventsAndAnnouncements';
import { CommunityProof } from './components/CommunityProof';
import { Footer } from './components/Footer';
import { AdmissionsModal } from './components/AdmissionsModal';
import { VirtualTourModal } from './components/VirtualTourModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [admissionsOpen, setAdmissionsOpen] = useState<boolean>(false);
  const [virtualTourOpen, setVirtualTourOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleFacilityClick = (facilityName: string) => {
    setVirtualTourOpen(true);
    showToast(`Exploring ${facilityName} in the Virtual Tour`);
  };

  const handleLearnMoreProgram = (programTitle: string) => {
    setAdmissionsOpen(true);
    showToast(`Inquiring about ${programTitle}`);
  };

  const handleRSVPEvent = (eventName: string) => {
    showToast(`RSVP Confirmed for "${eventName}"`);
  };

  return (
    <div className="min-h-screen bg-[#070d19] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900/95 border border-amber-500/50 text-amber-200 text-xs shadow-2xl flex items-center gap-2.5 animate-fadeIn backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar onOpenAdmissions={() => setAdmissionsOpen(true)} />

      {/* Main Homepage Flow */}
      <main className="flex-1">
        {/* 1. Hero Section with Cinematic Campus Imagery & KPI Strip */}
        <Hero
          onOpenAdmissions={() => setAdmissionsOpen(true)}
          onOpenVirtualTour={() => setVirtualTourOpen(true)}
        />

        {/* 2. Principal's Welcome Address & Values */}
        <PrincipalWelcome />

        {/* 3. Academic Programs & Scaffolded Divisions */}
        <AcademicPrograms onLearnMore={handleLearnMoreProgram} />

        {/* 4. Campus Facilities Showcase (AI-Generated High-Fidelity Assets) */}
        <CampusFacilities onFacilityClick={handleFacilityClick} />

        {/* 5. Student Life & The Four Collegiate Houses */}
        <StudentLife />

        {/* 6. Upcoming Events Calendar & Announcements */}
        <EventsAndAnnouncements onRSVP={handleRSVPEvent} />

        {/* 7. Community Testimonials & Accreditations */}
        <CommunityProof />
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Interactive Admissions & Tour Booking Modal */}
      <AdmissionsModal
        isOpen={admissionsOpen}
        onClose={() => setAdmissionsOpen(false)}
      />

      {/* Interactive Virtual Campus Walkthrough Modal */}
      <VirtualTourModal
        isOpen={virtualTourOpen}
        onClose={() => setVirtualTourOpen(false)}
      />
    </div>
  );
}
