"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const cardTitle = "text-base leading-snug group-data-[size=sm]/card:text-base"
const brandButton = "bg-brand text-brand-foreground hover:bg-brand/90"

const topicItems = [
  { label: "Bug report", value: "bug" },
  { label: "Feature request", value: "feature" },
  { label: "Billing", value: "billing" },
  { label: "General", value: "general" },
]

function FeedbackCard() {
  const [topic, setTopic] = React.useState<string | null>(null)

  return (
    <Card size="sm" className="pb-0">
      <CardContent>
        <FieldGroup className="gap-5">
          <Field className="gap-2">
            <FieldLabel htmlFor="f02-c5-topic">Topic</FieldLabel>
            <Select items={topicItems} value={topic} onValueChange={setTopic}>
              <SelectTrigger
                id="f02-c5-topic"
                size="sm"
                className="w-full rounded-lg data-placeholder:text-foreground"
              >
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                {topicItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="f02-c5-feedback">Feedback</FieldLabel>
            <Textarea
              id="f02-c5-feedback"
              placeholder="Your feedback helps us improve..."
              className="min-h-16 rounded-lg"
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 py-4">
        <Button size="sm" className={`rounded-lg ${brandButton}`}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}

const timeSlots = ["9:00 AM", "10:30 AM", "11:00 AM", "1:30 PM"]

function BookAppointmentCard() {
  const [slot, setSlot] = React.useState(timeSlots[0])

  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className={cardTitle}>Book Appointment</CardTitle>
        <CardDescription>Dr. Sarah Chen · Cardiology</CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm leading-none font-medium">
            Available on March 18, 2026
          </div>
          <ToggleGroup
            size="sm"
            spacing={2}
            value={[slot]}
            onValueChange={(value) => {
              if (value[0]) setSlot(value[0])
            }}
            aria-label="Available time slots"
          >
            {timeSlots.map((time) => (
              <ToggleGroupItem key={time} value={time}>
                {time}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <Item variant="outline" size="xs" className="rounded-lg">
          <ItemContent className="group-data-[size=xs]/item:gap-0.5">
            <ItemTitle className="leading-5">New patient?</ItemTitle>
            <ItemDescription className="leading-5 group-data-[size=xs]/item:text-sm">
              Please arrive 15 minutes early.
            </ItemDescription>
          </ItemContent>
        </Item>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 py-4">
        <Button size="sm" className={`w-full rounded-lg ${brandButton}`}>
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  )
}

// Stacked segments per bar (bottom → top), in units of the 12-unit chart height.
const sleepBars = [
  { deep: 0, light: 6, rem: 0 },
  { deep: 4, light: 2, rem: 0 },
  { deep: 8, light: 0, rem: 2 },
  { deep: 6, light: 1, rem: 3 },
  { deep: 2, light: 4, rem: 6 },
  { deep: 5, light: 2, rem: 4 },
  { deep: 3, light: 5, rem: 2 },
  { deep: 1, light: 7, rem: 3 },
  { deep: 0, light: 4, rem: 5 },
]
const SLEEP_MAX = 12

const sleepStats = [
  { value: "2h 10m", label: "Deep" },
  { value: "3h 48m", label: "Light" },
  { value: "1h 26m", label: "REM" },
  { value: "84", label: "Score" },
]

function SleepReportCard() {
  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className={cardTitle}>Sleep Report</CardTitle>
        <CardDescription>Last night · 7h 24m</CardDescription>
      </CardHeader>
      <CardContent className="gap-3">
        <div
          role="img"
          aria-label="Sleep stages by hour"
          className="grid h-32 grid-cols-9 items-end justify-items-center"
        >
          {sleepBars.map((bar, index) => (
            <div key={index} className="flex h-full w-4 flex-col-reverse">
              <div
                className="bg-chart-1"
                style={{ height: `${(bar.deep / SLEEP_MAX) * 100}%` }}
              />
              <div
                className="bg-chart-2"
                style={{ height: `${(bar.light / SLEEP_MAX) * 100}%` }}
              />
              <div
                className="bg-chart-3"
                style={{ height: `${(bar.rem / SLEEP_MAX) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 text-center">
          {sleepStats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-sm font-semibold tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t bg-muted/50 py-4">
        <Badge variant="outline">Good</Badge>
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-md px-2.5 text-[13px]"
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  )
}

const emailItems = [
  { label: "m@shadcn.com", value: "m@shadcn.com" },
  { label: "m@example.com", value: "m@example.com" },
  { label: "m@support.com", value: "m@support.com" },
]

function ProfileCard() {
  const [email, setEmail] = React.useState<string | null>("m@shadcn.com")

  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className={cardTitle}>Profile</CardTitle>
        <CardDescription>Manage your profile information.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-5">
          <Field className="gap-2">
            <FieldLabel htmlFor="f02-c5-name">Name</FieldLabel>
            <Input
              id="f02-c5-name"
              placeholder="shadcn"
              className="h-8 rounded-lg"
            />
            <FieldDescription className="mt-0 nth-last-2:mt-0">
              Your name may appear around GitHub where you contribute or are
              mentioned. You can remove it at any time.
            </FieldDescription>
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="f02-c5-email">Public Email</FieldLabel>
            <Select items={emailItems} value={email} onValueChange={setEmail}>
              <SelectTrigger
                id="f02-c5-email"
                size="sm"
                className="w-full rounded-lg"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {emailItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldDescription className="mt-0 nth-last-2:mt-0">
              You can manage verified email addresses in your email settings.
            </FieldDescription>
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="f02-c5-bio">Bio</FieldLabel>
            <Textarea
              id="f02-c5-bio"
              placeholder="Tell us a little bit about yourself"
              className="min-h-16 rounded-lg"
            />
            <FieldDescription className="mt-0 nth-last-2:mt-0">
              You can @mention other users and organizations to link to them.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 py-4">
        <Button size="sm" className={`rounded-lg ${brandButton}`}>
          Save Profile
        </Button>
      </CardFooter>
    </Card>
  )
}

export function Frame02Column5() {
  return (
    <div className="flex w-full flex-col gap-10">
      <FeedbackCard />
      <BookAppointmentCard />
      <SleepReportCard />
      <ProfileCard />
    </div>
  )
}
