import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, addMonths, subMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Heart, ChevronLeft, ChevronRight, Droplets, Moon, Sun, Smile, Frown, Meh, Sparkles, Lock, Apple, Bell } from "lucide-react";

const moodIcons = {
  happy: { icon: Smile, color: "text-green-500", bg: "bg-green-100" },
  neutral: { icon: Meh, color: "text-amber-500", bg: "bg-amber-100" },
  sad: { icon: Frown, color: "text-blue-500", bg: "bg-blue-100" },
};

const HerHealth = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [periodDays, setPeriodDays] = useState<Date[]>([
    new Date(2024, 10, 5), new Date(2024, 10, 6), new Date(2024, 10, 7), new Date(2024, 10, 8), new Date(2024, 10, 9)
  ]);
  const [moods, setMoods] = useState<Record<string, keyof typeof moodIcons>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [currentNote, setCurrentNote] = useState("");
  const [currentMood, setCurrentMood] = useState<keyof typeof moodIcons | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = monthStart.getDay();

  const isPeriodDay = (date: Date) => periodDays.some(d => isSameDay(d, date));

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const dateKey = format(date, "yyyy-MM-dd");
    setCurrentNote(notes[dateKey] || "");
    setCurrentMood(moods[dateKey] || null);
  };

  const togglePeriod = () => {
    if (!selectedDate) return;
    if (isPeriodDay(selectedDate)) {
      setPeriodDays(periodDays.filter(d => !isSameDay(d, selectedDate)));
    } else {
      setPeriodDays([...periodDays, selectedDate]);
    }
  };

  const saveDayData = () => {
    if (!selectedDate) return;
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    if (currentNote) setNotes({ ...notes, [dateKey]: currentNote });
    if (currentMood) setMoods({ ...moods, [dateKey]: currentMood });
  };

  const aiTips = [
    "💧 Stay hydrated! Aim for 8 glasses of water today.",
    "🧘 Try 10 minutes of gentle yoga for relaxation.",
    "🍵 Chamomile tea can help ease cramps naturally.",
    "😴 Prioritize 7-9 hours of sleep for hormonal balance.",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <div className="w-12 h-12 rounded-2xl bg-health flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">HerHealth+</h1>
            <p className="text-muted-foreground">Track your wellness journey</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2 p-6 shadow-card animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {days.map(day => {
                const dateKey = format(day, "yyyy-MM-dd");
                const dayMood = moods[dateKey];
                const MoodIcon = dayMood ? moodIcons[dayMood].icon : null;
                
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => handleDateClick(day)}
                    className={`
                      relative p-2 h-14 rounded-xl text-sm font-medium transition-all
                      ${isToday(day) ? "ring-2 ring-primary" : ""}
                      ${selectedDate && isSameDay(day, selectedDate) ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}
                      ${isPeriodDay(day) && !(selectedDate && isSameDay(day, selectedDate)) ? "bg-rose-100 text-rose-600" : ""}
                    `}
                  >
                    {format(day, "d")}
                    {isPeriodDay(day) && (
                      <Droplets className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 text-rose-500" />
                    )}
                    {MoodIcon && !isPeriodDay(day) && (
                      <MoodIcon className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 ${moodIcons[dayMood].color}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-rose-100 flex items-center justify-center">
                  <Droplets className="w-3 h-3 text-rose-500" />
                </div>
                <span className="text-muted-foreground">Period Day</span>
              </div>
              {Object.entries(moodIcons).map(([mood, { icon: Icon, color, bg }]) => (
                <div key={mood} className="flex items-center gap-2 text-sm">
                  <div className={`w-4 h-4 rounded ${bg} flex items-center justify-center`}>
                    <Icon className={`w-3 h-3 ${color}`} />
                  </div>
                  <span className="text-muted-foreground capitalize">{mood}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Selected Day Card */}
            <Card className="p-6 shadow-card animate-fade-in" style={{ animationDelay: "100ms" }}>
              <h3 className="font-semibold text-foreground mb-4">
                {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a day"}
              </h3>
              
              {selectedDate && (
                <>
                  <Button
                    variant={isPeriodDay(selectedDate) ? "default" : "outline"}
                    className="w-full mb-4"
                    onClick={togglePeriod}
                  >
                    <Droplets className="w-4 h-4 mr-2" />
                    {isPeriodDay(selectedDate) ? "Remove Period" : "Mark as Period"}
                  </Button>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-2">How are you feeling?</p>
                    <div className="flex gap-2">
                      {Object.entries(moodIcons).map(([mood, { icon: Icon, color, bg }]) => (
                        <button
                          key={mood}
                          onClick={() => setCurrentMood(mood as keyof typeof moodIcons)}
                          className={`
                            flex-1 p-3 rounded-xl transition-all
                            ${currentMood === mood ? `${bg} ring-2 ring-offset-2 ring-primary` : "bg-secondary hover:bg-accent"}
                          `}
                        >
                          <Icon className={`w-5 h-5 mx-auto ${color}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-2">Notes</p>
                    <Textarea
                      placeholder="How are you feeling today?"
                      value={currentNote}
                      onChange={(e) => setCurrentNote(e.target.value)}
                      className="resize-none"
                      rows={3}
                    />
                  </div>

                  <Button onClick={saveDayData} className="w-full">
                    Save Entry
                  </Button>
                </>
              )}
            </Card>

            {/* AI Tips */}
            <Card className="p-6 shadow-card animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">AI Wellness Tips</h3>
              </div>
              <ul className="space-y-3">
                {aiTips.map((tip, i) => (
                  <li key={i} className="text-sm text-muted-foreground p-3 bg-secondary rounded-lg">
                    {tip}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Premium Features */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">Premium</Badge>
            Unlock Advanced Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "PCOS/PCOD Detector", description: "AI-powered symptom analysis for early detection and personalized recommendations." },
              { icon: Apple, title: "AI Diet Planner", description: "Get customized meal plans based on your cycle phase and health goals." },
              { icon: Bell, title: "Smart Reminders", description: "Hydration alerts, medication reminders, and self-care notifications." },
            ].map((feature, i) => (
              <Card key={feature.title} className="p-6 shadow-card relative overflow-hidden group animate-fade-in" style={{ animationDelay: `${300 + i * 100}ms` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Lock className="w-4 h-4" />
                    Unlock
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HerHealth;