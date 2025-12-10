// This example assumes bootstrap icons
export const ICONS = {
  FILE_TYPE_PDF: {
    cssClass: 'bi bi-filetype-pdf',
    svgSprite: 'assets/icons/bootstrap-icons.svg#filetype-pdf',
  },
} as const;

export type Icons = keyof typeof ICONS;
