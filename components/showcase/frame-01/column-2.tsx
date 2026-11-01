"use client"

import * as React from "react"
import {
  IconClockHour4,
  IconSun,
  IconTemperatureSun,
  IconVolume,
  IconX,
} from "@tabler/icons-react"

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
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Brand-coloured overrides for primitives whose inner parts aren't exposed.
const brandSlider =
  "[&_[data-slot=slider-range]]:bg-brand [&_[data-slot=slider-thumb]]:size-3 [&_[data-slot=slider-thumb]]:border-brand [&_[data-slot=slider-track]]:h-1!"
const brandSwitch =
  "data-checked:bg-brand [&_[data-slot=switch-thumb]]:bg-white!"

function CloseButton() {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Close"
      className="size-7 rounded-md bg-muted"
    >
      <IconX stroke={2} />
    </Button>
  )
}

function CurrencySelect({ id }: { id: string }) {
  return (
    <NativeSelect id={id} size="sm" defaultValue="usd" className="w-full">
      <NativeSelectOption value="usd">
        USD — United States Dollar
      </NativeSelectOption>
      <NativeSelectOption value="eur">EUR — Euro</NativeSelectOption>
      <NativeSelectOption value="gbp">GBP — British Pound</NativeSelectOption>
      <NativeSelectOption value="cad">CAD — Canadian Dollar</NativeSelectOption>
    </NativeSelect>
  )
}

/* -------------------------------------------------------------------------- */
/*                              Payout Threshold                              */
/* -------------------------------------------------------------------------- */

function PayoutThresholdCard() {
  const [amount, setAmount] = React.useState(2500)

  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className="group-data-[size=sm]/card:text-base">
          Payout Threshold
        </CardTitle>
        <CardDescription>
          Set the minimum balance required before a payout is triggered.
        </CardDescription>
        <CardAction>
          <CloseButton />
        </CardAction>
      </CardHeader>
      <CardContent className="gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="f01c2-payout-currency">Preferred Currency</Label>
          <CurrencySelect id="f01c2-payout-currency" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-4">
            <Label id="f01c2-payout-amount-label">Minimum Payout Amount</Label>
            <span className="text-2xl font-semibold text-foreground tabular-nums">
              ${amount.toFixed(2)}
            </span>
          </div>
          <Slider
            aria-labelledby="f01c2-payout-amount-label"
            value={[amount]}
            onValueChange={(value) =>
              setAmount(Array.isArray(value) ? value[0] : value)
            }
            min={50}
            max={10000}
            step={50}
            className={brandSlider}
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>$50 (MIN)</span>
            <span>$10,000 (MAX)</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="f01c2-payout-notes">Notes</Label>
          <Textarea
            id="f01c2-payout-notes"
            placeholder="Add any notes for this payout configuration..."
            className="min-h-24 resize-none"
          />
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 py-4">
        <Button
          size="sm"
          className="w-full rounded-lg bg-brand text-brand-foreground hover:bg-brand/90"
        >
          Save Threshold
        </Button>
      </CardFooter>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                              Claimable Balance                             */
/* -------------------------------------------------------------------------- */

const balanceRows = [
  { label: "Net Royalties", value: "$0.00" },
  { label: "Processing Fee", value: "-$0.00" },
]

function ClaimableBalanceCard() {
  return (
    <Card size="sm" className="pb-0">
      <CardContent className="items-start">
        <div className="text-sm text-muted-foreground">Claimable Balance</div>
        <div className="text-5xl leading-none font-medium tracking-tight text-foreground tabular-nums">
          $0.00
        </div>
        <Badge variant="outline">
          <span
            className="size-1.5 rounded-full bg-amber-500"
            aria-hidden="true"
          />
          Pending Setup
        </Badge>
      </CardContent>
      <CardContent>
        <div className="flex flex-col gap-3 rounded-lg border border-transparent bg-muted/50 px-3 py-2.5 text-sm">
          {balanceRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-muted-foreground">{row.label}</span>
              <span className="font-medium text-foreground tabular-nums">
                {row.value}
              </span>
            </div>
          ))}
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Ready to Claim</span>
            <span className="font-semibold text-foreground tabular-nums">
              $0.00 USD
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 py-4">
        <p className="text-sm text-muted-foreground">
          Once your bank is connected, balances over $10.00 are automatically
          eligible for monthly distribution on the 15th of each month.
        </p>
      </CardFooter>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 Preferences                                */
/* -------------------------------------------------------------------------- */

const preferenceToggles = [
  {
    id: "f01c2-public-stats",
    title: "Public Statistics",
    description:
      "Allow others to see your total stream count and listening activity",
  },
  {
    id: "f01c2-email-notifications",
    title: "Email Notifications",
    description: "Monthly royalty reports and distribution updates",
  },
]

function PreferencesCard() {
  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className="group-data-[size=sm]/card:text-base">
          Preferences
        </CardTitle>
        <CardDescription>
          Manage your account settings and notifications.
        </CardDescription>
        <CardAction>
          <CloseButton />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Label htmlFor="f01c2-default-currency">Default Currency</Label>
          <CurrencySelect id="f01c2-default-currency" />
        </div>
        {preferenceToggles.map((pref) => (
          <React.Fragment key={pref.id}>
            <Separator />
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <Label htmlFor={pref.id} className="leading-5">
                  {pref.title}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {pref.description}
                </p>
              </div>
              <Switch
                id={pref.id}
                defaultChecked
                className={`mt-0.5 ${brandSwitch}`}
              />
            </div>
          </React.Fragment>
        ))}
      </CardContent>
      <CardFooter className="justify-between border-t bg-muted/50 py-4">
        <Button variant="outline" size="sm" className="rounded-lg">
          Reset
        </Button>
        <Button
          size="sm"
          className="rounded-lg bg-brand text-brand-foreground hover:bg-brand/90"
        >
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                               Savings Progress                             */
/* -------------------------------------------------------------------------- */

const goalStats = [
  { label: "Projected Finish", value: "October 2024" },
  { label: "Monthly Average", value: "$1,250" },
  { label: "Top Contributor", value: "Auto-Transfer" },
]

// Donut: outer radius 95, inner radius 70 → stroke ring at r = 82.5, width 25.
const DONUT_R = 82.5
const DONUT_C = 2 * Math.PI * DONUT_R

function SavingsGoalCard() {
  const progress = 0.8

  return (
    <Card size="sm" className="pb-0">
      <CardContent>
        <div className="relative mx-auto flex h-[220px] w-full items-center justify-center">
          <svg
            viewBox="0 0 190 190"
            className="size-[190px] -rotate-90"
            role="img"
            aria-label="80% of $30,000 goal reached"
          >
            <circle
              cx="95"
              cy="95"
              r={DONUT_R}
              fill="none"
              strokeWidth="25"
              className="stroke-chart-1"
            />
            <circle
              cx="95"
              cy="95"
              r={DONUT_R}
              fill="none"
              strokeWidth="25"
              strokeDasharray={`${DONUT_C * progress} ${DONUT_C}`}
              className="stroke-chart-2"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 pb-5">
            <span className="text-2xl font-bold text-foreground tabular-nums">
              $24,000
            </span>
            <span className="text-xs text-muted-foreground">
              80% of $30,000
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-stretch border-t bg-muted/50 py-4">
        {goalStats.map((stat, i) => (
          <React.Fragment key={stat.label}>
            {i > 0 && <Separator />}
            <div className="flex items-center justify-between py-3 text-sm">
              <span className="text-muted-foreground">{stat.label}</span>
              <span className="font-semibold text-foreground">
                {stat.value}
              </span>
            </div>
          </React.Fragment>
        ))}
      </CardFooter>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                               Kitchen Island                               */
/* -------------------------------------------------------------------------- */

const scenes = [
  { value: "cooking", label: "Cooking" },
  { value: "dining", label: "Dining" },
  { value: "nightlight", label: "Nightlight" },
  { value: "focus", label: "Focus" },
]

const lightControls = [
  { id: "brightness", label: "Brightness", icon: IconSun, value: 90 },
  {
    id: "color-temp",
    label: "Color Temp",
    icon: IconTemperatureSun,
    value: 70,
  },
  { id: "volume", label: "Volume", icon: IconVolume, value: 30 },
  { id: "fade", label: "Fade", icon: IconClockHour4, value: 0 },
]

function KitchenIslandCard() {
  const [scene, setScene] = React.useState<string[]>(["cooking"])

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="group-data-[size=sm]/card:text-base">
          Kitchen Island
        </CardTitle>
        <CardDescription>Hue Color Ambient</CardDescription>
        <CardAction>
          <Switch
            defaultChecked
            aria-label="Kitchen Island power"
            className={brandSwitch}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="gap-4">
        <ToggleGroup
          variant="outline"
          size="sm"
          spacing={1}
          value={scene}
          onValueChange={(value) => {
            if (value.length > 0) setScene(value)
          }}
          aria-label="Lighting scene"
          className="flex-wrap"
        >
          {scenes.map((s) => (
            <ToggleGroupItem key={s.value} value={s.value} className="px-3">
              {s.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="flex flex-col gap-2.5">
          {lightControls.map((control) => {
            const Icon = control.icon
            const labelId = `f01c2-light-${control.id}`
            return (
              <Item
                key={control.id}
                variant="outline"
                size="sm"
                className="flex-nowrap rounded-lg"
              >
                <ItemMedia variant="icon">
                  <Icon stroke={1.75} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle id={labelId} className="leading-5">
                    {control.label}
                  </ItemTitle>
                </ItemContent>
                <ItemActions className="w-35">
                  <Slider
                    aria-labelledby={labelId}
                    defaultValue={[control.value]}
                    max={100}
                    className={brandSlider}
                  />
                </ItemActions>
              </Item>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export function Frame01Column2() {
  return (
    <div className="flex w-full flex-col gap-10">
      <PayoutThresholdCard />
      <ClaimableBalanceCard />
      <PreferencesCard />
      <SavingsGoalCard />
      <KitchenIslandCard />
    </div>
  )
}
