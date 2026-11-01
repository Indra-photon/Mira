"use client"

import * as React from "react"
import {
  IconAlertCircle,
  IconChevronRight,
  IconLock,
  IconPhoto,
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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

const brandButton = "bg-brand text-brand-foreground hover:bg-brand/90"
const fieldInput = "h-8 rounded-lg bg-input/30 px-2.5 text-sm"

/* -------------------------------------------------------------------------- */
/* Account Access                                                             */
/* -------------------------------------------------------------------------- */

function AccountAccessCard() {
  return (
    <Card size="sm" className="w-full pb-0">
      <CardHeader>
        <CardTitle className="text-base">Account Access</CardTitle>
        <CardDescription>
          Update your credentials or re-authenticate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-5">
          <Field className="gap-2">
            <FieldLabel htmlFor="f01-c4-email" className="leading-none">
              Email Address
            </FieldLabel>
            <Input
              id="f01-c4-email"
              type="email"
              defaultValue="artist@studio.inc"
              className={fieldInput}
            />
          </Field>
          <Field className="gap-2">
            <div className="flex w-full items-center justify-between">
              <FieldLabel htmlFor="f01-c4-password" className="leading-none">
                Current Password
              </FieldLabel>
              <button
                type="button"
                className="text-xs font-medium tracking-wide text-muted-foreground uppercase hover:text-foreground"
              >
                Forgot?
              </button>
            </div>
            <Input
              id="f01-c4-password"
              type="password"
              defaultValue="password123"
              className={fieldInput}
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex-col gap-4 border-t bg-muted/50 pb-4">
        <Button className={`h-8 w-full rounded-lg ${brandButton}`}>
          <IconLock data-icon="inline-start" />
          Update Security
        </Button>
        <Item
          variant="muted"
          size="sm"
          className="rounded-lg"
          render={<button type="button" />}
        >
          <ItemMedia variant="icon" className="text-destructive">
            <IconAlertCircle />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="leading-[1.375]">Danger Zone</ItemTitle>
            <ItemDescription className="line-clamp-1">
              Archive account and remove catalog
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <IconChevronRight className="size-4" />
          </ItemActions>
        </Item>
      </CardFooter>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Card Balance / Payment Due / Yearly Activity                               */
/* -------------------------------------------------------------------------- */

const yearlyActivity = [
  { month: "J", height: 23 },
  { month: "F", height: 31.625 },
  { month: "M", height: 20.125 },
  { month: "A", height: 34.5 },
  { month: "M", height: 25.875 },
  { month: "J", height: 28.75 },
  { month: "J", height: 37.375 },
  { month: "A", height: 23 },
  { month: "S", height: 31.625 },
  { month: "O", height: 40.25 },
  { month: "N", height: 25.875 },
  { month: "D", height: 46 },
]

function BalanceCards() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      <Card size="sm">
        <CardContent className="gap-0">
          <div className="text-sm text-muted-foreground">Card Balance</div>
          <div className="text-2xl leading-[1.375] font-medium text-foreground tabular-nums">
            US$12.94
          </div>
          <div className="text-sm text-muted-foreground tabular-nums">
            US$11,337.06 Available
          </div>
        </CardContent>
      </Card>
      <Card size="sm" className="justify-between">
        <CardContent className="flex-1 justify-between gap-0">
          <div className="flex flex-col gap-1">
            <div className="text-sm text-muted-foreground">Payment Due</div>
            <div className="text-2xl leading-[1.375] font-medium text-foreground">
              1 Apr
            </div>
          </div>
          <Button
            variant="outline"
            className="mt-3 h-7 w-full rounded-md border-input bg-input/30 px-2.5 text-[13px]"
          >
            Pay Early
          </Button>
        </CardContent>
      </Card>
      <Card size="sm" className="col-span-2">
        <CardContent className="gap-2">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Yearly Activity</div>
            <Badge className="bg-muted text-foreground">
              +US$0.25 Daily Cash
            </Badge>
          </div>
          <div className="flex h-20 w-full flex-col" aria-hidden="true">
            <div className="mt-1 flex h-[46px] items-end">
              {yearlyActivity.map((bar, index) => (
                <div key={index} className="flex flex-1 justify-center">
                  <div
                    className="w-[77%] rounded-t-[3px] bg-chart-2"
                    style={{ height: bar.height }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2.5 flex">
              {yearlyActivity.map((bar, index) => (
                <div
                  key={index}
                  className="flex-1 text-center text-xs leading-none text-neutral-500"
                >
                  {bar.month}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Transfer Funds                                                             */
/* -------------------------------------------------------------------------- */

const accounts = [
  { value: "checking", label: "Main Checking (··8402) — $12,450.00" },
  { value: "savings", label: "High Yield Savings (··1192) — $42,100.00" },
  { value: "brokerage", label: "Joint Brokerage (··3317) — $8,920.00" },
]

const triggerClass =
  "h-8 w-full gap-1.5 rounded-lg bg-input/30 py-2 pr-2 pl-2.5 text-sm"

function AccountSelect({
  id,
  value,
  onValueChange,
}: {
  id: string
  value: string
  onValueChange: (value: string) => void
}) {
  return (
    <Select
      items={accounts}
      value={value}
      onValueChange={(next) => {
        if (next) onValueChange(next)
      }}
    >
      <SelectTrigger id={id} size="sm" className={triggerClass}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem key={account.value} value={account.value}>
            {account.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function TransferFundsCard() {
  const [from, setFrom] = React.useState("checking")
  const [to, setTo] = React.useState("savings")

  return (
    <Card size="sm" className="w-full pb-0">
      <CardHeader>
        <CardTitle className="text-base">Transfer Funds</CardTitle>
        <CardDescription>
          Move money between your connected accounts.
        </CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Close"
            className="size-7 rounded-md bg-muted hover:bg-muted/80"
          >
            <IconX />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-5">
          <Field className="gap-2">
            <FieldLabel htmlFor="f01-c4-amount" className="leading-none">
              Amount to Transfer
            </FieldLabel>
            <InputGroup className="h-8 rounded-lg bg-input/30">
              <InputGroupInput
                id="f01-c4-amount"
                inputMode="decimal"
                defaultValue="1,200.00"
                className="h-8 pr-2.5 text-sm"
              />
              <InputGroupAddon>$</InputGroupAddon>
            </InputGroup>
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="f01-c4-from" className="leading-none">
              From Account
            </FieldLabel>
            <AccountSelect
              id="f01-c4-from"
              value={from}
              onValueChange={setFrom}
            />
          </Field>
          <Field className="gap-2">
            <FieldLabel htmlFor="f01-c4-to" className="leading-none">
              To Account
            </FieldLabel>
            <AccountSelect id="f01-c4-to" value={to} onValueChange={setTo} />
          </Field>
          <div className="flex w-full flex-col gap-3 rounded-lg bg-muted/50 px-3 py-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Estimated arrival</span>
              <span className="font-medium text-foreground">Today, Apr 14</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Transaction fee</span>
              <span className="font-medium text-foreground tabular-nums">
                $0.00
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Total amount</span>
              <span className="font-semibold text-foreground tabular-nums">
                $1,200.00
              </span>
            </div>
          </div>
        </FieldGroup>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 pb-4">
        <Button className={`h-8 w-full rounded-lg ${brandButton}`}>
          Confirm Transfer
        </Button>
      </CardFooter>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Cover Art                                                                  */
/* -------------------------------------------------------------------------- */

function CoverArtCard() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = React.useState<string | null>(null)

  return (
    <Card size="sm" className="w-full pb-0">
      <CardContent className="gap-3">
        <div className="text-center text-xs leading-none tracking-wide text-muted-foreground uppercase">
          Cover Art
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex aspect-square w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-border px-3 py-2.5 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <IconPhoto className="size-10 text-muted-foreground/50" />
          {fileName ? (
            <span className="max-w-full truncate text-xs text-muted-foreground">
              {fileName}
            </span>
          ) : (
            <span className="sr-only">Choose cover art</span>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="sr-only"
          tabIndex={-1}
          onChange={(event) =>
            setFileName(event.target.files?.[0]?.name ?? null)
          }
        />
      </CardContent>
      <CardFooter className="flex-col gap-2 border-t bg-muted/50 pb-4">
        <Button
          variant="secondary"
          className="h-8 w-full rounded-lg bg-muted px-2.5 hover:bg-muted/80"
          onClick={() => inputRef.current?.click()}
        >
          Upload Artwork
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Minimum 3000 × 3000px
          <br />
          JPEG or PNG only
        </p>
      </CardFooter>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Loading skeleton                                                           */
/* -------------------------------------------------------------------------- */

function SkeletonCard() {
  return (
    <Card size="sm" className="w-full" aria-busy="true">
      <CardHeader>
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent className="gap-4">
        <Skeleton className="h-32 w-full rounded-lg" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </CardContent>
    </Card>
  )
}

export function Frame01Column4() {
  return (
    <div className="flex w-full flex-col gap-10">
      <AccountAccessCard />
      <BalanceCards />
      <TransferFundsCard />
      <CoverArtCard />
      <SkeletonCard />
    </div>
  )
}
