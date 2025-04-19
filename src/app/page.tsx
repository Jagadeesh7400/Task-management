"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Zidio Task - Meeting and Task Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Meeting Interface */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule Meeting</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Select a date to schedule a meeting.
            </p>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            {date ? (
              <p className="mt-2">Selected date: {date.toLocaleDateString()}</p>
            ) : (
              <p className="mt-2">Please select a date.</p>
            )}
            <Button className="mt-4">Start Jitsi Meeting</Button>
          </CardContent>
        </Card>

        {/* Schedule Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-none p-0">
              <li className="mb-2">
                <strong>Project Kickoff</strong> - Tomorrow, 10:00 AM
              </li>
              <li className="mb-2">
                <strong>Team Sync</strong> - Wednesday, 2:00 PM
              </li>
              <li>
                <strong>Client Presentation</strong> - Friday, 11:00 AM
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Jitsi Integration Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Jitsi Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Jitsi Meet will be integrated here for seamless video conferencing.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
