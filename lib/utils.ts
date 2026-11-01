import { createCn } from "cn/config"

/**
 * Class merger that knows the Mira type scale. Without this, `cn` treats
 * `text-mira-normal` (a font size) and `text-mira-text-body` (a colour) as the
 * same group and drops one of them.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "mira-heading-1",
            "mira-heading-2",
            "mira-heading-3",
            "mira-heading-4",
            "mira-heading-5",
            "mira-heading-6",
            "mira-large",
            "mira-medium",
            "mira-normal",
            "mira-small",
            "mira-extra-small",
          ],
        },
      ],
    },
  },
})
