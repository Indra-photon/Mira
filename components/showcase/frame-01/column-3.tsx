"use client"

import * as React from "react"
import {
  IconArrowsRightLeft,
  IconBell,
  IconBook,
  IconBuildingBank,
  IconCalendar,
  IconCar,
  IconChartPie,
  IconChevronRight,
  IconCreditCard,
  IconDeviceTv,
  IconDots,
  IconDotsVertical,
  IconFileText,
  IconHelpCircle,
  IconLayoutGrid,
  IconLock,
  IconLockOpen,
  IconMessage,
  IconPalette,
  IconRepeat,
  IconSearch,
  IconSettings,
  IconShield,
  IconShoppingCart,
  IconTargetArrow,
  IconUser,
  IconWallet,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type IconComponent = React.ComponentType<{ className?: string }>

/* -------------------------------------------------------------------------- */
/* Icons copied from the design where no Tabler icon is a clear match          */
/* -------------------------------------------------------------------------- */

function StrokeIcon({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
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
      className={cn("size-4 shrink-0", className)}
    >
      {children}
    </svg>
  )
}

function CoffeeIcon({ className }: { className?: string }) {
  return (
    <StrokeIcon className={className}>
      <path d="M5 7L6.76 17.405C7.066 19.213 7.219 20.118 7.76 20.742C9.214 22.419 14.786 22.419 16.24 20.742C16.781 20.118 16.934 19.213 17.24 17.405L19 7" />
      <path d="M5 7L5.743 5.288C6.352 3.884 6.656 3.182 7.291 2.786C8.88 1.793 14.945 1.684 16.709 2.786C17.344 3.182 17.648 3.884 18.257 5.288L19 7" />
      <path d="M4 7H20" />
      <ellipse cx="12" cy="14.5" rx="2" ry="2.5" />
    </StrokeIcon>
  )
}

function InvestmentsIcon({ className }: { className?: string }) {
  return (
    <StrokeIcon className={className}>
      <path d="M7 18V16M12 18V15M17 18V13M2.5 12C2.5 7.522 2.5 5.282 3.891 3.891C5.282 2.5 7.522 2.5 12 2.5C16.478 2.5 18.718 2.5 20.109 3.891C21.5 5.282 21.5 7.522 21.5 12C21.5 16.478 21.5 18.718 20.109 20.109C18.718 21.5 16.478 21.5 12 21.5C7.522 21.5 5.282 21.5 3.891 20.109C2.5 18.718 2.5 16.478 2.5 12Z" />
      <path d="M5.992 11.486C8.147 11.558 13.034 11.233 15.814 6.821M13.992 6.288L15.868 5.986C16.096 5.957 16.432 6.138 16.515 6.353L17.01 7.991" />
    </StrokeIcon>
  )
}

function ReportsIcon({ className }: { className?: string }) {
  return (
    <StrokeIcon className={className}>
      <path d="M4 15L4 19" />
      <path d="M12 9L12 19" />
      <path d="M22 22L2 22" />
      <path d="M20 13L20 19" />
      <path d="M5.6 8.8C5.235 8.314 4.654 8 4 8C2.895 8 2 8.895 2 10C2 11.105 2.895 12 4 12C5.105 12 6 11.105 6 10C6 9.55 5.851 9.134 5.6 8.8ZM5.6 8.8L10.4 5.2M10.4 5.2C10.765 5.686 11.346 6 12 6C12.783 6 13.461 5.55 13.789 4.895M10.4 5.2C10.149 4.866 10 4.45 10 4C10 2.895 10.895 2 12 2C13.105 2 14 2.895 14 4C14 4.322 13.924 4.625 13.789 4.895M13.789 4.895L18.211 7.105M18.211 7.105C18.076 7.375 18 7.678 18 8C18 9.105 18.895 10 20 10C21.105 10 22 9.105 22 8C22 6.895 21.105 6 20 6C19.217 6 18.539 6.45 18.211 7.105Z" />
    </StrokeIcon>
  )
}

function StatusIcon({ className }: { className?: string }) {
  return (
    <StrokeIcon className={className}>
      <path d="M4.318 19.682C3 18.364 3 16.243 3 12C3 7.757 3 5.636 4.318 4.318C5.636 3 7.757 3 12 3C16.243 3 18.364 3 19.682 4.318C21 5.636 21 7.757 21 12C21 16.243 21 18.364 19.682 19.682C18.364 21 16.243 21 12 21C7.757 21 5.636 21 4.318 19.682Z" />
      <path d="M7 14L9.793 11.207C10.183 10.817 10.817 10.817 11.207 11.207L12.793 12.793C13.183 13.183 13.817 13.183 14.207 12.793L17 10" />
    </StrokeIcon>
  )
}

/* -------------------------------------------------------------------------- */
/* Row 1 — Savings Targets                                                    */
/* -------------------------------------------------------------------------- */

const savingsGoals = [
  { label: "Retirement", amount: "$420,000", progress: 65, saved: "$273,000" },
  { label: "Real Estate", amount: "$85,000", progress: 32, saved: "$27,200" },
]

function SavingsTargetsCard() {
  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className="leading-snug group-data-[size=sm]/card:text-base">
          Savings Targets
        </CardTitle>
        <CardDescription>Active milestones for 2024</CardDescription>
        <CardAction>
          <Button
            variant="outline"
            size="sm"
            className="h-7 rounded-md text-[13px]"
          >
            New Goal
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {savingsGoals.map((goal) => (
          <div
            key={goal.label}
            className="flex flex-col gap-2.5 rounded-lg border border-transparent bg-muted/50 px-3 py-2.5"
          >
            <div className="flex flex-col gap-3">
              <div className="text-xs leading-normal font-medium tracking-wide text-muted-foreground uppercase">
                {goal.label}
              </div>
              <div className="text-3xl leading-[1.2] font-semibold text-foreground tabular-nums">
                {goal.amount}
              </div>
              <Progress
                value={goal.progress}
                aria-label={`${goal.label} progress`}
                className="[&_[data-slot=progress-indicator]]:bg-brand [&_[data-slot=progress-track]]:h-1"
              />
            </div>
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="text-muted-foreground">
                {goal.progress}% achieved
              </span>
              <span className="font-medium text-foreground tabular-nums">
                {goal.saved}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="mt-auto border-t bg-muted/50 pb-4">
        <p className="text-sm text-muted-foreground">
          You have not met your targets for this year.
        </p>
      </CardFooter>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Row 1 — Buy Investment                                                     */
/* -------------------------------------------------------------------------- */

const orderTypeHints: Record<string, string> = {
  market: "Market orders execute at the current price.",
  limit: "Limit orders execute at your price or better.",
  stop: "Stop orders execute once the stop price is reached.",
}

function BuyInvestmentCard() {
  const amountId = React.useId()
  const orderTypeId = React.useId()
  const [orderType, setOrderType] = React.useState("market")

  return (
    <Card size="sm" className="pb-0">
      <CardHeader>
        <CardTitle className="leading-snug group-data-[size=sm]/card:text-base">
          Buy Investment
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor={amountId}>Amount to Invest</Label>
            <InputGroup className="h-8 rounded-lg shadow-none">
              <InputGroupAddon>$</InputGroupAddon>
              <InputGroupInput
                id={amountId}
                inputMode="decimal"
                defaultValue="1,000.00"
                className="h-8 pr-2.5 pl-1.5 text-sm"
              />
            </InputGroup>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={orderTypeId}>Order Type</Label>
            <NativeSelect
              id={orderTypeId}
              size="sm"
              value={orderType}
              onChange={(event) => setOrderType(event.target.value)}
              className="w-full [&_select]:rounded-lg [&_select]:shadow-none"
            >
              <NativeSelectOption value="market">
                Market Order
              </NativeSelectOption>
              <NativeSelectOption value="limit">Limit Order</NativeSelectOption>
              <NativeSelectOption value="stop">Stop Order</NativeSelectOption>
            </NativeSelect>
            <p className="text-sm leading-normal text-muted-foreground">
              {orderTypeHints[orderType]}
            </p>
          </div>
          <dl className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Estimated Shares</dt>
              <dd className="font-semibold text-foreground tabular-nums">
                1.95
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Buying Power</dt>
              <dd className="font-semibold text-foreground tabular-nums">
                $12,450.00
              </dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-3 border-t bg-muted/50 pb-4">
        <Button className="h-8 w-full rounded-lg bg-brand text-brand-foreground hover:bg-brand/90">
          Review Order
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Trades are typically executed within minutes during market hours.
        </p>
      </CardFooter>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Row 2 — Recent Transactions                                                */
/* -------------------------------------------------------------------------- */

const transactions: {
  name: string
  category: string
  date: string
  amount: string
  positive?: boolean
  icon: IconComponent
}[] = [
  {
    name: "Blue Bottle Coffee",
    category: "Food & Drink",
    date: "Today, 10:24 AM",
    amount: "-$6.50",
    icon: CoffeeIcon,
  },
  {
    name: "Whole Foods Market",
    category: "Groceries",
    date: "Yesterday",
    amount: "-$142.30",
    icon: IconShoppingCart,
  },
  {
    name: "Stripe Payout",
    category: "Income",
    date: "Oct 12",
    amount: "+$4,200.00",
    positive: true,
    icon: IconWallet,
  },
  {
    name: "Uber Technologies",
    category: "Transport",
    date: "Oct 11",
    amount: "-$24.10",
    icon: IconCar,
  },
  {
    name: "Netflix Subscription",
    category: "Entertainment",
    date: "Oct 10",
    amount: "-$19.99",
    icon: IconDeviceTv,
  },
]

function RecentTransactionsCard() {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="leading-snug group-data-[size=sm]/card:text-base">
          Recent Transactions
        </CardTitle>
        <CardDescription>Your latest account activity.</CardDescription>
        <CardAction>
          <Button
            variant="outline"
            size="sm"
            className="h-7 rounded-md text-[13px]"
          >
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <table className="w-full caption-bottom border-collapse text-sm">
            <caption className="sr-only">Recent transactions</caption>
            <tbody>
              {transactions.map(({ icon: Icon, ...tx }) => (
                <tr key={tx.name} className="border-b last:border-b-0">
                  <td className="w-10 p-2">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                      <Icon className="size-4 text-foreground" />
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex flex-col">
                      <span className="font-medium whitespace-nowrap text-foreground">
                        {tx.name}
                      </span>
                      <span className="whitespace-nowrap text-muted-foreground">
                        {tx.category}
                      </span>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap text-muted-foreground">
                    {tx.date}
                  </td>
                  <td
                    className={cn(
                      "p-2 text-right font-semibold whitespace-nowrap tabular-nums",
                      tx.positive ? "text-emerald-500" : "text-foreground"
                    )}
                  >
                    {tx.amount}
                  </td>
                  <td className="w-8 p-2">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="size-7 rounded-md"
                      aria-label={`More actions for ${tx.name}`}
                    >
                      <IconDotsVertical />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Row 3 — Navigation menus                                                   */
/* -------------------------------------------------------------------------- */

type NavSection = {
  label: string
  items: { label: string; icon: IconComponent }[]
}

const overviewMenu: NavSection[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", icon: IconLayoutGrid },
      { label: "Transactions", icon: IconArrowsRightLeft },
      { label: "Investments", icon: InvestmentsIcon },
      { label: "Accounts", icon: IconBuildingBank },
      { label: "Spending", icon: IconChartPie },
    ],
  },
  {
    label: "Planning",
    items: [
      { label: "Goals", icon: IconTargetArrow },
      { label: "Budget", icon: IconWallet },
      { label: "Reports", icon: ReportsIcon },
      { label: "Documents", icon: IconFileText },
    ],
  },
]

const accountMenu: NavSection[] = [
  {
    label: "Account",
    items: [
      { label: "Profile", icon: IconUser },
      { label: "Billing", icon: IconCreditCard },
      { label: "Notifications", icon: IconBell },
      { label: "Security", icon: IconShield },
      { label: "Appearance", icon: IconPalette },
    ],
  },
  {
    label: "Support",
    items: [
      { label: "Help Center", icon: IconHelpCircle },
      { label: "Contact Us", icon: IconMessage },
      { label: "Documentation", icon: IconBook },
      { label: "Status", icon: StatusIcon },
    ],
  },
]

function NavMenuCard({
  sections,
  defaultActive,
  label,
}: {
  sections: NavSection[]
  defaultActive: string
  label: string
}) {
  const [active, setActive] = React.useState(defaultActive)

  return (
    <Card size="sm" className="gap-0 py-0">
      <nav aria-label={label} className="flex flex-col">
        {sections.map((section, index) => (
          <React.Fragment key={section.label}>
            {index > 0 && <Separator className="mx-2 data-horizontal:w-auto" />}
            <div
              className={cn(
                "flex flex-col px-2",
                index === 0 ? "pt-2 pb-1" : "pt-1 pb-2"
              )}
            >
              <div className="flex h-8 shrink-0 items-center px-2 text-xs font-medium text-foreground/70">
                {section.label}
              </div>
              <ul className="flex flex-col">
                {section.items.map(({ label: itemLabel, icon: Icon }) => {
                  const isActive = active === itemLabel
                  return (
                    <li key={itemLabel}>
                      <button
                        type="button"
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setActive(itemLabel)}
                        className={cn(
                          "flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm text-foreground transition-colors outline-none hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50",
                          isActive && "bg-muted font-medium hover:bg-muted"
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="truncate">{itemLabel}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </React.Fragment>
        ))}
      </nav>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Row 3 — FAQ                                                                */
/* -------------------------------------------------------------------------- */

const faqs: Record<string, { id: string; question: string; answer: string }[]> =
  {
    general: [
      {
        id: "security",
        question: "How secure is my financial data with Ledger?",
        answer:
          "We use bank-level AES-256 encryption, SOC 2 Type II certified infrastructure, and never store your credentials. All connections use read-only access tokens. We are a SEC registered investment advisor.",
      },
      {
        id: "connect",
        question: "How do I connect my bank or investment accounts?",
        answer:
          "Go to Accounts, choose Add account and search for your institution. You'll sign in through a secure connection and your balances sync within a few minutes.",
      },
      {
        id: "export",
        question: "Can I export my data for tax purposes?",
        answer:
          "Yes. From Reports you can export transactions, realized gains and dividends as CSV or PDF for any tax year.",
      },
    ],
    billing: [
      {
        id: "plans",
        question: "Which plans are available?",
        answer:
          "Ledger is free for one linked account. Plus unlocks unlimited accounts, goals and reports for a monthly or annual fee.",
      },
      {
        id: "cancel",
        question: "Can I cancel at any time?",
        answer:
          "Yes. Cancel from Billing and you keep access until the end of your current billing period.",
      },
    ],
    goals: [
      {
        id: "create-goal",
        question: "How do I create a savings goal?",
        answer:
          "Select New Goal on the Savings Targets card, set a target amount and date, and choose the account that funds it.",
      },
      {
        id: "track-goal",
        question: "How is goal progress calculated?",
        answer:
          "Progress is the current balance of the linked account divided by the target amount, updated each time your accounts sync.",
      },
    ],
  }

function FaqCard() {
  return (
    <Card size="sm" className="pb-0">
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="w-full rounded-lg group-data-horizontal/tabs:h-8">
            <TabsTrigger value="general" className="px-1.5 py-0.5">
              General
            </TabsTrigger>
            <TabsTrigger value="billing" className="px-1.5 py-0.5">
              Billing
            </TabsTrigger>
            <TabsTrigger value="goals" className="px-1.5 py-0.5">
              Goals
            </TabsTrigger>
          </TabsList>
          {Object.entries(faqs).map(([tab, items]) => (
            <TabsContent key={tab} value={tab}>
              <Accordion defaultValue={[items[0].id]}>
                {items.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="rounded-lg py-2.5 text-foreground">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-2.5 text-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 pb-4">
        <Button variant="outline" className="h-8 w-full rounded-lg shadow-none">
          Contact Support
        </Button>
      </CardFooter>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Row 3 — Payments settings (breadcrumb list)                                */
/* -------------------------------------------------------------------------- */

const paymentSettings: {
  title: string
  description: string
  icon: IconComponent
}[] = [
  {
    title: "Change transfer limit",
    description: "Adjust how much you can send from your balance.",
    icon: IconSettings,
  },
  {
    title: "Scheduled transfers",
    description: "Set up a transfer to send at a later date.",
    icon: IconCalendar,
  },
  {
    title: "Direct Debits",
    description: "Set up and manage regular payments.",
    icon: IconRepeat,
  },
  {
    title: "Recurring card payments",
    description: "Manage your repeated card transactions.",
    icon: IconRepeat,
  },
]

function PaymentsSettingsCard() {
  return (
    <Card size="sm">
      <CardHeader>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Home
              </a>
            </li>
            <li aria-hidden="true">
              <IconChevronRight className="size-3.5 text-muted-foreground" />
            </li>
            <li>
              <Button
                variant="ghost"
                size="icon-sm"
                className="size-7 rounded-md text-muted-foreground"
                aria-label="Show more breadcrumbs"
              >
                <IconDots />
              </Button>
            </li>
            <li aria-hidden="true">
              <IconChevronRight className="size-3.5 text-muted-foreground" />
            </li>
            <li>
              <span aria-current="page" className="text-foreground">
                Payments
              </span>
            </li>
          </ol>
        </nav>
      </CardHeader>
      <CardContent className="gap-4">
        {paymentSettings.map(({ icon: Icon, ...setting }) => (
          <button
            key={setting.title}
            type="button"
            className="flex w-full items-center gap-2.5 rounded-lg border border-transparent bg-muted/50 px-3 py-2.5 text-left transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Icon className="size-4 shrink-0 translate-y-0.5 self-start text-foreground" />
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="text-sm leading-snug font-medium text-foreground">
                {setting.title}
              </span>
              <span className="line-clamp-2 text-sm leading-normal text-muted-foreground">
                {setting.description}
              </span>
            </span>
            <IconChevronRight className="size-4 shrink-0 text-muted-foreground" />
          </button>
        ))}
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Row 3 — Front Door                                                         */
/* -------------------------------------------------------------------------- */

function FrontDoorCard() {
  const [locked, setLocked] = React.useState(true)
  const LockIcon = locked ? IconLock : IconLockOpen

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="leading-snug group-data-[size=sm]/card:text-base">
          Front Door
        </CardTitle>
        <CardDescription>Smart Lock Pro</CardDescription>
        <CardAction>
          <button
            type="button"
            aria-pressed={locked}
            onClick={() => setLocked((value) => !value)}
            className="flex items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {locked ? "Locked" : "Unlocked"}
            <LockIcon className="size-4 shrink-0" />
          </button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div
          role="img"
          aria-label="Front door camera feed"
          className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-muted"
        >
          <Badge variant="destructive" className="absolute top-2 right-2">
            Live
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Row 4 — Holdings                                                           */
/* -------------------------------------------------------------------------- */

const holdings = [
  {
    ticker: "VOO",
    name: "Vanguard S&P 500 ETF",
    meta: "112 Shares · Jan 2021",
    type: "ETF",
    value: "$48,230.40",
  },
  {
    ticker: "VIG",
    name: "Vanguard Dividend Appreciation",
    meta: "450 Shares · Mar 2022",
    type: "ETF",
    value: "$26,033.79",
  },
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    meta: "85 Shares · Nov 2020",
    type: "Stock",
    value: "$18,488.90",
  },
  {
    ticker: "O",
    name: "Realty Income Corp",
    meta: "320 Shares · Jun 2023",
    type: "REIT",
    value: "$15,136.59",
  },
]

function HoldingsCard() {
  const [query, setQuery] = React.useState("")
  const normalized = query.trim().toLowerCase()
  const visible = normalized
    ? holdings.filter(
        (h) =>
          h.name.toLowerCase().includes(normalized) ||
          h.ticker.toLowerCase().includes(normalized)
      )
    : holdings

  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <InputGroup className="h-8 max-w-96 rounded-lg shadow-none">
            <InputGroupAddon>
              <IconSearch />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              aria-label="Search holdings"
              placeholder="Search holdings or tickers..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-8 pr-2.5 pl-1.5 text-sm"
            />
          </InputGroup>
          <ToggleGroup
            aria-label="Asset class"
            variant="outline"
            size="sm"
            spacing={1}
            defaultValue={["etfs"]}
          >
            <ToggleGroupItem
              value="stocks"
              className="rounded-lg text-foreground shadow-none"
            >
              Stocks
            </ToggleGroupItem>
            <ToggleGroupItem
              value="etfs"
              className="rounded-lg text-foreground shadow-none"
            >
              ETFs
            </ToggleGroupItem>
            <ToggleGroupItem
              value="reits"
              className="rounded-lg text-foreground shadow-none"
            >
              REITs
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent className="gap-4">
        {visible.map((holding) => (
          <div
            key={holding.ticker}
            className="flex w-full flex-wrap items-center gap-2.5 rounded-lg border border-transparent bg-muted/50 px-3 py-2.5"
          >
            <div className="flex size-12 shrink-0 translate-y-0.5 items-center justify-center self-start rounded-lg border text-sm font-semibold text-foreground">
              {holding.ticker}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="text-sm leading-snug font-medium text-foreground">
                {holding.name}
              </div>
              <div className="line-clamp-2 text-xs leading-normal tracking-wide text-muted-foreground uppercase">
                {holding.meta}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-6">
              <Badge variant="outline">{holding.type}</Badge>
              <div className="flex flex-col items-end gap-0.5">
                <div className="text-xs tracking-wide text-muted-foreground uppercase">
                  Value
                </div>
                <div className="text-sm font-medium text-foreground tabular-nums">
                  {holding.value}
                </div>
              </div>
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No holdings match “{query}”.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Column                                                                     */
/* -------------------------------------------------------------------------- */

export function Frame01Column3() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="grid gap-10 md:grid-cols-2">
        <SavingsTargetsCard />
        <BuyInvestmentCard />
      </div>

      <RecentTransactionsCard />

      <div className="grid items-start gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-10">
          <div className="grid items-start gap-6 sm:grid-cols-2">
            <NavMenuCard
              label="Overview"
              sections={overviewMenu}
              defaultActive="Dashboard"
            />
            <NavMenuCard
              label="Account settings"
              sections={accountMenu}
              defaultActive="Billing"
            />
          </div>
          <FaqCard />
        </div>
        <div className="flex flex-col gap-10">
          <PaymentsSettingsCard />
          <FrontDoorCard />
        </div>
      </div>

      <HoldingsCard />
    </div>
  )
}
