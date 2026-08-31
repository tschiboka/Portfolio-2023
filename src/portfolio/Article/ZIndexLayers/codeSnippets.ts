export const codeSnippets = {
    layerDefinition: `export const ZIndex = {
    base: 10,
    sticky: 20,
    dropdown: 30,

    backdrop: 39,
    panel: 40,
    close: 41,

    top: 50,
} as const` as const,

    layerValues: `Layer      Value    Use Case
─────────────────────────────────────
base       10      Default content (layouts, cards, forms)
sticky     20      Persistent in-page UI (headers, sticky nav)
dropdown   30      Anchored transient UI (menus, selects, popovers)
backdrop   39      Blocking layer behind panel content
panel      40      Full-screen UI domain (modals, drawers, dialogs)
close      41      Panel controls above content
top        50      Highest-priority global UI (toasts, system alerts)` as const,

    usage: `// Before
<div style={{ zIndex: 1000 }} />

// After
<div style={{ zIndex: Const.ZIndex.dropdown }} />` as const,

    before: `/* Before — arbitrary magic numbers */
.Header     { z-index: 90;  }
.SubNav     { z-index: 10000; }
.Overlay    { z-index: 95;  }
.ContentNav { z-index: 10000; }
.SideMenu   { z-index: 60;  }` as const,

    after: `/* After — every value traces back to the layer system */
.Header     { z-index: 20; }  /* Const.ZIndex.sticky  */
.SubNav     { z-index: 20; }  /* Const.ZIndex.sticky  */
.Overlay    { z-index: 40; }  /* Const.ZIndex.panel   */
.ContentNav { z-index: 20; }  /* Const.ZIndex.sticky  */
.SideMenu   { z-index: 20; }  /* Const.ZIndex.sticky  */` as const,

    stackingContextTrap:
        `{/* Incorrect — Panel nested inside Sticky creates a new stacking context */}
<div style={{ zIndex: Const.ZIndex.sticky, position: 'relative' }}>
  <div style={{ zIndex: Const.ZIndex.panel }}>
    This panel is trapped inside the sticky context!
  </div>
</div>

{/* Correct — layers are siblings, Panel lives at the root */}
<Header style={{ zIndex: Const.ZIndex.sticky }} />
{createPortal(
  <div style={{ zIndex: Const.ZIndex.panel }}>Panel</div>,
  document.body
)}` as const,
} as const
