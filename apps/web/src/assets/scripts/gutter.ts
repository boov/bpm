const gutterId = "p_gutter";
const toggleId = "p_menu-toggle";
const cookieConsentId = "cookie-consent";

export default () => ({
  open: false,

  toggle() {
    this.setOpen(!this.open);
  },

  close() {
    if (this.open) this.setOpen(false);
  },

  setOpen(open: boolean) {
    this.open = open;
    const gutter = document.getElementById(gutterId);
    if (!gutter) return;

    gutter.inert = !open;
    for (const element of document.body.children) {
      if (element !== gutter && element.id !== cookieConsentId && element instanceof HTMLElement) element.inert = open;
    }
    window.dispatchEvent(new CustomEvent("gutter-state", { detail: open }));

    if (open) gutter.querySelector<HTMLElement>("[data-gutter-close]")?.focus();
    else document.getElementById(toggleId)?.focus();
  }
});
