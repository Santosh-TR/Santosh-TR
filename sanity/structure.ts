import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton: Settings
      S.listItem()
        .title('Settings')
        .id('settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),

      S.divider(),

      // Regular Documents (Pages, etc.)
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'settings'
      ),
    ])
