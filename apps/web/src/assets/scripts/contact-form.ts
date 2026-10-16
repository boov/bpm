import { needsPropertyAddress, presetEnquiryType } from "./enquiry-types";

export default () => ({
  enquiryType: "general",

  init() {
    this.enquiryType = presetEnquiryType(window.location.search);
    // Alpine can initialise the swapped-in form before the router updates the URL.
    document.addEventListener(
      "astro:page-load",
      () => {
        this.enquiryType = presetEnquiryType(window.location.search);
      },
      { once: true }
    );
  },

  get needsAddress() {
    return needsPropertyAddress(this.enquiryType);
  }
});
