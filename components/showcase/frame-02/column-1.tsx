"use client"

import * as React from "react"
import { IconCheck, IconCopy, IconDots, IconPlus } from "@tabler/icons-react"

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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const brandButton = "bg-brand text-brand-foreground hover:bg-brand/90"

/* ------------------------------------------------------------------ */
/* Nova – Geist                                                        */
/* ------------------------------------------------------------------ */

const SWATCHES = [
  { token: "--background", className: "bg-background" },
  { token: "--foreground", className: "bg-foreground" },
  { token: "--primary", className: "bg-primary" },
  { token: "--secondary", className: "bg-secondary" },
  { token: "--muted", className: "bg-muted" },
  { token: "--accent", className: "bg-accent" },
  { token: "--border", className: "bg-border" },
  { token: "--chart-1", className: "bg-chart-1" },
  { token: "--chart-2", className: "bg-chart-2" },
  { token: "--chart-3", className: "bg-chart-3" },
  { token: "--chart-4", className: "bg-chart-4" },
  { token: "--chart-5", className: "bg-chart-5" },
] as const

function NovaGeistCard() {
  return (
    <Card size="sm" className="w-full">
      <CardContent className="gap-6">
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-medium">Nova - Geist</div>
          <p className="line-clamp-2 text-base text-muted-foreground">
            Designers love packing quirky glyphs into test phrases. This is a
            preview of the typography styles.
          </p>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {SWATCHES.map(({ token, className }) => (
            <div
              key={token}
              className="flex min-w-0 flex-col items-center gap-2"
              title={token}
            >
              <div className={`aspect-square w-full rounded-lg ${className}`} />
              <div className="max-w-full truncate font-mono text-[10px] leading-[142.857%]">
                {token}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Designing with rhythm and hierarchy                                 */
/* ------------------------------------------------------------------ */

function TypographyCard() {
  return (
    <Card size="sm" className="w-full pb-0">
      <CardContent className="gap-2">
        <div className="text-xs font-medium text-muted-foreground uppercase">
          Inherit - Geist
        </div>
        <h3 className="text-2xl font-medium">
          Designing with rhythm and hierarchy.
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A strong body style keeps long-form content readable and balances the
          visual weight of headings.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Thoughtful spacing and cadence help paragraphs scan quickly without
          feeling dense.
        </p>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 pb-4">
        <Button size="sm" variant="outline" className="w-full rounded-lg">
          Share Feedback
        </Button>
      </CardFooter>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Codespaces                                                          */
/* ------------------------------------------------------------------ */

function ServerStackIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M19 4H5C4.068 4 3.602 4 3.235 4.152C2.745 4.355 2.355 4.745 2.152 5.235C2 5.602 2 6.068 2 7C2 7.932 2 8.398 2.152 8.765C2.355 9.255 2.745 9.645 3.235 9.848C3.602 10 4.068 10 5 10H19C19.932 10 20.398 10 20.765 9.848C21.255 9.645 21.645 9.255 21.848 8.765C22 8.398 22 7.932 22 7C22 6.068 22 5.602 21.848 5.235C21.645 4.745 21.255 4.355 20.765 4.152C20.398 4 19.932 4 19 4Z" />
      <path d="M19 14H5C4.068 14 3.602 14 3.235 14.152C2.745 14.355 2.355 14.745 2.152 15.235C2 15.602 2 16.068 2 17C2 17.932 2 18.398 2.152 18.765C2.355 19.255 2.745 19.645 3.235 19.848C3.602 20 4.068 20 5 20H19C19.932 20 20.398 20 20.765 19.848C21.255 19.645 21.645 19.255 21.848 18.765C22 18.398 22 17.932 22 17C22 16.068 22 15.602 21.848 15.235C21.645 14.745 21.255 14.355 20.765 14.152C20.398 14 19.932 14 19 14Z" />
      <path d="M6 17H6.01" />
      <path d="M10 17H10.01" />
      <path d="M6 7H6.01" />
      <path d="M10 7H10.01" />
    </svg>
  )
}

const CLONE_URL = "https://github.com/shadcn/ui.git"

function LocalClonePanel() {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(t)
  }, [copied])

  return (
    <div className="flex flex-col gap-3 px-1 pt-2 pb-2.5">
      <div className="flex flex-col gap-1">
        <div className="text-sm leading-[137.5%] font-medium">Clone</div>
        <div className="text-sm text-muted-foreground">
          Use Git or checkout with SVN using the web URL.
        </div>
      </div>
      <InputGroup className="h-8 rounded-lg">
        <InputGroupInput
          readOnly
          value={CLONE_URL}
          aria-label="Repository URL"
          className="font-mono text-xs"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label={copied ? "Copied" : "Copy URL"}
            onClick={() => {
              void navigator.clipboard?.writeText(CLONE_URL)
              setCopied(true)
            }}
          >
            {copied ? <IconCheck /> : <IconCopy />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function CodespacesCard() {
  return (
    <Card size="sm" className="w-full">
      <CardContent>
        <Tabs defaultValue="codespaces">
          <TabsList className="h-8 w-full">
            <TabsTrigger value="codespaces">Codespaces</TabsTrigger>
            <TabsTrigger value="local">Local</TabsTrigger>
          </TabsList>
          <TabsContent value="codespaces">
            <div className="flex flex-wrap items-center gap-2.5 px-1 pt-2 pb-2.5">
              <div className="flex flex-1 flex-col gap-1">
                <div className="text-sm leading-[137.5%] font-medium">
                  Codespaces
                </div>
                <div className="line-clamp-2 text-sm text-muted-foreground">
                  Your workspaces in the cloud
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-7 rounded-md"
                  aria-label="New codespace"
                >
                  <IconPlus />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-7 rounded-md"
                  aria-label="More options"
                >
                  <IconDots />
                </Button>
              </div>
            </div>
            <Separator className="-mx-2 my-2 data-horizontal:w-auto" />
            <Empty className="gap-4 rounded-xl p-4">
              <EmptyHeader className="gap-2">
                <EmptyMedia
                  variant="icon"
                  className="size-8 rounded-lg [&_svg:not([class*='size-'])]:size-4"
                >
                  <ServerStackIcon />
                </EmptyMedia>
                <EmptyTitle className="text-sm">No codespaces</EmptyTitle>
                <EmptyDescription>
                  You don&apos;t have any codespaces with this repository
                  checked out
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="gap-2.5">
                <Button
                  size="sm"
                  className={`h-7 rounded-md text-[13px] ${brandButton}`}
                >
                  Create Codespace
                </Button>
                <a
                  href="#"
                  className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Learn more about codespaces
                </a>
              </EmptyContent>
            </Empty>
            <Separator className="-mx-2 my-2 data-horizontal:w-auto" />
            <div className="p-1.5 text-xs text-muted-foreground">
              Codespace usage for this repository is paid for by shadcn.
            </div>
          </TabsContent>
          <TabsContent value="local">
            <LocalClonePanel />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Invoice                                                             */
/* ------------------------------------------------------------------ */

const INVOICE_ITEMS = [
  { item: "Design System License", qty: 1, rate: "$499.00", amount: "$499.00" },
  { item: "Priority Support", qty: 12, rate: "$99.00", amount: "$1,188.00" },
  { item: "Custom Components", qty: 3, rate: "$250.00", amount: "$750.00" },
] as const

const INVOICE_TOTALS = [
  { label: "Subtotal", value: "$2,437.00" },
  { label: "Tax", value: "$0.00" },
  { label: "Total Due", value: "$2,437.00" },
] as const

function InvoiceCard() {
  return (
    <Card size="sm" className="w-full pb-0">
      <CardHeader>
        <CardTitle className="text-base">Invoice #INV-2847</CardTitle>
        <CardDescription>Due March 30, 2026</CardDescription>
        <CardAction>
          <Badge variant="secondary" className="bg-muted text-foreground">
            Pending
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <table className="w-full caption-bottom border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="h-10 px-1.5 text-left font-medium">Item</th>
                <th className="h-10 px-1.5 text-right font-medium">Qty</th>
                <th className="h-10 px-1.5 text-right font-medium">Rate</th>
                <th className="h-10 px-1.5 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {INVOICE_ITEMS.map((row) => (
                <tr key={row.item} className="border-b">
                  <td className="p-1.5 py-2">{row.item}</td>
                  <td className="p-1.5 py-2 text-right whitespace-nowrap tabular-nums">
                    {row.qty}
                  </td>
                  <td className="p-1.5 py-2 text-right whitespace-nowrap tabular-nums">
                    {row.rate}
                  </td>
                  <td className="p-1.5 py-2 text-right whitespace-nowrap tabular-nums">
                    {row.amount}
                  </td>
                </tr>
              ))}
              {INVOICE_TOTALS.map((row) => (
                <tr key={row.label} className="border-b last:border-b-0">
                  <td colSpan={3} className="p-1.5 py-2 text-right">
                    {row.label}
                  </td>
                  <td className="p-1.5 py-2 text-right whitespace-nowrap tabular-nums">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 pb-4">
        <Button
          size="sm"
          variant="outline"
          className="h-7 rounded-md text-[13px]"
        >
          Download PDF
        </Button>
        <Button
          size="sm"
          className={`ml-auto h-7 rounded-md text-[13px] ${brandButton}`}
        >
          Pay Now
        </Button>
      </CardFooter>
    </Card>
  )
}

export function Frame02Column1() {
  return (
    <div className="flex w-full flex-col gap-10">
      <NovaGeistCard />
      <TypographyCard />
      <CodespacesCard />
      <InvoiceCard />
    </div>
  )
}
