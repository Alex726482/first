import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Bell, ArrowRight, Check } from 'lucide-react';

interface EventsProps {
  onRSVP: (eventName: string) => void;
}

export const EventsAndAnnouncements: React.FC<EventsProps> = ({ onRSVP }) => {
  const [rsvpList, setRsvpList] = useState<string[]>([]);

  const events = [
    {
      id: 'open-house',
      date: 'NOV 15',
      time: '09:00 AM – 01:00 PM',
      title: 'Annual Campus Open Day & Admissions Showcase',
      location: 'Grand Auditorium & Academic Wings',
      desc: 'Meet faculty heads, explore student science exhibits, witness live robotics demonstrations, and consult with admissions counselors.',
      category: 'Admissions & Community',
    },
    {
      id: 'science-expo',
      date: 'DEC 04',
      time: '10:00 AM – 04:00 PM',
      title: 'Brilliant Minds: K–12 STEM & Innovation Fair',
      location: 'Science Complex & Quadrangle',
      desc: 'Over 80 original research projects presented by students, featuring clean-energy prototypes, AI coding models, and botanical studies.',
      category: 'Academics & Science',
    },
    {
      id: 'theatre-gala',
      date: 'DEC 18',
      time: '06:30 PM – 09:00 PM',
      title: 'Winter Theatre Gala: Shakespeare’s “The Tempest”',
      location: 'Amphitheatre & Performing Arts Centre',
      desc: 'Staged by the Senior Drama Society accompanied by the Brilliant Star Philharmonic Ensemble. Open to parents and patrons.',
      category: 'Arts & Culture',
    },
  ];

  const handleToggleRSVP = (eventName: string) => {
    if (rsvpList.includes(eventName)) {
      setRsvpList(rsvpList.filter((e) => e !== eventName));
    } else {
      setRsvpList([...rsvpList, eventName]);
      onRSVP(eventName);
    }
  };

  return (
    <section id="events" className="py-20 bg-[#060b15] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Campus Calendar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-crest text-white tracking-tight">
              Upcoming Events &amp; Notices
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              Stay connected with term schedules, competitive symposiums, and cultural milestones.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800">
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Academic Term 1 Examinations Conclude Nov 28</span>
          </div>
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const hasRsvp = rsvpList.includes(event.title);
            return (
              <div
                key={event.id}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono font-bold text-xs">
                      {event.date}
                    </span>
                    <span className="text-[11px] text-slate-400">{event.category}</span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold font-crest text-white leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {event.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleRSVP(event.title)}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    hasRsvp
                      ? 'bg-emerald-950 border border-emerald-600 text-emerald-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {hasRsvp ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>RSVP Confirmed</span>
                    </>
                  ) : (
                    <>
                      <span>RSVP for Event</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
