import { DocBoard, DocRow, DocTable, FigmaIcon } from "./doc-board"

type Icon = {
  name: string
  file: string
  inset: string
  bleed: string
}

// Inset/bleed values come from the Figma vector-group layout of each icon.
const rows: {
  title: string
  size: 16 | 20 | 24
  icons: Icon[]
  use: string
  variables: string[]
}[] = [
  {
    title: "16px · 1.5px stroke",
    size: 16,
    icons: [
      {
        name: "Calendar",
        file: "16-calendar",
        inset: "12.5% 14.58% 14.58% 14.58%",
        bleed: "-6.43% -6.62%",
      },
      {
        name: "Pin",
        file: "16-pin",
        inset: "12.5% 20.83%",
        bleed: "-6.25% -8.04%",
      },
      { name: "Link", file: "16-link", inset: "12.81%", bleed: "-6.3%" },
      {
        name: "Star",
        file: "16-star",
        inset: "14.58% 14.58% 18.33% 14.58%",
        bleed: "-6.99% -6.62%",
      },
      {
        name: "Add to calendar",
        file: "16-calplus",
        inset: "12.5% 14.58% 14.58% 14.58%",
        bleed: "-6.43% -6.62%",
      },
      {
        name: "Chevron",
        file: "16-chevron",
        inset: "37.5% 25%",
        bleed: "-18.75% -9.38%",
      },
      {
        name: "Bell",
        file: "16-bell",
        inset: "20.83% 18.75% 6.25% 18.75%",
        bleed: "-6.43% -7.5%",
      },
    ],
    use: "The default. Every inline and button icon: dates and places, row links, filters and pickers, menus, Small and Medium buttons.",
    variables: [
      "Size   16px",
      "Stroke   1.5px · round caps and joins",
      "On a 24 grid   2.25",
      "Fill   none — outline icons only",
    ],
  },
  {
    title: "20px · 1.75px stroke",
    size: 20,
    icons: [
      {
        name: "Search",
        file: "20-search",
        inset: "18.75% 16.67% 16.67% 18.75%",
        bleed: "-6.77%",
      },
      {
        name: "Arrow",
        file: "20-arrow",
        inset: "25% 20.83%",
        bleed: "-8.75% -7.5%",
      },
      {
        name: "Calendar",
        file: "20-calendar",
        inset: "12.5% 14.58% 14.58% 14.58%",
        bleed: "-6% -6.18%",
      },
      {
        name: "Bell",
        file: "20-bell",
        inset: "20.83% 18.75% 6.25% 18.75%",
        bleed: "-6% -7%",
      },
    ],
    use: "Large buttons, the round search button and Medium icon-only buttons.",
    variables: [
      "Size   20px",
      "Stroke   1.75px · round caps and joins",
      "On a 24 grid   2.1",
      "Fill   none",
    ],
  },
  {
    title: "24px · 2px stroke",
    size: 24,
    icons: [
      {
        name: "Search",
        file: "24-search",
        inset: "18.75% 16.67% 16.67% 18.75%",
        bleed: "-6.45%",
      },
      {
        name: "Arrow",
        file: "24-arrow",
        inset: "25% 20.83%",
        bleed: "-8.33% -7.14%",
      },
      {
        name: "Bell",
        file: "24-bell",
        inset: "20.83% 18.75% 6.25% 18.75%",
        bleed: "-5.71% -6.67%",
      },
    ],
    use: "Large icon-only buttons and empty states. Never larger inside a list or table.",
    variables: [
      "Size   24px",
      "Stroke   2px · round caps and joins",
      "On a 24 grid   2",
      "Fill   none",
    ],
  },
  {
    title: "Colour",
    size: 16,
    icons: [
      {
        name: "Link (Text/Link)",
        file: "colour-link",
        inset: "12.81%",
        bleed: "-6.3%",
      },
      {
        name: "Calendar (Text/Meta)",
        file: "colour-calendar",
        inset: "12.5% 14.58% 14.58% 14.58%",
        bleed: "-6.43% -6.62%",
      },
      {
        name: "Star, selected (Brand/Purple)",
        file: "colour-star",
        inset: "14.58% 14.58% 18.33% 14.58%",
        bleed: "-6.99% -6.62%",
      },
    ],
    use: "An icon takes the colour of the text next to it — links purple, dates and places grey, buttons the label colour. A selected state fills the icon in Brand/Purple (Interested). An icon is never heavier than its label.",
    variables: [
      "Links   Text/Link",
      "Dates, places   Text/Meta",
      "Buttons   the button’s label colour",
      "Selected   Brand/Purple, filled",
    ],
  },
]

export function IconsBoard() {
  return (
    <DocBoard id="icons" title="Icons">
      <DocTable
        headers={[
          "Icon · size · stroke",
          "Where to use",
          "Variables · size · stroke · colour",
        ]}
      >
        {rows.map((row) => (
          <DocRow
            key={row.title}
            sample={
              <>
                <p className="text-mira-normal font-bold text-mira-text-heading">
                  {row.title}
                </p>
                <div className="flex items-center gap-4">
                  {row.icons.map((icon) => (
                    <FigmaIcon
                      key={icon.file}
                      src={`/mira/icons/${icon.file}.svg`}
                      size={row.size}
                      inset={icon.inset}
                      bleed={icon.bleed}
                      label={icon.name}
                    />
                  ))}
                </div>
              </>
            }
            use={row.use}
            variables={row.variables}
          />
        ))}
      </DocTable>
    </DocBoard>
  )
}
