"use client"

import * as React from "react"
import Image from "next/image"
import {
  IconAlertCircle,
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
  IconCopy,
  IconDots,
  IconLoader,
  IconMinus,
  IconPlus,
  IconSearch,
  IconSettings,
  IconShare2,
  IconShoppingBag,
  IconTrash,
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const brandButton = "bg-brand text-brand-foreground hover:bg-brand/90"

const iconActions = [
  { label: "Copy", icon: IconCopy },
  { label: "Info", icon: IconAlertCircle },
  { label: "Delete", icon: IconTrash },
  { label: "Share", icon: IconShare2 },
  { label: "Shop", icon: IconShoppingBag },
  { label: "More", icon: IconDots },
  { label: "Loading", icon: IconLoader },
  { label: "Add", icon: IconPlus },
  { label: "Remove", icon: IconMinus },
  { label: "Back", icon: IconArrowLeft },
  { label: "Forward", icon: IconArrowRight },
  { label: "Confirm", icon: IconCheck },
  { label: "Expand", icon: IconChevronDown },
  { label: "Next", icon: IconChevronRight },
  { label: "Search", icon: IconSearch },
  { label: "Settings", icon: IconSettings },
]

const states = [
  { label: "California", value: "ca" },
  { label: "New York", value: "ny" },
  { label: "Texas", value: "tx" },
  { label: "Washington", value: "wa" },
]

const countries = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "United Kingdom", value: "uk" },
  { label: "Germany", value: "de" },
]

function IconGridCard() {
  return (
    <Card size="sm">
      <CardContent>
        <div className="grid grid-cols-8 justify-items-center gap-4">
          {iconActions.map(({ label, icon: Icon }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon-sm"
              aria-label={label}
              className="border-border"
            >
              <Icon stroke={2} />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function PrimitivesCard() {
  const [twoFactor, setTwoFactor] = React.useState(false)

  return (
    <Card size="sm">
      <CardContent className="gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className={`rounded-lg ${brandButton}`}>
              Button
            </Button>
            <Button size="sm" variant="secondary" className="rounded-lg">
              Secondary
            </Button>
            <Button size="sm" variant="outline" className="rounded-lg">
              Outline
            </Button>
            <Button size="sm" variant="ghost" className="rounded-lg">
              Ghost
            </Button>
          </div>
          <div className="flex w-full flex-wrap items-center gap-2.5 rounded-lg border border-border px-3 py-2.5">
            <div className="flex grow basis-0 flex-col gap-1">
              <div className="text-sm leading-[1.375] font-medium">
                Two-factor authentication
              </div>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="h-7 rounded-md text-[13px]"
              onClick={() => setTwoFactor((v) => !v)}
            >
              {twoFactor ? "Disable" : "Enable"}
            </Button>
          </div>
        </div>

        <Slider
          defaultValue={[50]}
          aria-label="Value"
          className="[&_[data-slot=slider-range]]:bg-brand [&_[data-slot=slider-thumb]]:size-3 [&_[data-slot=slider-thumb]]:border-ring [&_[data-slot=slider-track]]:data-horizontal:h-1"
        />

        <FieldGroup className="gap-5">
          <InputGroup className="h-8 rounded-lg">
            <InputGroupInput placeholder="Name" aria-label="Name" />
            <InputGroupAddon align="inline-end">
              <IconSearch />
            </InputGroupAddon>
          </InputGroup>
          <Textarea
            placeholder="Message"
            aria-label="Message"
            className="rounded-lg text-sm md:text-sm"
          />
        </FieldGroup>

        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <Badge className="bg-brand text-brand-foreground">Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <RadioGroup
            defaultValue="one"
            aria-label="Option"
            className="ml-auto flex w-fit gap-3"
          >
            <RadioGroupItem
              value="one"
              aria-label="Option one"
              className="data-checked:border-brand data-checked:bg-brand dark:data-checked:bg-brand"
            />
            <RadioGroupItem
              value="two"
              aria-label="Option two"
              className="data-checked:border-brand data-checked:bg-brand dark:data-checked:bg-brand"
            />
          </RadioGroup>
          <div className="flex gap-3">
            <Checkbox
              defaultChecked
              aria-label="Checked option"
              className="data-checked:border-brand data-checked:bg-brand data-checked:text-brand-foreground dark:data-checked:bg-brand"
            />
            <Checkbox
              aria-label="Unchecked option"
              className="data-checked:border-brand data-checked:bg-brand data-checked:text-brand-foreground dark:data-checked:bg-brand"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button size="sm" variant="outline" className="rounded-lg">
            Alert Dialog
          </Button>
          <ButtonGroup>
            <Button size="sm" variant="outline" className="rounded-lg">
              Button Group
            </Button>
            <Button
              size="icon-sm"
              variant="outline"
              aria-label="More options"
              className="rounded-lg"
            >
              <IconChevronUp />
            </Button>
          </ButtonGroup>
          <Switch
            defaultChecked
            aria-label="Toggle"
            className="ml-auto data-checked:bg-brand [&>[data-slot=switch-thumb]]:bg-foreground!"
          />
        </div>
      </CardContent>
    </Card>
  )
}

function ObservabilityCard() {
  return (
    <Card size="sm" className="py-0">
      <div className="relative aspect-[1887/2830] w-full overflow-hidden">
        <Image
          src="/showcase/f02-c2-observability.avif"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover brightness-60 grayscale"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-base leading-[1.375] group-data-[size=sm]/card:text-base">
          Observability Plus is replacing Monitoring
        </CardTitle>
        <CardDescription>
          Switch to the improved way to explore your data, with natural
          language. Monitoring will no longer be available on the Pro plan in
          November, 2025
        </CardDescription>
      </CardHeader>
      <CardFooter className="border-t bg-muted/50 p-4">
        <Button size="sm" className={`rounded-lg pr-2 ${brandButton}`}>
          Create Query
          <IconPlus data-icon="inline-end" />
        </Button>
        <Badge variant="secondary" className="ml-auto">
          Warning
        </Badge>
      </CardFooter>
    </Card>
  )
}

function ShippingAddressCard() {
  const [saveDefault, setSaveDefault] = React.useState(true)

  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className="text-base leading-[1.375] group-data-[size=sm]/card:text-base">
          Shipping Address
        </CardTitle>
        <CardDescription>Where should we deliver?</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-5">
          <Field className="gap-2">
            <FieldLabel htmlFor="f02-street">Street address</FieldLabel>
            <Input
              id="f02-street"
              placeholder="123 Main Street"
              className="h-8 rounded-lg"
            />
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="f02-apt">Apt / Suite</FieldLabel>
            <Input
              id="f02-apt"
              placeholder="Apt 4B"
              className="h-8 rounded-lg"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-2">
              <FieldLabel htmlFor="f02-city">City</FieldLabel>
              <Input
                id="f02-city"
                placeholder="San Francisco"
                className="h-8 rounded-lg"
              />
            </Field>
            <Field className="gap-2">
              <FieldLabel>State</FieldLabel>
              <Select items={states} defaultValue="ca">
                <SelectTrigger
                  size="sm"
                  aria-label="State"
                  className="w-full rounded-lg"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field className="gap-2">
              <FieldLabel htmlFor="f02-zip">ZIP Code</FieldLabel>
              <Input
                id="f02-zip"
                placeholder="94102"
                inputMode="numeric"
                className="h-8 rounded-lg"
              />
            </Field>
            <Field className="gap-2">
              <FieldLabel>Country</FieldLabel>
              <Select items={countries} defaultValue="us">
                <SelectTrigger
                  size="sm"
                  aria-label="Country"
                  className="w-full rounded-lg"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="flex w-full items-center gap-2">
            <Checkbox
              id="f02-save-default"
              checked={saveDefault}
              onCheckedChange={(checked) => setSaveDefault(checked)}
              className="data-checked:border-brand data-checked:bg-brand data-checked:text-brand-foreground dark:data-checked:bg-brand"
            />
            <Label htmlFor="f02-save-default" className="grow font-normal">
              Save as default address
            </Label>
          </div>
        </FieldGroup>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-4">
        <Button
          size="sm"
          variant="outline"
          className="h-7 rounded-md text-[13px]"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          className={`ml-auto h-7 rounded-md text-[13px] ${brandButton}`}
        >
          Save Address
        </Button>
      </CardFooter>
    </Card>
  )
}

export function Frame02Column2() {
  return (
    <div className="flex w-full flex-col gap-10">
      <IconGridCard />
      <PrimitivesCard />
      <ObservabilityCard />
      <ShippingAddressCard />
    </div>
  )
}
