"use client"

import * as React from "react"
import {
  IconCheck,
  IconCircleCheckFilled,
  IconCopy,
  IconPlus,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const brandButton = "bg-brand text-brand-foreground hover:bg-brand/90"
const cardTitle =
  "text-base leading-[1.375] group-data-[size=sm]/card:text-base"

/* ------------------------------------------------------------------ */
/* Environment Variables                                               */
/* ------------------------------------------------------------------ */

const envVars = [
  { key: "DATABASE_URL", value: "••••••••" },
  { key: "NEXT_PUBLIC_API", value: "https://api.example.com" },
  { key: "STRIPE_SECRET", value: "••••••••" },
]

function EnvironmentVariablesCard() {
  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className={cardTitle}>Environment Variables</CardTitle>
        <CardDescription>Production · 8 variables</CardDescription>
      </CardHeader>
      <CardContent className="gap-2">
        {envVars.map((v) => (
          <div
            key={v.key}
            className="flex items-center gap-2 rounded-md px-2.5 py-2 ring-1 ring-border"
          >
            <span className="shrink-0 font-mono text-xs leading-4 font-medium">
              {v.key}
            </span>
            <span className="ml-auto min-w-0 truncate font-mono text-xs leading-4 text-muted-foreground">
              {v.value}
            </span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-4">
        <Button size="sm" variant="outline" className="rounded-lg">
          Edit
        </Button>
        <Button size="sm" className={`ml-auto rounded-lg ${brandButton}`}>
          Deploy
        </Button>
      </CardFooter>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Traffic channels                                                    */
/* ------------------------------------------------------------------ */

const traffic = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]
const TRAFFIC_MAX = 320

function TrafficChart() {
  return (
    <div
      className="relative h-45 w-full"
      role="img"
      aria-label="Monthly desktop and mobile traffic, January to June"
    >
      {/* plot area: 8px top inset, 114px tall */}
      <div className="absolute inset-x-0 top-2 h-[114px]">
        {[0, 50, 100].map((top) => (
          <div
            key={top}
            className="absolute inset-x-0 border-t border-dashed border-foreground/5"
            style={{ top: `${top}%` }}
          />
        ))}
        <div className="absolute inset-0 flex items-end">
          {traffic.map((d) => (
            <div
              key={d.month}
              className="flex h-full flex-1 items-end justify-center gap-1"
              title={`${d.month}: ${d.desktop} desktop · ${d.mobile} mobile`}
            >
              <div
                className="w-[21px] rounded-t-sm bg-chart-1"
                style={{ height: `${(d.desktop / TRAFFIC_MAX) * 100}%` }}
              />
              <div
                className="w-[21px] rounded-t-sm bg-chart-2"
                style={{ height: `${(d.mobile / TRAFFIC_MAX) * 100}%` }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* x-axis labels */}
      <div className="absolute inset-x-0 top-[132px] flex">
        {traffic.map((d) => (
          <span
            key={d.month}
            className="flex-1 text-center text-xs leading-4 text-neutral-500"
          >
            {d.month}
          </span>
        ))}
      </div>
      {/* legend */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-4 pt-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2 shrink-0 rounded-xs bg-chart-1" />
          <span className="text-xs">Desktop</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 shrink-0 rounded-xs bg-chart-2" />
          <span className="text-xs">Mobile</span>
        </div>
      </div>
    </div>
  )
}

function TrafficChannelsCard() {
  const desktop = traffic.reduce((sum, d) => sum + d.desktop, 0)
  const mobile = traffic.reduce((sum, d) => sum + d.mobile, 0)
  const delta = Math.round((desktop / mobile - 1) * 100)
  const stats = [
    { label: "Desktop", value: desktop.toLocaleString("en-US") },
    { label: "Mobile", value: mobile.toLocaleString("en-US") },
    { label: "Mix Delta", value: `${delta >= 0 ? "+" : ""}${delta}%` },
  ]

  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className="text-lg leading-[1.375] group-data-[size=sm]/card:text-lg">
          Traffic channels
        </CardTitle>
        <CardDescription className="line-clamp-2 leading-[1.375]">
          Monthly desktop and mobile traffic for the last six months—compare
          volume and mix across platforms and devices at a glance.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <TrafficChart />
        <div className="grid w-full grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={
                i < stats.length - 1
                  ? "border-r border-foreground/6 px-2"
                  : "px-2"
              }
            >
              <div className="text-center text-[10px] leading-[1.42857] text-muted-foreground uppercase">
                {s.label}
              </div>
              <div className="text-center text-sm font-medium tabular-nums">
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-4">
        <Button size="sm" className={`w-full rounded-lg ${brandButton}`}>
          View report
        </Button>
      </CardFooter>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Invite Team                                                         */
/* ------------------------------------------------------------------ */

const roles = [
  { label: "Owner", value: "owner" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
]

type Invite = { id: number; email: string; role: string }

const INVITE_LINK = "https://app.co/invite/x8f2k"

function InviteTeamCard() {
  const [invites, setInvites] = React.useState<Invite[]>([
    { id: 1, email: "alex@example.com", role: "editor" },
    { id: 2, email: "sam@example.com", role: "viewer" },
  ])
  const [copied, setCopied] = React.useState(false)

  const updateInvite = (id: number, patch: Partial<Invite>) =>
    setInvites((list) =>
      list.map((inv) => (inv.id === id ? { ...inv, ...patch } : inv))
    )

  const addInvite = () =>
    setInvites((list) => [
      ...list,
      { id: Date.now(), email: "", role: "viewer" },
    ])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(INVITE_LINK)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className={cardTitle}>Invite Team</CardTitle>
        <CardDescription>Add members to your workspace</CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <div className="flex flex-col gap-3">
          {invites.map((inv, i) => (
            <div key={inv.id} className="flex items-center gap-2">
              <Input
                type="email"
                value={inv.email}
                placeholder="name@example.com"
                aria-label={`Invite ${i + 1} email`}
                onChange={(e) =>
                  updateInvite(inv.id, { email: e.target.value })
                }
                className="h-8 flex-1 rounded-lg"
              />
              <Select
                items={roles}
                value={inv.role}
                onValueChange={(role) =>
                  updateInvite(inv.id, { role: String(role) })
                }
              >
                <SelectTrigger
                  size="sm"
                  aria-label={`Invite ${i + 1} role`}
                  className="w-24 rounded-lg"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <Button
          size="sm"
          variant="outline"
          className="w-full rounded-lg"
          onClick={addInvite}
        >
          <IconPlus data-icon="inline-start" />
          Add another
        </Button>
        <Separator />
        <Field className="gap-2">
          <FieldLabel htmlFor="f02-invite-link">
            Or share invite link
          </FieldLabel>
          <InputGroup className="h-8 rounded-lg">
            <InputGroupInput
              id="f02-invite-link"
              readOnly
              value={INVITE_LINK}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                aria-label={copied ? "Copied" : "Copy invite link"}
                onClick={copyLink}
              >
                {copied ? <IconCheck /> : <IconCopy />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-4">
        <Button size="sm" className={`w-full rounded-lg ${brandButton}`}>
          Send Invites
        </Button>
      </CardFooter>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Vercel Agent                                                        */
/* ------------------------------------------------------------------ */

const agentFeatures = [
  "Code reviews with full codebase context to catch hard-to-find bugs",
  "Code suggestions validated in sandboxes before you merge",
  "Root-cause analysis for production issues with deployment context",
]

function VercelAgentCard() {
  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className={cardTitle}>
          Ship faster &amp; safer with Vercel Agent
        </CardTitle>
        <CardDescription>
          Your use is subject to Vercel&apos;s Public Beta Agreement and AI
          Product Terms.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <ul className="flex flex-col gap-3">
          {agentFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <IconCircleCheckFilled className="mt-0.5 size-4 shrink-0 text-foreground" />
              <span className="min-w-0 text-sm text-muted-foreground">
                {feature}
              </span>
            </li>
          ))}
        </ul>
        <div className="rounded-lg border border-border px-2.5 py-2 text-sm text-muted-foreground">
          Pro teams get $100 in Vercel Agent trial credit for 2 weeks after
          activation.
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2 border-t bg-muted/50 p-4">
        <Button size="sm" variant="outline" className="rounded-lg">
          Cancel
        </Button>
        <Button size="sm" className={`rounded-lg ${brandButton}`}>
          Enable with $100 credits
        </Button>
      </CardFooter>
    </Card>
  )
}

export function Frame02Column3() {
  return (
    <div className="flex w-full flex-col gap-10">
      <EnvironmentVariablesCard />
      <TrafficChannelsCard />
      <InviteTeamCard />
      <VercelAgentCard />
    </div>
  )
}
