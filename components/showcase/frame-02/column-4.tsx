"use client"

import * as React from "react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"

const cardTitle = "text-base leading-snug group-data-[size=sm]/card:text-base"

function SkeletonCard() {
  return (
    <Card size="sm">
      <CardContent className="gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="flex grow basis-0 flex-col gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
    </Card>
  )
}

const browserSlices = [
  {
    name: "Chrome",
    d: "M 155.8,81 A 60.8,60.8,0, 0,0, 78.361,22.521 L 81.317,32.909 A 50,50,0, 0,1, 145,81 Z",
    fill: "fill-chart-1",
  },
  {
    name: "Safari",
    d: "M 78.361,22.521 A 60.8,60.8,0, 0,0, 34.277,84.063 L 45.063,83.519 A 50,50,0, 0,1, 81.317,32.909 Z",
    fill: "fill-chart-2",
  },
  {
    name: "Firefox",
    d: "M 34.277,84.063 A 60.8,60.8,0, 0,0, 119.137,136.804 L 114.85,126.891 A 50,50,0, 0,1, 45.063,83.519 Z",
    fill: "fill-chart-3",
  },
  {
    name: "Edge",
    d: "M 119.137,136.804 A 60.8,60.8,0, 0,0, 155.8,81 L 145,81 A 50,50,0, 0,1, 114.85,126.891 Z",
    fill: "fill-chart-4",
  },
]

const browserLegend = [
  { name: "Chrome", swatch: "bg-chart-1" },
  { name: "Edge", swatch: "bg-chart-5" },
  { name: "Firefox", swatch: "bg-chart-4" },
  { name: "Safari", swatch: "bg-ring" },
]

function BrowserShareCard() {
  return (
    <Card size="sm" className="pb-0 text-xs">
      <CardHeader>
        <CardTitle className={cardTitle}>Browser Share</CardTitle>
        <CardDescription>January - June 2026</CardDescription>
        <CardAction>
          <Badge variant="outline">Firefox</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="relative mx-auto size-[190px]">
          <svg
            viewBox="0 0 190 190"
            className="size-full"
            role="img"
            aria-label="Browser share donut chart: 935 visitors"
          >
            {browserSlices.map((slice) => (
              <path
                key={slice.name}
                d={slice.d}
                className={slice.fill}
                stroke="transparent"
                strokeWidth={5}
              />
            ))}
            <text x="95" y="95" textAnchor="middle">
              <tspan
                x="95"
                y="79"
                className="fill-foreground text-2xl font-bold"
              >
                935
              </tspan>
              <tspan x="95" y="99" className="fill-muted-foreground text-xs">
                Visitors
              </tspan>
            </text>
          </svg>
          <div className="absolute bottom-[5px] left-[5px] flex w-[180px] translate-y-2 items-center justify-center gap-4 pt-3">
            {browserLegend.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className={`size-2 shrink-0 rounded-xs ${item.swatch}`} />
                <span className="text-xs text-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2 border-t bg-muted/50 py-4">
        <Progress
          value={31}
          locale="en-US"
          className="gap-x-3 gap-y-2 [&_[data-slot=progress-indicator]]:bg-chart-4 [&_[data-slot=progress-track]]:h-1"
        >
          <ProgressLabel className="text-xs font-medium">Firefox</ProgressLabel>
          <ProgressValue className="text-xs" />
        </Progress>
      </CardFooter>
    </Card>
  )
}

const teamAvatars = [
  { src: "/showcase/f02-c4-avatar-1.jpg", alt: "Team member 1" },
  { src: "/showcase/f02-c4-avatar-2.png", alt: "Team member 2" },
  { src: "/showcase/f02-c4-avatar-3.png", alt: "Team member 3" },
]

function NoTeamMembersCard() {
  return (
    <Card size="sm">
      <CardContent>
        <Empty className="h-56 gap-4 rounded-xl border border-dashed p-6">
          <EmptyHeader className="gap-2">
            <EmptyMedia>
              <div className="flex -space-x-2 grayscale">
                {teamAvatars.map((avatar) => (
                  <Image
                    key={avatar.src}
                    src={avatar.src}
                    alt={avatar.alt}
                    width={40}
                    height={40}
                    className="size-10 shrink-0 rounded-full object-cover ring-2 ring-background"
                  />
                ))}
              </div>
            </EmptyMedia>
            <EmptyTitle className="text-sm font-medium tracking-tight">
              No Team Members
            </EmptyTitle>
            <EmptyDescription>
              Invite your team to collaborate on this project.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="gap-2.5">
            <Button
              size="sm"
              className="h-7 rounded-md bg-brand px-2.5 text-[13px] text-brand-foreground hover:bg-brand/90"
            >
              Invite Members
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}

const severityItems = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
]

const componentItems = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Settings", value: "settings" },
  { label: "Billing", value: "billing" },
  { label: "Authentication", value: "authentication" },
  { label: "API", value: "api" },
]

function ReportBugCard() {
  const [severity, setSeverity] = React.useState<string | null>("medium")
  const [component, setComponent] = React.useState<string | null>("dashboard")

  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className={cardTitle}>Report Bug</CardTitle>
        <CardDescription>Help us fix issues faster.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-5">
          <Field className="gap-2">
            <FieldLabel htmlFor="f02-c4-bug-title">Title</FieldLabel>
            <Input
              id="f02-c4-bug-title"
              placeholder="Brief description of the issue"
              className="h-8 rounded-lg"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field className="gap-2">
              <FieldLabel htmlFor="f02-c4-bug-severity">Severity</FieldLabel>
              <Select
                items={severityItems}
                value={severity}
                onValueChange={setSeverity}
              >
                <SelectTrigger
                  id="f02-c4-bug-severity"
                  size="sm"
                  className="w-full rounded-lg"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {severityItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field className="gap-2">
              <FieldLabel htmlFor="f02-c4-bug-component">Component</FieldLabel>
              <Select
                items={componentItems}
                value={component}
                onValueChange={setComponent}
              >
                <SelectTrigger
                  id="f02-c4-bug-component"
                  size="sm"
                  className="w-full rounded-lg"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {componentItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field className="gap-2">
            <FieldLabel htmlFor="f02-c4-bug-steps">
              Steps to reproduce
            </FieldLabel>
            <Textarea
              id="f02-c4-bug-steps"
              placeholder={"1. Go to\n2. Click on\n3. Observe..."}
              className="min-h-24 rounded-lg leading-5"
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="justify-end gap-2 border-t bg-muted/50 py-4">
        <Button variant="outline" size="sm" className="rounded-lg">
          Attach File
        </Button>
        <Button
          size="sm"
          className="rounded-lg bg-brand text-brand-foreground hover:bg-brand/90"
        >
          Submit Bug
        </Button>
      </CardFooter>
    </Card>
  )
}

const contributors = [
  "/showcase/f02-c4-avatar-1.jpg",
  "/showcase/f02-c4-contributor-02.png",
  "/showcase/f02-c4-contributor-03.jpg",
  "/showcase/f02-c4-contributor-04.png",
  "/showcase/f02-c4-contributor-05.png",
  "/showcase/f02-c4-contributor-06.png",
  "/showcase/f02-c4-contributor-07.png",
  "/showcase/f02-c4-contributor-08.png",
  "/showcase/f02-c4-contributor-09.png",
  "/showcase/f02-c4-contributor-10.jpg",
  "/showcase/f02-c4-contributor-11.png",
  "/showcase/f02-c4-contributor-12.png",
  "/showcase/f02-c4-contributor-13.png",
  "/showcase/f02-c4-contributor-14.png",
  "/showcase/f02-c4-contributor-15.png",
  "/showcase/f02-c4-contributor-16.png",
]

function ContributorsCard() {
  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className={cardTitle}>Contributors 312</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {contributors.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Contributor ${index + 1}`}
              width={32}
              height={32}
              className="size-8 shrink-0 rounded-full object-cover grayscale"
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 py-4">
        <a
          href="#"
          className="text-sm text-foreground underline decoration-1 underline-offset-4"
        >
          + 810 contributors
        </a>
      </CardFooter>
    </Card>
  )
}

export function Frame02Column4() {
  return (
    <div className="flex w-full flex-col gap-10">
      <SkeletonCard />
      <BrowserShareCard />
      <NoTeamMembersCard />
      <ReportBugCard />
      <ContributorsCard />
    </div>
  )
}
